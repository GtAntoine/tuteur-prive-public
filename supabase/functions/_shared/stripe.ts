import Stripe from 'https://esm.sh/stripe@14.14.0'

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient()
})

export { stripe, Stripe }
