import React, { useState, useEffect } from 'react';
import { characters, getRandomCharacter } from '../data/characters';

const TeamGenerator = () => {
  const [team, setTeam] = useState([null, null, null]);
  const [isSpinning, setIsSpinning] = useState([false, false, false]);
  const [isChosen, setIsChosen] = useState([false, false, false]);

  const generateTeam = () => {
    setIsSpinning([true, false, false]);
    setIsChosen([false, false, false]);
    setTeam([null, null, null]);

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
      }, 1000);
    };

    selectCharacter(0);
  };

  const renderCharacterSlot = (index) => {
    const char = team[index];
    if (isSpinning[index]) {
      return (
        <div key={`slot-${index}`} className="character-card spinning">
          <img src={characters[Math.floor(Math.random() * characters.length)].image} alt="Spinning" />
        </div>
      );
    } else if (char) {
      return (
        <div key={char.name} className={`character-card ${isChosen[index] ? 'chosen' : ''}`}>
          <img src={char.image} alt={char.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.png' }} />
          <p>{char.name}</p>
        </div>
      );
    } else {
      return (
        <div key={`slot-${index + 1}`} className="character-card">
          <img src={`/images/characters/slot-${index + 1}.png`} alt={`Empty Slot ${index + 1}`} />
          <p>Empty Slot</p>
        </div>
      );
    }
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
        }, 50); // Changed from 25 to 50 for slower spinning
      }
      return null;
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, [isSpinning]);

  return (
    <div>
      <h2>Random Team Generator</h2>
      <div className="team-display">
        {[0, 1, 2].map(renderCharacterSlot)}
      </div>
      <button onClick={generateTeam} disabled={isSpinning.some(Boolean)}>
        {isSpinning.some(Boolean) ? 'Generating...' : 'Generate Team'}
      </button>
    </div>
  );
};

export default TeamGenerator;
