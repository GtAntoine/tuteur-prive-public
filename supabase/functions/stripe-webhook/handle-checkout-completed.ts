import type Stripe from 'stripe';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js'
  import { stripe } from '../_shared/stripe.ts'

interface TokenPriceMap {
  [key: string]: number;
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  stripe: Stripe,
  supabaseAdmin: SupabaseClient
) {
  const userId = session.metadata?.user_id;
  if (!userId) {
    console.error('No user_id found in session metadata');
    return;
  }

try {
  // Récupérer les informations du produit
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 1,
    expand: ['data.price.product']
  });

  const product = lineItems.data[0]?.price?.product as Stripe.Product;
  if (!product) {
    console.error('No product found in line items');
    return;
  }

  // Récupérer le nombre de jetons depuis la base de données
  const { data: productData } = await supabaseAdmin
    .from('products')
    .select('tokens')
    .eq('id', product.id)
    .single();

  if (!productData?.tokens) {
    console.error('No tokens defined for product:', product.id);
    return;
  }

  // Mettre à jour les jetons de l'utilisateur
  const { data: existingAccount } = await supabaseAdmin
    .from('account_tokens')
    .select('tokens_remaining')
    .eq('user_id', userId)
    .single();

  if (!existingAccount) {
    await supabaseAdmin
      .from('account_tokens')
      .insert({
        user_id: userId,
        tokens_remaining: productData.tokens,
        updated_at: new Date().toISOString()
      });
  } else {
    await supabaseAdmin
      .from('account_tokens')
      .update({ 
        tokens_remaining: existingAccount.tokens_remaining + productData.tokens,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
  }
} catch (error) {
  console.error('Error processing checkout session:', error);
  throw error;
}
}
