export async function getLocations(searchParams: any = {}) {
  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(
    `${process.env.API_BASE}/${process.env.GET_LOCATIONS}?${query}`,
    {
      headers: {
        "x-bsw-clientid": "BSWHealth.com",
      },
      cache: "no-store", // disable caching
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
