import fs from "fs";
import path from "path";

const BASE_URL = "https://www.dnd5eapi.co/api";
const CACHE_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "classesCache.json"
);

function readCache() {
  try {
    const data = fs.readFileSync(CACHE_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cache file:", error);
    return { classes: [], classDetails: {} };
  }
}

function writeCache(data) {
  try {
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to cache file:", error);
  }
}

export async function fetchclasses(forceUpdate = false) {
  const cache = readCache();
  if (!forceUpdate && cache.classes.length > 0) {
    return cache.classes;
  }

  try {
    const response = await fetch(`${BASE_URL}/classes`);
    const data = await response.json();
    cache.classes = data.results;
    writeCache(cache);
    return data.results;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return cache.classes;
  }
}

export async function fetchclassDetails(index, forceUpdate = false) {
  const cache = readCache();
  if (!forceUpdate && cache.classDetails[index]) {
    return cache.classDetails[index];
  }

  try {
    const response = await fetch(`${BASE_URL}/classes/${index}`);
    const data = await response.json();
    cache.classDetails[index] = data;
    writeCache(cache);
    return data;
  } catch (error) {
    console.error("Error fetching class details:", error);
    return cache.classDetails[index] || null;
  }
}

export async function updateCache() {
  const classes = await fetchclasses(true);
  const classDetails = {};

  for (const cls of classes) {
    classDetails[cls.index] = await fetchclassDetails(cls.index, true);
  }

  writeCache({ classes, classDetails });
  console.log("Cache updated successfully");
}
