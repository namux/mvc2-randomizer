import React, { useState, useEffect } from 'react';
import { characters, getRandomCharacter } from '../data/characters';

const TeamGenerator = () => {
  const defaultTeam = [
    characters.find(char => char.name === 'Magneto'),
    characters.find(char => char.name === 'Storm'),
    characters.find(char => char.name === 'Psylocke')
  ];

  const [team, setTeam] = useState(defaultTeam);
  const [isSpinning, setIsSpinning] = useState([false, false, false]);
  const [isChosen, setIsChosen] = useState([false, false, false]);

  const generateTeam = () => {
    setIsSpinning([true, false, false]);
    setIsChosen([false, false, false]);
    setTeam([...defaultTeam]); // Reset to default team

    const selectCharacter = (index) => {
      setTimeout(() => {
        setTeam(prevTeam => {
          const newTeam = [...prevTeam];
          newTeam[index] = getRandomCharacter(newTeam.filter(Boolean).map(c => c.name));
          return newTeam;
        });
        
        setIsSpinning(prev => {
          const next = [...prev];
          next[index] = false;
          if (index < 2) next[index + 1] = true;
          return next;
        });

        setIsChosen(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });

        if (index < 2) {
          selectCharacter(index + 1);
        }
      }, 2000); // Duration for each character selection
    };

    selectCharacter(0);
  };

  const renderCharacterSlot = (index) => {
    const char = team[index];
    return (
      <div key={index} className="character-slot">
        <div className={`character-card ${isSpinning[index] ? 'spinning' : ''}`}>
          {isSpinning[index] ? (
            <img 
              src={characters[Math.floor(Math.random() * characters.length)].image} 
              alt="Spinning" 
            />
          ) : (
            <>
              <img 
                src={char.image} 
                alt={char.name} 
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} 
              />
              {isChosen[index] && (
                <p className="character-name">{char.name}</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const intervals = isSpinning.map((spinning, index) => {
      if (spinning) {
        return setInterval(() => {
          setTeam(prev => {
            const newTeam = [...prev];
            newTeam[index] = characters[Math.floor(Math.random() * characters.length)];
            return newTeam;
          });
        }, 100);
      }
      return null;
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, [isSpinning]);

  return (
    <div>
      <div className="team-generator-header">
      <h2>Random Team Generator</h2>
      </div>
      <div className="team-display-large">
        {[0, 1, 2].map(renderCharacterSlot)}
      </div>
      <div className="team-generator-button-container">
        <button 
          onClick={generateTeam} 
          disabled={isSpinning.some(Boolean)}
          className={`team-generator-button ${isSpinning.some(Boolean) ? 'generating' : ''}`}
        >
          {isSpinning.some(Boolean) ? 'Generating...' : 'Generate Team'}
        </button>
      </div>
    </div>
  );
};

export default TeamGenerator;
