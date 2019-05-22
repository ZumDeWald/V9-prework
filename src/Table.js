import React, {useEffect, useState} from 'react';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(
        'https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=50',
      );
      let returnData = await res.json();
      setData(returnData);
    }
    fetchData().catch(err => console.warn(err));
  }, []);

  return (
    <div id='table-container' className='pm0'>
      <ul className='fbr entry-container'>
        <li className='title-item'>Name</li>
        <li className='title-item'>Mass (grams)</li>
        <li className='title-item'>Year</li>
        <li className='title-item'>Name Type</li>
        <li className='title-item'>Lat</li>
        <li className='title-item'>Long</li>
      </ul>
      {!!data ? (
        data.map(entry => <Entry entry={entry} key={entry.id} />)
      ) : (
        <div className='pm0 fbc'>LOADING</div>
      )}
    </div>
  );
}

export default Table;
