import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">FGC Tools</div>
            <div className="navbar-links">
              <a 
                href="#"
                className={mode === 'regular' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setMode('regular');
                }}
              >
                MvC2 Team Generator
              </a>
              <a 
                href="#"
                className={mode === 'ratio' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setMode('ratio');
                }}
              >
                MvC2 Ratio Builder
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main className="content-container">
        {mode === 'regular' ? <TeamGenerator /> : <RatioTeamBuilder />}
      </main>
    </div>
  );
}

export default App;
