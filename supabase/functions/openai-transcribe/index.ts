import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse multipart form data
    const formData = await req.formData()
    const audioFile = formData.get('file') as File
    const language = formData.get('language') as string || 'fr'
    const model = formData.get('model') as string || 'whisper-1'

    // Validate input
    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: audio file is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get OpenAI API key from environment (stored securely in Supabase)
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Prepare form data for OpenAI
    const openaiFormData = new FormData()
    openaiFormData.append('file', audioFile)
    openaiFormData.append('model', model)
    openaiFormData.append('language', language)

    // Call OpenAI Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: openaiFormData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI Whisper API error:', error)
      return new Response(
        JSON.stringify({ error: 'OpenAI Whisper API request failed', details: error }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in openai-transcribe function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
