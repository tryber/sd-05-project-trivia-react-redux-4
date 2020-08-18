import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './trivia.png';
import './App.css';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </header>
      </section>
    </BrowserRouter>
  );
}
