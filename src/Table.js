import React, {useEffect, useState} from 'react';
import escapeRegExp from 'escape-string-regexp';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  /* Fetch Initial Data and Staged Data and View Data */
  const [data, setData] = useState(null);
  const [stagedData, setStagedData] = useState(null);
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    async function initialFetch() {
      let res = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json');
      let returnData = await res.json();
      setData(returnData);
      setStagedData(returnData);
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

  /* Handle Search and Deep Dive Search */
  const [search, setSearch] = useState('');
  const [deep, setDeep] = useState('');
  useEffect(() => {
    if (!!search) {
      const match = new RegExp(escapeRegExp(search), 'i');
      setViewData(stagedData.filter(entry => match.test(entry.name)));
    } else if (!!deep) {
      setViewData(stagedData);
    } else if (!!data) {
      setViewData(data);
    }
  }, [data, search, deep, stagedData]);

  async function deepSearch(query) {
    let searchTerm = query.toUpperCase();
    let res = await fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=UPPER(name)%20like%20%27%25${searchTerm}%25%27`,
    );
    let returnData = await res.json();
    setStagedData(returnData);
    setViewData(returnData);
  }

  const handleSetSearch = input => {
    setRange(0);
    setSearch(input);
  };

  const handleSetDeep = input => {
    setRange(0);
    setDeep(input);
  };

  return (
    <main>
      <section className='search-container fbc'>
        <section className='search fbr'>
          <input
            className='fbc'
            type='text'
            placeholder='filter current data set'
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
            Clear
          </button>
        </section>

        <section className='search fbr'>
          <input
            className='fbc deep'
            type='text'
            placeholder='search 45k+ entries'
            onChange={e => {
              handleSetDeep(e.target.value);
            }}
            value={deep}
          />
          <button
            className='pointy deep'
            onClick={() => {
              deepSearch(deep);
            }}>
            Dig Deep!
          </button>
          <button
            className='pointy deep'
            onClick={() => {
              setDeep('');
              setStagedData(data);
              setViewData(data);
            }}>
            Clear
          </button>
        </section>

        <div className='note fbc'>
          / / initial data set = first 1000 entries
        </div>
      </section>

      <div id='table-container' className='pm0'>
        <ul id='table-header' className='fbr entry-container'>
          <li className='title-item entry-name name'>Name </li>
          <li className='title-item'>ID</li>
          <li className='title-item'>Mass (grams)</li>
          <li className='title-item'>Year</li>
          <li className='title-item'>Fall</li>
          <li className='title-item'>Recclass</li>
          <li className='title-item geo'>
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
      <div className='note fbc'>
        / / scroll in all directions to find more data
      </div>
      <div className='prev-next fbr'>
        {range >= 50 ? (
          <button name='prev' className='pointy' onClick={handlePrev}>
            {'<< Previous 50'}
          </button>
        ) : (
          <button name='prev' className='disabled'>
            {'<< Previous 50'}
          </button>
        )}
        {range < viewData.length && viewData.length > 50 ? (
          <button name='next' className='pointy' onClick={handleNext}>
            {'Next 50 >>'}
          </button>
        ) : (
          <button name='next' className='disabled'>
            {'Next 50 >>'}
          </button>
        )}
        <p>Current Dataset: {viewData.length}</p>
      </div>
    </main>
  );
}

export default Table;
