import React, { useState, useEffect } from 'react';
import { characters, getCharactersByRatio, getRandomCharacter } from '../data/characters';

const RatioTeamBuilder = () => {
  const [team, setTeam] = useState([null, null, null]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleCharacterClick = (character) => {
    if (selectedSlot !== null) {
      setTeam(prevTeam => {
        const newTeam = [...prevTeam];
        newTeam[selectedSlot] = character;
        return newTeam;
      });
      setIsModalOpen(false);
      setSelectedSlot(null);
    } else {
      // Desktop behavior
      setTeam(prevTeam => {
        const existingIndex = prevTeam.findIndex(char => char && char.name === character.name);
        
        if (existingIndex !== -1) {
          const newTeam = [...prevTeam];
          newTeam[existingIndex] = null;
          return newTeam;
        } else {
          const emptyIndex = prevTeam.findIndex(char => char === null);
          if (emptyIndex !== -1 && totalPoints + character.ratio <= 7) {
            const newTeam = [...prevTeam];
            newTeam[emptyIndex] = character;
            return newTeam;
          }
        }
        
        return prevTeam;
      });
    }
  };

  const openModal = (index) => {
    setSelectedSlot(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  useEffect(() => {
    const newTotalPoints = team.reduce((sum, char) => sum + (char ? char.ratio : 0), 0);
    setTotalPoints(newTotalPoints);
  }, [team]);

  const resetTeam = () => {
    setTeam([null, null, null]);
    setTotalPoints(0);
  };

  const generateRandomTeam = () => {
    let newTeam = [null, null, null];
    let points = 0;
    
    for (let i = 0; i < 3; i++) {
      const remainingPoints = 7 - points;
      const remainingSlots = 3 - i;
      const maxRatio = Math.min(remainingPoints - (remainingSlots - 1), 5); // Ensure we can fill remaining slots
      const minRatio = i === 2 ? remainingPoints : 1; // For the last slot, use all remaining points
      
      const availableCharacters = characters.filter(char => char.ratio <= maxRatio && char.ratio >= minRatio);
      
      if (availableCharacters.length === 0) {
        // If we can't find a suitable character, start over
        return generateRandomTeam();
      }

      const randomChar = getRandomCharacter(newTeam.filter(Boolean).map(c => c.name), availableCharacters);
      
      if (randomChar) {
        newTeam[i] = randomChar;
        points += randomChar.ratio;
      } else {
        // If we can't get a random character, start over
        return generateRandomTeam();
      }
    }
    
    // Double-check that we have exactly 7 points and 3 characters
    if (points !== 7 || newTeam.some(char => char === null)) {
      return generateRandomTeam();
    }
    
    setTeam(newTeam);
    setTotalPoints(points);
  };

  return (
    <div className="ratio-team-builder">
      <div className="left-column">
        <h2>MvC2 Ratio Team Builder</h2>
        <div className="points-display">
          <p className="total-points">Total: {totalPoints}/7</p>
          <p className="remaining-points">Remaining: {7 - totalPoints}</p>
        </div>
        <div className="team-display">
          {team.map((char, index) => (
            <div 
              key={index} 
              className={`character-card ${isAnimating ? 'fade-in' : ''}`}
              onClick={() => openModal(index)}
            >
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
        <div className="team-buttons">
          <button onClick={generateRandomTeam} className="primary-button">
            Generate Ratio Team
          </button>
          <button onClick={resetTeam} className="secondary-button">Reset Team</button>
        </div>
      </div>
      <div className="right-column desktop-only">
        <div className="available-characters">
          {characters.map((char) => {
            const isSelected = team.some(c => c && c.name === char.name);
            const canSelect = !isSelected && (7 - totalPoints) >= char.ratio && team.some(c => c === null);
            return (
              <div key={char.name} className="character-item">
                <button
                  onClick={() => handleCharacterClick(char)}
                  disabled={!isSelected && !canSelect}
                  className={isSelected ? 'selected' : ''}
                >
                  <img 
                    src={char.tileImage} 
                    alt={char.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/tiles/default.png' }} 
                  />
                </button>
                <div className="character-info">
                  <span className="character-name">{char.name} ({char.ratio})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <div className="character-select-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            <h3>Select a Character</h3>
            <div className="modal-characters">
              {characters.map((char) => {
                const canSelect = (7 - totalPoints) >= char.ratio;
                return (
                  <div key={char.name} className="character-item">
                    <button
                      onClick={() => handleCharacterClick(char)}
                      disabled={!canSelect}
                    >
                      <img 
                        src={char.tileImage} 
                        alt={char.name} 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/tiles/default.png' }} 
                      />
                    </button>
                    <div className="character-info">
                      <span className="character-name">{char.name} ({char.ratio})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatioTeamBuilder;
