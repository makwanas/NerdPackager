/** @jsxImportSource @emotion/react */

import Condition from '../Condition';
import { useState } from 'react';
import IndividualMood from './IndividualMood';
import MoodResults from './MoodResults';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { searchStyles } from '../Keyword/SearchKeyword';

const ConditionMoodStyles = css`
    border: 1px solid white;
    border-radius: 5px;
    margin-top:10px;
    margin-left:10px;
    width: 500px;
    padding-bottom:10px;
`;

const MoodStyles = css`
    display: flex;
    margin-top:10px;
    margin-left:10px;
    flex-wrap: wrap;
`;

function SearchMood() {
    const [filterOption, setFilterOption] = useState('hot');
    const [limitOption, setLimitOption] = useState('25');
    const [displayMood, setDisplayMood] = useState(true);
    const [displayMoodResults, setDisplayMoodResults] = useState('');

    const handleDisplayCards = () => {
        setDisplayMood(displayMood => !displayMood);
    }

    const handleDisplayMood = (e) => {
        setDisplayMoodResults(e);
    }

    var moodData = require('./mood.json');
    console.log("Value of display mood:", displayMood, displayMoodResults);

    return (
        <div css ={searchStyles}>
            <h2> Search mood page</h2>
            <Link exact to="/redditSimplified"><button>Back to RedditSimplified</button></Link>
            <div css={ConditionMoodStyles}>
                <Condition type="mood" filterOption={filterOption} onFilterChange={setFilterOption} limitOption={limitOption} onLimitChange={setLimitOption} />
            </div>

            {displayMood ? <div css={MoodStyles}>
                {Object.keys(moodData).map(index =>
                    <IndividualMood key={index}
                        onDisplayMood={handleDisplayMood}
                        onCardClick={handleDisplayCards}
                        filterOption={filterOption}
                        limitOption={limitOption}
                        title={moodData[index].title}
                        description={moodData[index].description}
                        image={moodData[index].image}
                        url={moodData[index].subreddit_url} />)}</div>
                :
                <>
                    <Link to="/redditSimplified/mood">
                        <button onClick={handleDisplayCards} css ={{
                            marginTop:'10px'
                        }}>
                            Back to mood page
                        </button>
                    </Link>
                    {displayMoodResults != '' && <MoodResults displayMoodResults={displayMoodResults} filterOption={filterOption} limitOption={limitOption} />}
                </>}
        </div>
    )
}

export default SearchMood
