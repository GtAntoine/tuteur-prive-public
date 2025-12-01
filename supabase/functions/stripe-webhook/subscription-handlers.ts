import type { SupabaseClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'
import { stripe } from '../_shared/stripe.ts'

export async function handleSubscriptionChange(
  event: Stripe.Event,
  supabase: SupabaseClient
) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.user_id
  const priceId = subscription.items.data[0].price.id

  try {
    // Vérifier si le prix existe déjà
    const { data: existingPrice } = await supabase
      .from('prices')
      .select('id')
      .eq('id', priceId)
      .single()

    // Si le prix n'existe pas, créer le produit et le prix
    if (!existingPrice) {
      const price = subscription.items.data[0].price
      const product = await stripe.products.retrieve(price.product as string)

      // Insérer le produit
      await supabase
        .from('products')
        .upsert({
          id: product.id,
          active: product.active,
          name: product.name,
          description: product.description,
          image: product.images?.[0] ?? null,
          metadata: product.metadata
        })

      // Insérer le prix
      await supabase
        .from('prices')
        .upsert({
          id: price.id,
          product_id: product.id,
          active: price.active,
          currency: price.currency,
          description: price.nickname ?? null,
          type: price.type,
          unit_amount: price.unit_amount ?? 0,
          interval: price.recurring?.interval ?? null,
          interval_count: price.recurring?.interval_count ?? null,
          metadata: price.metadata
        })
    }

    // Maintenant nous pouvons insérer/mettre à jour l'abonnement
    const subscriptionData = {
      id: subscription.id,
      user_id: userId,
      status: subscription.status,
      price_id: priceId,
      quantity: subscription.items.data[0].quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      created: new Date(subscription.created * 1000),
      ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null,
      trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
      trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
    }

    const { error } = await supabase
      .from('subscriptions')
      .upsert([subscriptionData])

    if (error) throw error

   // Gérer les jetons selon le type d'événement
    if (event.type === 'customer.subscription.created' || 
        (event.type === 'customer.subscription.updated' && 
         subscription.status === 'active')) {
         //&& !subscription.cancel_at_period_end)) {
      // Récupérer le produit pour obtenir le nombre de jetons
      const product = await stripe.products.retrieve(
        subscription.items.data[0].price.product as string
      )

      // Récupérer le nombre de jetons depuis la base de données
      const { data: productData } = await supabase
        .from('products')
        .select('tokens')
        .eq('id', product.id)
        .single()

      if (productData?.tokens) {
        // Mettre à jour les jetons de l'utilisateur
        const { data: existingAccount } = await supabase
          .from('account_tokens')
          .select('tokens_remaining')
          .eq('user_id', userId)
          .single()

        if (!existingAccount) {
          await supabase
            .from('account_tokens')
            .insert({
              user_id: userId,
              tokens_remaining: productData.tokens,
              updated_at: new Date().toISOString()
            })
        } else {
          await supabase
            .from('account_tokens')
            .update({ 
              tokens_remaining: existingAccount.tokens_remaining + productData.tokens,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
        }
      }
    }
  } catch (error) {
    console.error('Error handling subscription:', error)
    throw error
  }
}