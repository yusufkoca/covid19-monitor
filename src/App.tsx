import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Covid19Page from "./pages/Covid19Page";
import CountryDashboard from "./components/Covid19/CountryDashboard";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page1">Page 1</Link>
          </li>
          <li>
            <Link to="/covid19">Covid 19</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <div>
              <h2>Home</h2>
            </div>
          </Route>
          <Route path="/page1">
            <div>
              <h2>Page 1</h2>
            </div>
          </Route>

          <Route path="/covid19/:countryName">
            <CountryDashboard></CountryDashboard>
          </Route>
          <Route path="/covid19">
            <Covid19Page></Covid19Page>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
