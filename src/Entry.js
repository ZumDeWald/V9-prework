import React from 'react';
import './Entry.css';

function Entry({entry}) {
  return (
    <article className='pm0 fbc'>
      <ul className='fbr entry-container'>
        <li className='entry-item entry-name'>{entry.name}</li>
        <li className='entry-item'>
          {!!entry.id ? entry.id : '[not recorded]'}
        </li>
        <li className='entry-item'>
          {!!entry.mass ? entry.mass : '[not recorded]'}
        </li>
        <li className='entry-item'>
          {!!entry.year ? entry.year.substring(0, 4) : '[not recorded]'}
        </li>
        <li className='entry-item'>{entry.fall}</li>
        <li className='entry-item'>
          {!!entry.recclass ? entry.recclass : '[not recorded]'}
        </li>
        <li className='entry-item entry-geo orange'>
          {!!entry.geolocation ? (
            <a
              href={`https://maps.google.com/?q=${entry.geolocation.latitude},${
                entry.geolocation.longitude
              }`}
              target='_blank'
              rel='noopener noreferrer'>
              {entry.geolocation.latitude}, {entry.geolocation.longitude}
            </a>
          ) : (
            '[not recorded]'
          )}
        </li>
      </ul>
    </article>
  );
}

export default Entry;
