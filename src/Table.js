import React, {useEffect, useState} from 'react';
import Entry from './Entry.js';
import './Table.css';

function Table() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=10',
      );
      return res.json();
    }
    fetchData().then(returnData => setData(returnData));
  }, []);

  return (
    <div>
      {!!data ? (
        data.map(entry => <Entry entry={entry} key={entry.id} />)
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
}

export default Table;
