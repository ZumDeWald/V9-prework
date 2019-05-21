import React from 'react';
import './Entry.css';

function Entry({entry}) {
  return (
    <article className='pm0 fbc'>
      <ul className='fbr entry-container'>
        <li className='entry-item'>Name: {entry.name}</li>
        <li className='entry-item'>Mass: {entry.mass}</li>
        <li className='entry-item'>Year: {entry.year}</li>
        <li className='entry-item'>Name Type: {entry.nametype}</li>
        <li className='entry-item'>Lat: {entry.geolocation.latitude}</li>
        <li className='entry-item'>Long: {entry.geolocation.longitude}</li>
      </ul>
    </article>
  );
}

export default Entry;
