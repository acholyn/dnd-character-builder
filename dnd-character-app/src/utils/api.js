// call each of the update cache functions, likely attached to a button
import { updateRaceCache } from "./updateRaceCache.js";
import { updateClassCache } from "./updateClassCache.js";
import { updateFeatCache } from "./updateFeatCache.js";
import { updateEquipmentCache } from "./updateEquipmentCache.js";
import { updateSpellCache } from "./updateSpellCache.js";
import { updateBackgroundCache } from "./updateBackgroundCache.js";

export async function updateCache() {
  updateRaceCache();
  updateClassCache();
  updateFeatCache();
  updateEquipmentCache();
  updateSpellCache();
  updateBackgroundCache();
}
