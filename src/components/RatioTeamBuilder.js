import React, { useState } from 'react';
import { characters, getCharactersByRatio, getRandomCharacter } from '../data/characters';

const RatioTeamBuilder = () => {
  const [team, setTeam] = useState([null, null, null]);
  const [remainingPoints, setRemainingPoints] = useState(7);

  const handleCharacterClick = (character) => {
    setTeam(prevTeam => {
      // Check if the character is already in the team
      const existingIndex = prevTeam.findIndex(char => char && char.name === character.name);
      
      if (existingIndex !== -1) {
        // Remove character if it's already in the team
        const newTeam = [...prevTeam];
        newTeam[existingIndex] = null;
        setRemainingPoints(prev => prev + character.ratio);
        return newTeam;
      } else {
        // Add character to the first empty slot if not already in team
        const emptyIndex = prevTeam.findIndex(char => char === null);
        if (emptyIndex !== -1 && remainingPoints >= character.ratio) {
          const newTeam = [...prevTeam];
          newTeam[emptyIndex] = character;
          setRemainingPoints(prev => prev - character.ratio);
          return newTeam;
        }
      }
      
      // Return unchanged team if no action was taken
      return prevTeam;
    });
  };

  const resetTeam = () => {
    setTeam([null, null, null]);
    setRemainingPoints(7);
  };

  const generateRandomTeam = () => {
    let newTeam = [null, null, null];
    let points = 7;
    
    for (let i = 0; i < 3; i++) {
      const maxRatio = Math.min(points, 5);
      const availableCharacters = characters.filter(char => char.ratio <= maxRatio);
      const randomChar = getRandomCharacter(newTeam.filter(Boolean).map(c => c.name), availableCharacters);
      
      if (randomChar) {
        newTeam[i] = randomChar;
        points -= randomChar.ratio;
      }
    }
    
    setTeam(newTeam);
    setRemainingPoints(points);
  };

  return (
    <div>
      <h2>Ratio Team Builder</h2>
      <p>Remaining Points: {remainingPoints}</p>
      <div className="team-display">
        {team.map((char, index) => (
          <div key={index} className="character-card">
            {char ? (
              <>
                <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
                <p>{char.name} ({char.ratio})</p>
              </>
            ) : (
              <>
                <img src={`/images/characters/slot-${index + 1}.png`} alt={`Empty Slot ${index + 1}`} />
                <p>Empty Slot</p>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={resetTeam}>Reset Team</button>
      <button onClick={generateRandomTeam}>Generate Random Team</button>
      <h3>Available Characters:</h3>
      <div className="available-characters">
        {characters.map((char) => {
          const isSelected = team.some(c => c && c.name === char.name);
          return (
            <div key={char.name} className="character-item">
              <button
                onClick={() => handleCharacterClick(char)}
                disabled={team.every(Boolean) && !isSelected || (!isSelected && remainingPoints < char.ratio)}
                className={isSelected ? 'selected' : ''}
              >
                <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
              </button>
              <div className="character-info">
                <span className="character-name">{char.name}</span>
                <span className="character-ratio">({char.ratio})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatioTeamBuilder;
