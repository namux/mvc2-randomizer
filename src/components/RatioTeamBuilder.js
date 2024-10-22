import React, { useState } from 'react';
import { characters, getCharactersByRatio, getRandomCharacter } from '../data/characters';

const RatioTeamBuilder = () => {
  const [team, setTeam] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(7);

  const handleCharacterClick = (character) => {
    if (team.some(c => c.name === character.name)) {
      // Remove the character from the team
      setTeam(team.filter(c => c.name !== character.name));
      setRemainingPoints(remainingPoints + character.ratio);
    } else if (team.length < 3 && remainingPoints >= character.ratio) {
      // Add the character to the team if there's space and enough points
      setTeam([...team, character]);
      setRemainingPoints(remainingPoints - character.ratio);
    }
  };

  const resetTeam = () => {
    setTeam([]);
    setRemainingPoints(7);
  };

  const generateRandomTeam = () => {
    let newTeam = [];
    let points = 7;
    
    while (newTeam.length < 3 && points > 0) {
      const maxRatio = Math.min(points, 5);
      const availableCharacters = characters.filter(char => char.ratio <= maxRatio);
      const randomChar = getRandomCharacter(newTeam.map(c => c.name), availableCharacters);
      
      if (randomChar) {
        newTeam.push(randomChar);
        points -= randomChar.ratio;
      } else {
        break;
      }
    }
    
    setTeam(newTeam);
    setRemainingPoints(points);
  };

  return (
    <div>
      <h2>Ratio Team Builder</h2>
      <p>Remaining Points: {remainingPoints}</p>
      <p>Team Size: {team.length} / 3</p>
      <button onClick={resetTeam}>Reset Team</button>
      <button onClick={generateRandomTeam}>Generate Random Team</button>
      <h3>Characters:</h3>
      <div className="available-characters">
        {characters.map((char) => {
          const isSelected = team.some(c => c.name === char.name);
          return (
            <div key={char.name} className="character-item">
              <button
                onClick={() => handleCharacterClick(char)}
                disabled={team.length === 3 && !isSelected || (!isSelected && remainingPoints < char.ratio)}
                className={isSelected ? 'selected' : ''}
              >
                <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
              </button>
              <span className="character-name">{char.name}</span>
              <span className="character-ratio">({char.ratio})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatioTeamBuilder;
