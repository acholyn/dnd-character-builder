import React, { useState } from "react";
import RaceStep from "./steps/RaceStep";
import ClassStep from "./steps/ClassStep";
import AbilityScoresStep from "./steps/AbilityScoresStep";
import ReviewStep from "./steps/ReviewStep";

const steps = ["Race", "Class", "Ability Scores", "Review"];

function CharacterCreator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [character, setCharacter] = useState({
    race: "",
    class: "",
    abilityScores: {},
  });

  const updateCharacter = (field, value) => {
    setCharacter((prevChar) => ({ ...prevChar, [field]: value }));
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <RaceStep character={character} updateCharacter={updateCharacter} />
        );
      case 1:
        return (
          <ClassStep character={character} updateCharacter={updateCharacter} />
        );
      case 2:
        return (
          <AbilityScoresStep
            character={character}
            updateCharacter={updateCharacter}
          />
        );
      case 3:
        return <ReviewStep character={character} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{steps[currentStep]}</h2>
      {renderStep()}
      <div>
        {currentStep > 0 && <button onClick={prevStep}>Previous</button>}
        {currentStep < steps.length - 1 && (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </div>
  );
}

export default CharacterCreator;
