export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();

  // ✅ yaha pe external API endpoint fix kar diya
  const url = `${process.env.API_BASE}/V2/Typeahead/GetAllMatchingCitiesOrZipCodes?${query}`;
  console.log("➡️ Forwarding to:", url);

  const res = await fetch(url, {
    headers: {
      "x-bsw-clientid": "BSWHealth.com",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ API error:", res.status, err);
    return new Response(JSON.stringify({ error: err }), { status: res.status });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   let resp;

//   if (process.env.NEXT_PUBLIC_USE_MOCK) {
//     // Mock JSON ko GET se load karna hai
//     resp = await fetch(process.env.NEXT_PUBLIC_USE_MOCK);
//   } else {
//     // Real Sitecore API
//     resp = await fetch(process.env.SC_SEARCH_API_URL!, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `APIKey ${process.env.SC_SEARCH_API_KEY!}`,
//         'rfk-domain-id': process.env.NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID!,
//       },
//       body: JSON.stringify(body),
//     });
//   }

//   const data = await resp.json();
//   return NextResponse.json(data);
// }
