import React from 'react';
import './Entry.css';

function Entry({entry}) {
  return (
    <article className='pm0 fbc'>
      <ul className='fbr entry-container'>
        <li className='entry-item'>{entry.name}</li>
        <li className='entry-item'>
          {!!entry.mass ? entry.mass : '[not recorded]'}
        </li>
        <li className='entry-item'>
          {!!entry.year ? entry.year.substring(0, 4) : '[not recorded]'}
        </li>
        <li className='entry-item'>{entry.nametype}</li>
        <li className='entry-item'>{entry.geolocation.latitude}</li>
        <li className='entry-item'>{entry.geolocation.longitude}</li>
      </ul>
    </article>
  );
}

export default Entry;
