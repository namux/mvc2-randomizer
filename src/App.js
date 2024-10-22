import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleCharacterClick = (character) => {
    if (selectedCharacters.some(c => c.id === character.id)) {
      // Remove the character from the team
      setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
    } else if (selectedCharacters.length < 4) {
      // Add the character to the team if there's space
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marvel vs Capcom 2 Team Generator</h1>
        <div className="mode-selector">
          <button 
            className={mode === 'regular' ? 'active' : ''}
            onClick={() => setMode('regular')}
          >
            Regular
          </button>
          <button 
            className={mode === 'ratio' ? 'active' : ''}
            onClick={() => setMode('ratio')}
          >
            Ratio (7 Points)
          </button>
        </div>
      </header>
      <main>
        {mode === 'regular' ? (
          <TeamGenerator />
        ) : (
          <RatioTeamBuilder
            selectedCharacters={selectedCharacters}
            handleCharacterClick={handleCharacterClick}
          />
        )}
      </main>
    </div>
  );
}

export default App;
