import React, {useEffect, useState} from 'react';
import './Table.css';

function Table() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=10',
      );
      const returnData = res.json();
      return setData(returnData);
    }
    fetchData();
  }, []);

  return <ul>{console.log(data)}</ul>;
}

export default Table;
