// lib/locationsApi.ts

export async function getAllMatchingCitiesOrZipCodes(searchParams: any = {}) {
    const query = new URLSearchParams(searchParams).toString();
  
    const res = await fetch(
      `${process.env.API_BASE}/V2/Typeahead/GetAllMatchingCitiesOrZipCodes?${query}`,
      {
        headers: {
          "x-bsw-clientid": "BSWHealth.com",
        },
        cache: "no-store",
      }
    );
  
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
  
    return res.json();
  }
  