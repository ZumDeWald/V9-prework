import React from 'react';
import Table from './Table.js';
import './App.css';

function App() {
  return (
    <div id='app-container' className='pm0'>
      <header className='pm0 fbr header'>
        <i className='fas fa-meteor fa-4x' />
        <p className='header-text'>Meteorite Landing Data</p>
      </header>

      <Table />

      <footer id='footer' className='fbc'>
        <a
          href='https://github.com/ZumDeWald/V9-prework'
          className='pointy'
          target='_blank'
          rel='noopener noreferrer'>
          Source Code (github)
        </a>
      </footer>
    </div>
  );
}

export default App;
