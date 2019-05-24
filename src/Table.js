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
    if (range >= 50) {
      setRange(range - 50);
    }
  };
  const handleNext = () => {
    if (range + 50 <= viewData.length) {
      setRange(range + 50);
    }
  };

  /* Handle Search */
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!!search) {
      const match = new RegExp(escapeRegExp(search), 'i');
      setViewData(data.filter(entry => match.test(entry.name)));
    } else if (!!data) {
      setViewData(data);
    }
  }, [data, search]);

  const handleSetSearch = input => {
    setRange(0);
    setSearch(input);
  };

  return (
    <main>
      <section className='search fbr'>
        <input
          className='fbc'
          type='text'
          placeholder='Search By Name'
          onChange={e => {
            handleSetSearch(e.target.value);
          }}
          value={search}
        />
        <button
          className='pointy'
          onClick={() => {
            setSearch('');
          }}>
          Clear Search
        </button>
      </section>
      <div id='table-container' className='pm0'>
        <ul id='table-header' className='fbr entry-container'>
          <li className='title-item entry-name'>Name</li>
          <li className='title-item'>ID</li>
          <li className='title-item'>Mass (grams)</li>
          <li className='title-item'>Year</li>
          <li className='title-item'>Fall</li>
          <li className='title-item'>Recclass</li>
          <li className='title-item'>
            Geolocation
            <i className='fas fa-external-link-alt' />
          </li>
        </ul>
        {!!viewData && !!search ? (
          viewData
            .slice(range, range + 50)
            .map(entry => <Entry entry={entry} key={entry.id} />)
        ) : !!viewData ? (
          viewData
            .slice(range, range + 50)
            .map(entry => <Entry entry={entry} key={entry.id} />)
        ) : (
          <div className='pm0 fbc'>No Matching Names</div>
        )}
      </div>
      <div className='prev-next fbr'>
        {range >= 50 && (
          <button name='prev' className='pointy' onClick={handlePrev}>
            {'<< Previous 50'}
          </button>
        )}
        {range < viewData.length && viewData.length > 50 && (
          <button name='next' className='pointy' onClick={handleNext}>
            {'Next 50 >>'}
          </button>
        )}
        <p>Total Results: {viewData.length}</p>
      </div>
    </main>
  );
}

export default Table;
