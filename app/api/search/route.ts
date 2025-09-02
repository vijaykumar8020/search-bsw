import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  let resp;

  if (process.env.NEXT_PUBLIC_USE_MOCK) {
    // Mock JSON ko GET se load karna hai
    resp = await fetch(process.env.NEXT_PUBLIC_USE_MOCK);
  } else {
    // Real Sitecore API
    resp = await fetch(process.env.SC_SEARCH_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `APIKey ${process.env.SC_SEARCH_API_KEY!}`,
        'rfk-domain-id': process.env.NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID!,
      },
      body: JSON.stringify(body),
    });
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
