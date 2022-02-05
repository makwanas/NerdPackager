import { useState, useEffect } from 'react';
import IndividualResult from "./IndividualResult";

function SearchResults(props) {
    const createIndexArray = (arrayLength) => {
        var i = 0
        var indexedArray = Array(arrayLength)
        while (i <= arrayLength) {
            indexedArray[i] = i;
            i++;
        }
        return indexedArray
    }

    const referenceIndexArray = createIndexArray(props.results.length - 1);
    const [searchDetails, setSearchDetails] = useState({ title: [], subreddit: [], imageLink: [], score: [], videoProp: [], author: [], created: [], url: [] });

    const getSearchDetails = (searchArray, searchAttribute) => {
        var outputArray = []
        searchArray.forEach((element) => {
            outputArray.push(element.data[searchAttribute])
        });
        return outputArray
    }


    useEffect(() => {
        setSearchDetails({ ...searchDetails, title: getSearchDetails(props.results, "title"), subreddit: getSearchDetails(props.results, "subreddit_name_prefixed"), imageLink: getSearchDetails(props.results, "thumbnail"), score: getSearchDetails(props.results, "score"), videoProp: getSearchDetails(props.results, "is_video"), author: getSearchDetails(props.results, "author"), created: getSearchDetails(props.results, "created_utc"), url: getSearchDetails(props.results, "url") })
    }, [props.results])

    return (
        <div>
            <h1>This is the Search Results page for: {props.query}</h1>
            {searchDetails.title != [] && referenceIndexArray.map(index => <IndividualResult key={index} index={index} individualSearchDetail={searchDetails} />)}
        </div>
    )
}

export default SearchResults
