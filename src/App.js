/** @jsxImportSource @emotion/react */

/*

*/

//Importing dependencies
import './App.css';
import Search from './components/Search.js';
import About from './components/About.js';
import RedditHome from './components/RedditSimplified/RedditHome';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { css } from '@emotion/react';
import SearchKeyword from './components/RedditSimplified/Keyword/SearchKeyword';
import SearchMood from './components/RedditSimplified/Mood/SearchMood';
import SearchSubreddit from './components/RedditSimplified/Subreddit/SearchSubreddit';
import GitViewHome from './components/GitView/GitViewHome';


//Using custom React hooks for string parsing in URL
export function useQueryString() {
  return queryString.parse(useLocation().search);
}

const AppStyles = css`
height: 100vh;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
`;

const ContentStyles = css`
flex: 1;
background-image: url("./images/textured-background.jpg");
`;

//Rendering App DOM and definining routes for navigation
function App() {
  return (
    <div className="App" css={AppStyles}>
      <Navbar />
      <div css = {ContentStyles}>
        <Switch>
          <Route path="/weatherInfo">
            <Search query={useQueryString().q} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/redditSimplified">
            <RedditHome />
          </Route>
          <Route path="/redditSimplified/keyword">
            <SearchKeyword query = {useQueryString().q}/>
          </Route>
          <Route path="/redditSimplified/subreddit">
            <SearchSubreddit query = {useQueryString().q}/>
          </Route>
          <Route path="/redditSimplified/mood">
            <SearchMood />
          </Route>
          <Route path="/gitView">
            <GitViewHome />
          </Route>
          <Route exact path="/">
            <Redirect to="/redditSimplified" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
