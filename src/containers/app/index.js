import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import './App.css';
import logo from './logo.svg';

import AlertModal from '../alert-modal';

const App = () => (
  <div className="App">

    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>

    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <AlertModal />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
    
  </div>
);

export default App;
