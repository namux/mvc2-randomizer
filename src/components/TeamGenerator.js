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
    setAssists([]);
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
      <div className="team-display">
        {team.map((char, index) => (
          <div key={char.name} className="character-card">
            <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
            <p>{char.name} {assists[index] && `(Assist ${assists[index]})`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGenerator;
