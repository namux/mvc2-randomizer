import React, { useState } from 'react';
import { characters, getCharactersByRatio, getRandomCharacter } from '../data/characters';

const RatioTeamBuilder = () => {
  const [team, setTeam] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(7);

  const addCharacter = (character) => {
    if (team.length < 3 && remainingPoints >= character.ratio) {
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
      <button onClick={resetTeam}>Reset Team</button>
      <button onClick={generateRandomTeam}>Generate Random Team</button>
      <div className="team-display">
        {team.map((char) => (
          <div key={char.name} className="character-card">
            <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
            <p>{char.name} ({char.ratio} points)</p>
          </div>
        ))}
      </div>
      <h3>Available Characters:</h3>
      <div className="available-characters">
        {characters.map((char) => (
          <button
            key={char.name}
            onClick={() => addCharacter(char)}
            disabled={team.length === 3 || remainingPoints < char.ratio}
          >
            <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
            <span>{char.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatioTeamBuilder;
