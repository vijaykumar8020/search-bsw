export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();

  const url = `${process.env.API_BASE}/V2/Places/GetLocations?${query}`;
  console.log("➡️ Locations API:", url);

  const res = await fetch(url, {
    headers: { "x-bsw-clientid": "BSWHealth.com" },
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response(`API error: ${res.status}`, { status: res.status });
  }

  return new Response(await res.text(), { status: 200 });
}
