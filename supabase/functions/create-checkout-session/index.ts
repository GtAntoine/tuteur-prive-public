import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { stripe } from '../_shared/stripe.ts'
import { createOrRetrieveCustomer } from '../_shared/customers.ts'
import { getURL } from '../_shared/utils.ts'
import { supabaseAdmin } from '../_shared/supabase-admin.ts'

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { priceId } = await req.json();
    
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new Error('Not authenticated');
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id,
      email: user.email || ''
    });

    // Utiliser l'URL de production pour la redirection
    // const productionUrl = 'https://tuteurprive-stripe.netlify.app'; 
    const productionUrl = getURL();
   // const productionUrl = 'https://tuteurprive.com'; // Remplacer par votre URL de production
    

    const session = await stripe.checkout.sessions.create({
      customer,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${productionUrl}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${productionUrl}/settings/billing`,
      subscription_data: { metadata: { user_id: user.id } }
    });

    return new Response(
      JSON.stringify({ session_url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
