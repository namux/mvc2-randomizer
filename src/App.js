import React, { useState } from 'react';
import TeamGenerator from './components/TeamGenerator';
import RatioTeamBuilder from './components/RatioTeamBuilder';

function App() {
  const [mode, setMode] = useState('regular');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-left">
              <div className="navbar-logo">
                <img src="/images/fgctech-logo.png" alt="FGC Tools" />
              </div>
              <a href="#" className="support-link" onClick={(e) => {
                e.preventDefault();
                openModal();
              }}>Support</a>
            </div>
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Thanks for using FGC Tech!</h2>
            <p>If you find this helpful, feel free to support me via the link below. If you have any suggestions or feedback, feel free to contact me via twitter</p>
            <a href="https://streamlabs.com/namux/tip" target="_blank" rel="noopener noreferrer" className="donate-button">
              Donate via Streamlabs
            </a>
            <a href="#" className="close-modal" onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}>Close</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
