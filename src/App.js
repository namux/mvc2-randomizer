import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');

  return (
    <div className="App">
      <h1>Marvel vs Capcom 2 Team Generator</h1>
      <div>
        <button onClick={() => setMode('regular')}>Regular</button>
        <button onClick={() => setMode('ratio')}>Ratio (7 Points)</button>
      </div>
      {mode === 'regular' ? <TeamGenerator /> : <RatioTeamBuilder />}
    </div>
  );
}

export default App;
