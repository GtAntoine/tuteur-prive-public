export async function buffer(readable: Request) {
  const chunks = []
  const reader = readable.body?.getReader()
  if (!reader) throw new Error('No reader available')

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }

  return Buffer.concat(chunks)
}