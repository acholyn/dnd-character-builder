const fs = require("fs");
const fetch = require("node-fetch");

const BASE_URL = "https://www.dnd5eapi.co/api";

export async function updateRaceCache() {
  const cache = { races: [], raceDetails: {} };

  // Fetch races
  const racesResponse = await fetch(`${BASE_URL}/races`);
  const racesData = await racesResponse.json();
  cache.races = racesData.results;

  // Fetch details for each race
  for (const race of cache.races) {
    const detailsResponse = await fetch(`${BASE_URL}/races/${race.index}`);
    const detailsData = await detailsResponse.json();
    cache.raceDetails[race.index] = detailsData;
  }

  // Write to file
  fs.writeFileSync(
    "./src/data/racesCache.json",
    JSON.stringify(cache, null, 2)
  );
  console.log("Cache updated successfully");
}

updateRaceCache().catch(console.error);
