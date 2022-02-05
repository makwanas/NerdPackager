/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import {useQueryString} from '../../App' 
import SearchKeyword from './Keyword/SearchKeyword';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)',
        '&:hover': {
            background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'
        },
        border: 0,
        borderRadius: 10,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 550,
        width: 400,
        margin: 20,

    },
    label: {
        display: 'flex',
        flexDirection: 'column',
    }
});

const homeStyles = css`
margin-top:120px;
margin-left:200px;
img{
    margin-top:40px;
    width:300px;
    height:300px;
}
h3{
    font-size:20px
}
p{
    font-size:14px;
    font-style:italic;
}
a{
    text-decoration: none
}
`;

function RedditHome() {
    const classes = useStyles();
    // let {path, url} = useRouteMatch();
    // console.log("Path is:", path);
    // console.log("Url is:", url);
    
    return (
        <div css={homeStyles}>
            <Link to="redditSimplified/keyword">
                <Button classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}>
                    <img src="data:image/png;base64,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" />
                    <h3>Search by keyword</h3>
                    <p>Just want some information regarding something on the front page of internet?</p>
                </Button>
            </Link>
            <Link to="redditSimplified/subreddit">
                <Button classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}>
                    <img src="https://assets.entrepreneur.com/content/3x2/2000/20180301190808-reddit-logo.jpeg" />
                    <h3>Search by subreddit</h3>
                    <p>Got any favourite, specific subreddit you would like to visit?</p>
                </Button>
            </Link>
            <Link to="redditSimplified/mood">
                <Button classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}>
                    <img src="https://previews.123rf.com/images/seamartini/seamartini1401/seamartini140100271/25398759-different-smiles-expressions-and-moods-for-emoticons-design.jpg" />
                    <h3>Search by mood</h3>
                    <p>Click the button below if you do not know anything except how you want to be felt afterwards....</p>
                </Button>
            </Link>
        </div >
    )
}

export default RedditHome