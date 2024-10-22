import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');

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
        {mode === 'regular' ? <TeamGenerator /> : <RatioTeamBuilder />}
      </main>
    </div>
  );
}

export default App;
