import React, { useState } from 'react';
import { getRandomCharacter } from '../data/characters';

const TeamGenerator = () => {
  const [team, setTeam] = useState([]);
  const [assists, setAssists] = useState([]);

  const generateTeam = () => {
    const newTeam = [];
    for (let i = 0; i < 3; i++) {
      const char = getRandomCharacter(newTeam.map(c => c.name));
      newTeam.push(char);
    }
    setTeam(newTeam);
  };

  const generateAssists = () => {
    const newAssists = team.map(() => Math.floor(Math.random() * 3) + 1);
    setAssists(newAssists);
  };

  return (
    <div>
      <h2>Random Team Generator</h2>
      <button onClick={generateTeam}>Generate Team</button>
      <button onClick={generateAssists} disabled={team.length === 0}>Generate Assists</button>
      <ul>
        {team.map((char, index) => (
          <li key={char.name}>
            {char.name} {assists[index] && `(Assist ${assists[index]})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamGenerator;
