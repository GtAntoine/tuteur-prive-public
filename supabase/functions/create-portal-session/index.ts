import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { stripe } from '../_shared/stripe.ts'
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
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new Error('Not authenticated');
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer?.id) {
      throw new Error('No customer found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${getURL()}settings/billing`
    });

    return new Response(
      JSON.stringify({ url: session.url }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating portal session:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: error.message === 'Not authenticated' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})