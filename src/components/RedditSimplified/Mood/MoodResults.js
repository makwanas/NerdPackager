import { useSearchSubreddit } from '../Subreddit/SearchSubreddit';
import SearchResults from '../SearchResults';


function MoodResults(props) {
    const [redditData, checkLoading, checkError] = useSearchSubreddit(props.displayMoodResults, props.filterOption, props.limitOption);
    console.log("Inside mood results:", redditData);
    return (
        <div>
            {JSON.stringify(redditData) != "{}" && <SearchResults query={props.displayMoodResults} results={redditData.data.children} />}
        </div>
    )
}

export default MoodResults
