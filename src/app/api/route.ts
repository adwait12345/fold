export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get('tag')
  const res = await fetch(`https://api.stackexchange.com/2.3/tags?pagesize=5&order=desc&sort=popular&inname=${tag}&site=stackoverflow`)
  const product = await res.json()
 
  return Response.json({ product })
}