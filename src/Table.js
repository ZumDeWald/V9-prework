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

  /* Handle Previous and Next buttons */
  const [range, setRange] = useState(0);
  const handlePrev = () => {
    if (range >= 10) {
      setRange(range - 10);
    }
  };
  const handleNext = () => {
    if (range + 10 <= data.length) {
      setRange(range + 10);
    }
  };

  /* Handle Search */
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!!search) {
      const match = new RegExp(escapeRegExp(search), 'i');
      setViewData(data.filter(entry => match.test(entry.name)).slice(0, 50));
    } else if (!!data && range === 0) {
      setViewData(data.slice(0, 10));
    } else if (!!data && range > 0) {
      setViewData(data.slice(`${range}`, `${range}` + 10));
    }
  }, [data, search, range]);

  const handleSetSearch = input => {
    setSearch(input);
  };

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
        {range >= 10 && (
          <button name='prev' onClick={handlePrev}>
            Previous 10
          </button>
        )}
        <button name='next' onClick={handleNext}>
          Next 10
        </button>
      </div>
    </main>
  );
}

export default Table;
