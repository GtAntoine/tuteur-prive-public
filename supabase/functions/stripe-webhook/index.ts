import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { stripe, Stripe } from '../_shared/stripe.ts'
import { supabaseAdmin } from '../_shared/supabase-admin.ts'
import { handleSubscriptionChange } from './subscription-handlers.ts'
import { handleCheckoutCompleted } from './handle-checkout-completed.ts'

// Add crypto provider for better security
const cryptoProvider = Stripe.createSubtleCryptoProvider()

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'checkout.session.completed'
])

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response('No signature provided', { status: 400 })
    }

    // Use .text() for raw body and newer webhook construction
    const body = await req.text()
    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
        undefined,
        cryptoProvider
      )
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return new Response(
        JSON.stringify({ error: `Webhook Error: ${err.message}` }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`🔔 Event received: ${event.type}`)

    if (relevantEvents.has(event.type)) {
      try {
        if (event.type === 'checkout.session.completed') {
          //await handleCheckoutCompleted(event.data.object, stripe, supabaseAdmin)
        } else if (event.type.startsWith('customer.subscription.')) {
          await handleSubscriptionChange(event, supabaseAdmin)
        }
      } catch (error) {
        console.error(`Webhook handler failed:`, error)
        return new Response(
          JSON.stringify({ error: `Webhook handler failed: ${error.message}` }), 
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(`Webhook error:`, err)
    return new Response(
      JSON.stringify({ error: `Webhook error: ${err.message}` }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
