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
    
    while (newTeam.length < 3 && points > -1) {
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
    setRemainingPoints(7 - newTeam.reduce((sum, char) => sum + char.ratio, 0));
  };

  return (
    <div>
      <h2>Ratio Team Builder</h2>
      <p>Remaining Points: {remainingPoints}</p>
      <button onClick={resetTeam}>Reset Team</button>
      <button onClick={generateRandomTeam}>Generate Random Team</button>
      <ul>
        {team.map((char) => (
          <li key={char.name}>{char.name} ({char.ratio} points)</li>
        ))}
      </ul>
      <h3>Available Characters:</h3>
      {[5, 4, 3, 2, 1, 0, -1].map((ratio) => (
        <div key={ratio}>
          <h4>{ratio} Point Characters:</h4>
          {getCharactersByRatio(ratio).map((char) => (
            <button
              key={char.name}
              onClick={() => addCharacter(char)}
              disabled={team.length === 3 || remainingPoints < char.ratio}
            >
              {char.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RatioTeamBuilder;
