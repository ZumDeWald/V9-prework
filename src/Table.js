import React, {useEffect, useState} from 'react';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    async function initialFetch() {
      let res = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json');
      let returnData = await res.json();
      setData(returnData);
      setViewData(returnData.slice(0, 10));
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
        placeholder='Search By Name'
        onChange={e => {
          handleSetSearch(e.target.value);
        }}
        value={search}
      />
      <ul id='table-header' className='fbr entry-container'>
        <li className='title-item'>Name</li>
        <li className='title-item'>Mass (grams)</li>
        <li className='title-item'>Year</li>
        <li className='title-item'>Name Type</li>
        <li className='title-item'>Lat</li>
        <li className='title-item'>Long</li>
      </ul>
      {!!data ? (
        viewData.map(entry => <Entry entry={entry} key={entry.id} />)
      ) : (
        <div className='pm0 fbc'>LOADING</div>
      )}
    </div>
  );
}

export default Table;
