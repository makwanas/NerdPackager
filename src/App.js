/** @jsxImportSource @emotion/react */

/*

*/

//Importing dependencies
import './App.css';
import Search from './components/Search.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { css } from '@emotion/react';

//Using custom React hooks for string parsing in URL
function useQueryString() {
  return queryString.parse(useLocation().search);
}

//Rendering App DOM and definining routes for navigation
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
