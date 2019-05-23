import React, {useEffect, useState} from 'react';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function initialFetch() {
      let res = await fetch(
        'https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=50',
      );
      let returnData = await res.json();
      setData(returnData);
    }

    initialFetch().catch(err => console.warn(err));
  }, []);

  const handleSetSearch = input => {
    setSearch(input);
  };

  return (
    <div id='table-container' className='pm0'>
      <input
        className='search'
        type='text'
        placeholder='Search Through Data Set'
        onChange={e => {
          handleSetSearch(e.target.value);
        }}
        value={search}
      />
      <button>Filter</button>
      <ul id='table-header' className='fbr entry-container'>
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
