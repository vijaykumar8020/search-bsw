import { getLocations } from "../api/search/getLocations";
import SearchBox from "./SearchBox";

export default async function SearchPage() {
  const data = await getLocations({
    city: "Dallas",
    radius: 10,
  });

  const locations = data?.locationResults || [];

  console.log("Fetched locations:", data);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Suggested locations near Dallas, TX
      </h1>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <SearchBox />

      <div className="grid md:grid-cols-3 gap-4">
        {locations.map((loc: any, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{loc.locationName}</h2>
            <p className="text-sm text-gray-600">{loc.locationType}</p>

            <p className="mt-2 text-sm">
              📍 {loc.locationStreet}, {loc.locationCity}, {loc.locationState}{" "}
              {loc.locationZip}
            </p>

            {loc.locationPhone && (
              <p className="mt-2 text-sm">📞 {loc.locationPhone}</p>
            )}

            <p className="mt-2 text-sm">
              {loc.allowWalkIns
                ? "✅ Accepting Walk-Ins"
                : "🚫 Not Accepting Walk-Ins"}
            </p>

            {loc.openNowMessage && (
              <p className="mt-2 text-sm">⏰ {loc.openNowMessage}</p>
            )}

            {loc.locationUrl && (
              <a
                href={loc.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                View Location →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
