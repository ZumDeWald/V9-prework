import React, {useEffect, useState} from 'react';
import escapeRegExp from 'escape-string-regexp';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  /* Fetch Initial Data and View Data */
  const [data, setData] = useState(null);
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    async function initialFetch() {
      let res = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json');
      let returnData = await res.json();
      setData(returnData);
    }
    initialFetch().catch(err => console.warn(err));
  }, []);

  /* Handle Search */
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!!search) {
      const match = new RegExp(escapeRegExp(search), 'i');
      setViewData(data.filter(entry => match.test(entry.name)));
    } else if (!!data) {
      setViewData(data.slice(0, 10));
    }
  }, [data, search]);

  const handleSetSearch = input => {
    setSearch(input);
  };

  /* Handle Previous and Next buttons */

  return (
    <main>
      <input
        className='search fbc'
        type='text'
        placeholder='Search By Name'
        onChange={e => {
          handleSetSearch(e.target.value);
        }}
        value={search}
      />
      <div id='table-container' className='pm0'>
        <ul id='table-header' className='fbr entry-container'>
          <li className='title-item'>Name</li>
          <li className='title-item'>Mass (grams)</li>
          <li className='title-item'>Year</li>
          <li className='title-item'>Name Type</li>
          <li className='title-item'>Lat</li>
          <li className='title-item'>Long</li>
        </ul>
        {!!viewData ? (
          viewData.map(entry => <Entry entry={entry} key={entry.id} />)
        ) : (
          <div className='pm0 fbc'>No Matching Names</div>
        )}
      </div>
      <div className='prev-next'>
        <button name='prev'>Previous 10</button>
        <button name='next'>Next 10</button>
      </div>
    </main>
  );
}

export default Table;
