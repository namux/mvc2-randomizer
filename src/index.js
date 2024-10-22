import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

console.log('Index.js is running!');

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootElement
    );
  } else {
    console.error('Failed to find the root element');
  }
});
