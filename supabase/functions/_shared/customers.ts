import { stripe } from './stripe.ts'
import { supabaseAdmin } from './supabase-admin.ts'

export async function createOrRetrieveCustomer({
  uuid,
  email
}: {
  uuid: string
  email: string
}) {
  const { data: existingCustomer } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('user_id', uuid)
    .single()

  if (existingCustomer?.id) {
    return existingCustomer.id
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { user_id: uuid }
  })

  await supabaseAdmin
    .from('customers')
    .insert([{ id: customer.id, user_id: uuid, email }])

  return customer.id
}