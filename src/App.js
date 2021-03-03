import './App.css';
import Search from './components/Search.js';
import About from './components/About.js';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';


function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  console.log("Checking in APP.js", useQueryString().q)
  return (
    <div className="App">
      <h1>Hmm...I wonder what the forecast is?</h1>
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
