import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');

  return (
    <div className="App">
      <header className="App-header">
        <nav className="main-nav">
          <div className="nav-logo">FGC Tools</div>
          <ul className="nav-links">
            <li>
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
            </li>
            <li>
              <a 
                href="#"
                className={mode === 'ratio' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setMode('ratio');
                }}
              >
                Ratio Team Builder
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {mode === 'regular' ? <TeamGenerator /> : <RatioTeamBuilder />}
      </main>
    </div>
  );
}

export default App;
