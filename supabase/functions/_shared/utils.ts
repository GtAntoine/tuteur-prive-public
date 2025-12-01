export function getURL() {
  // En production, utiliser l'URL de production
  // let url = Deno.env.get('SITE_URL') ?? 'http://localhost:3000/'
  let url = Deno.env.get('SITE_URL') ?? 'https://tuteurprive-stripe.netlify.app'
  
  // S'assurer que l'URL se termine par un slash
  url = url.includes('http') ? url : `https://${url}`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  
  return url
}