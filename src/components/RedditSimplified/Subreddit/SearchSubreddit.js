/** @jsxImportSource @emotion/react */

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchResults from '../SearchResults';
import Condition from '../Condition';
import { css } from '@emotion/react';
import { searchStyles } from '../Keyword/SearchKeyword';

export const useSearchSubreddit = (query, filterOption, limitOption) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [redditData, setRedditData] = useState({});
    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        async function fetchSearchResults() {
            let responseBody = {}
            setIsLoading(true);
            try {
                let res = await fetch(`http://www.reddit.com/r/${query}/${filterOption}.json?limit=${limitOption}`)
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
    return [redditData, isLoading, isError]
}

function SearchSubreddit({ query }) {
    const [inputQuery, setInputQuery] = useState('');
    const [filterOption, setFilterOption] = useState('hot');
    const [limitOption, setLimitOption] = useState('25');
    const history = useHistory();
    const [redditData, checkLoading, checkError] = useSearchSubreddit(query, filterOption, limitOption);

    return (

        <div css={searchStyles}>
            <h2>Search Subreddit page</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                history.push(`?q=${inputQuery}`);
            }}>
                <label>Keyword search:</label>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <Condition type="subreddit" filterOption={filterOption} onFilterChange={setFilterOption} limitOption={limitOption} onLimitChange={setLimitOption} />
                <button type="submit">Submit</button>
            </form>
            { JSON.stringify(redditData) != "{}" && <SearchResults query={query} results={redditData.data.children} />}

        </div>
    )
}

export default SearchSubreddit
