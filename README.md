# Sitecore Search POC — Next.js + XM Cloud (Ready-to-run)

**Quick setup:** A minimal Next.js App Router POC that demos Sitecore Search integration.
This repo includes a mock data mode so you can demo search + category facets without Sitecore credentials.

---

## Prerequisites
- Node.js 18+ (tested on 18)
- npm (or yarn/pnpm)
- Next.js 14+ (project is configured for Next 14 in `package.json`)
- Optional: Sitecore Search tenant (Domain ID, RFK widget ID) if you want live results

---

## What's included
```
app/
  search/
    page.tsx            # Search UI (uses Cloud SDK or mock data based on env)
    mock-search.json    # Sample data used when NEXT_PUBLIC_USE_MOCK=true
  api/
    search/route.ts     # Optional proxy to call Sitecore Search API (server-only secret)
src/
  bootstrap/Bootstrap.tsx  # Cloud SDK initialization
.env.local.example
package.json
tsconfig.json
next.config.js
README.md  <-- this file
```

---

## Run the project (step-by-step)

1. Unzip the archive and open the folder:
```bash
unzip sitecore-search-poc_facet_mock_readme.zip
cd sitecore-search-poc
```

2. Copy the example env and edit it:
```bash
cp .env.local.example .env.local
# Open .env.local and edit values:
# - NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID
# - NEXT_PUBLIC_SC_SEARCH_WIDGET_RFKID
# - (optional) SC_SEARCH_API_URL and SC_SEARCH_API_KEY if you need a proxy
# To run the demo without Sitecore, add:
# NEXT_PUBLIC_USE_MOCK=true
```

Example `.env.local` for mock/demo mode:
```
NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID=demo_domain
NEXT_PUBLIC_SC_SEARCH_WIDGET_RFKID=rfkid_7
NEXT_PUBLIC_USE_MOCK=true
```

3. Install dependencies:
```bash
npm install
```

4. Run dev server:
```bash
npm run dev
```

5. Open the demo:
- Visit `http://localhost:3000/search` — the page will show mock results and a **Filter by Category** dropdown when `NEXT_PUBLIC_USE_MOCK=true`.

---

## How the mock mode works
- When `NEXT_PUBLIC_USE_MOCK=true`, the search page fetches `app/search/mock-search.json` (served as `/search/mock-search.json`) and uses that response to render results and facets.
- This allows you to demo the UI, facet filtering, and pagination without Sitecore credentials.

---

## Switching to real Sitecore Search
By default the client code uses the Cloud SDK `getWidgetData(...)` from the browser. Two common deployment options:

### 1) Tenant exposes Search subdomain (no API key required in client)
- Set `NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID` and `NEXT_PUBLIC_SC_SEARCH_WIDGET_RFKID` in `.env.local` and **remove** `NEXT_PUBLIC_USE_MOCK` or set it to `false`.
- The browser `getWidgetData` call will reach Sitecore Search directly (subject to your tenant CORS rules).

### 2) Tenant requires server-side key (you must use the proxy)
- Fill these env vars in `.env.local`:
```
SC_SEARCH_API_URL=https://<your-search-host>/v1/search
SC_SEARCH_API_KEY=01-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SC_SEARCH_DOMAIN_ID=<your-domain-id>
NEXT_PUBLIC_SC_SEARCH_WIDGET_RFKID=<your-rfkid>
NEXT_PUBLIC_USE_MOCK=false
```
- The repo contains `app/api/search/route.ts`, a Next.js Route Handler that will forward POST requests to the Sitecore Search API using `SC_SEARCH_API_KEY` kept server-side.
- **Important:** The client currently uses `getWidgetData` from the Cloud SDK when not in mock mode. If your tenant requires a proxy (option 2), you'll need to replace the client `getWidgetData` call with a `fetch('/api/search', { method: 'POST', body: JSON.stringify(payload) })` to call the server proxy. Example server payload (minimal):
```json
{
  "widget": {
    "items": [
      {
        "rfk_id": "rfkid_7",
        "entity": "content",
        "search": {
          "content": {},
          "query": { "keyphrase": "cloud" },
          "results": { "limit": 10, "offset": 0 }
        }
      }
    ]
  },
  "context": { "locale": { "country": "us", "language": "en" } }
}
```

---

## Files to edit for customization
- `app/search/page.tsx` — UI + client-side Cloud SDK integration and mock logic.
- `src/bootstrap/Bootstrap.tsx` — Cloud SDK initialization; inject consent logic here if needed.
- `app/search/mock-search.json` — change sample items to match your expected attributes (title, description, image_url, category).
- `app/api/search/route.ts` — server proxy (ensure environment variables are set on your host).

---

## Troubleshooting
- **Empty results**: Verify RFK ID matches the Search Results widget in Sitecore Search and that the widget returns attributes expected by the UI (`title`, `description`, `image_url`, `category`). Use the tenant's API Explorer to test directly.
- **CORS**: If the tenant doesn't allow your local origin, use the server proxy (route.ts) and call it from client code.
- **Secrets leaking**: Never set `SC_SEARCH_API_KEY` in client-side env vars or commit to git. Keep server-only keys in the hosting provider settings (Vercel, Netlify, etc.).
- **Cloud SDK errors**: Check console network traces — `getWidgetData` calls will show request and response payloads when enabled.

---

## Next steps I can help with
- Patch the client to automatically use the server proxy when `SC_SEARCH_API_KEY` is present (so no manual code change is needed).  
- Add more facets (date, content_type), highlight snippets, result templates, or analytics tracking for clicks.  
- Convert the demo to Pages Router if your codebase uses it.

---

## License & credits
MIT — use freely. If you want this pushed to a GitHub repo I can prepare that too.

---

*Chalo bhai — README ready. Ab bata, zip naya chahiye kya (README added) ya main abhi download link de du?*
