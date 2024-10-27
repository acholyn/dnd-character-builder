import React, { useState, useEffect } from "react";
import { fetchRaces, fetchRaceDetails, updateCache } from "../utils/api";

function RaceStep({ character, updateCharacter }) {
  const [races, setRaces] = useState([]);
  const [raceDetails, setRaceDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRaces().then(setRaces);
  }, []);

  useEffect(() => {
    if (character.race) {
      fetchRaceDetails(character.race).then(setRaceDetails);
    }
  }, [character.race]);

  const handleUpdateCache = async () => {
    setIsUpdating(true);
    try {
      await updateCache();
      // Refresh races and race details after update
      const updatedRaces = await fetchRaces();
      setRaces(updatedRaces);
      if (character.race) {
        const updatedDetails = await fetchRaceDetails(character.race);
        setRaceDetails(updatedDetails);
      }
      alert("Cache updated successfully!");
    } catch (error) {
      console.error("Error updating cache:", error);
      alert("Failed to update cache. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h3>Choose your race:</h3>
      <select
        value={character.race}
        onChange={(e) => updateCharacter("race", e.target.value)}>
        <option value="">Select a race</option>
        {races.map((race) => (
          <option key={race.index} value={race.index}>
            {race.name}
          </option>
        ))}
      </select>
      {raceDetails && (
        <div>
          <h4>Race Information: {raceDetails.name}</h4>
          {/* ... rest of the race details ... */}
        </div>
      )}
      <button onClick={handleUpdateCache} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Race Data"}
      </button>
    </div>
  );
}

export default RaceStep;
