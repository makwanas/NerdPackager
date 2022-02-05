/** @jsxImportSource @emotion/react */

import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResults from '../SearchResults.js';
import Condition from '../Condition';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export const searchStyles = css`
margin-left: 20px;
    button{
        border-radius:12px;
        font-size: 16px;
        cursor: pointer;
    }
    form{
        margin-top:10px;
        border: 3px solid black;
        width: 500px;
        label{
            font-size: 18px;
            margin-left:10px;
        }
        input{
            margin-top:5px;
            font-size: 16px;
        }
        button{
            font-size:20px;
            background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
            border: 2px solid black;
            cursor: pointer;
            margin-left:415px;
            border-radius: 8px;
        }
    }
`;

function SearchKeyword({ query }) {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filterOption, setFilterOption] = useState('relevance');
  const [limitOption, setLimitOption] = useState('25');
  const [redditData, setRedditData] = useState({});
  const history = useHistory();

  useEffect(() => {
      console.log("Entering use effect");
      let ignore = false;
      const controller = new AbortController();
      async function fetchSearchResults() {
          let responseBody = {}
          setIsLoading(true);
          try {
              console.log("Entering try block");
              let res = await fetch(`http://www.reddit.com/search.json?q=${query}&sort=${filterOption}&limit=${limitOption}`);
              responseBody = await res.json();
          }
          catch (e) {
              if (e instanceof DOMException) {
                  console.log("HTTP request aborted");
              } else {
                  setIsError(true);
                  console.log("Error message", e);
              }
          }
          if (!ignore) {
              setRedditData(responseBody);
              setIsLoading(false);
          }
      }
      if (query) {
          fetchSearchResults();
      }
      return () => {
          controller.abort();
          ignore = true;
      }
  }, [query, filterOption, limitOption])

  return (
      <div css={searchStyles}>
          <h2>Search Keyword page</h2>
          <Link exact to="/redditSimplified"><button>Back to RedditSimplified</button></Link>
          <form onSubmit={(e) => {
              e.preventDefault();
              history.push(`?q=${inputQuery}`);
          }}>
              <label>Keyword search: </label>
              <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
              <Condition type="keyword" filterOption={filterOption} onFilterChange={setFilterOption} limitOption={limitOption} onLimitChange={setLimitOption} />
              <button type="submit">Submit</button>
          </form>
          {JSON.stringify(redditData) != "{}" && <SearchResults query={query} results={redditData.data.children} />}
      </div>
  )
}

export default SearchKeyword
