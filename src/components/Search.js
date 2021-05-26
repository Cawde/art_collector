import React, { useEffect, useState } from 'react';
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  const { setIsLoading, setSearchResults } = props;
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');

  useEffect(() => {
  
      Promise.all([fetchAllCenturies(), fetchAllClassifications()])
        .then(([centuries, classifications]) => {
          setCenturyList(centuries);
          setClassificationList(classifications);
        })
        .catch((error) => {
          console.error(error)
        });
  }, []);

  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      fetchQueryResults({ century, classification, queryString })
        .then((results) => {
          setSearchResults(results);
        })
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords"
        type="text"
        placeholder="enter keywords..."
        value={queryString}
        onChange={(event) => { setQueryString(event.target.value) }}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(event) => { setClassification(event.target.value) }}>
        <option value="any">Any</option>
          classificationList.map((classification, index) => {
            return <option key={index}>{classification.name}</option>
          })
        }
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(event) => { setCentury(event.target.value) }}>
        <option value="any">Any</option>
          centuryList.map((century, index) => {
            return <option key={index}>{century.name}</option>
          })
        }
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;
