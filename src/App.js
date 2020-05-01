import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChatComponent from './components/chant/ChantComponent';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
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
            <ChatComponent />
          </Route>
          <Route path="/about">
            <ChatComponent />
          </Route>
          <Route path="/dashboard">
            <ChatComponent />
          </Route>
        </Switch>
      </div>
    </Router>

      </header>
    </div>
  );
}