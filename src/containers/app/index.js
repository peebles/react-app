import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import './App.css';
import logo from './logo.svg';

import AlertModal from '../alert-modal';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

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

    {/*
    This is a global alert modal dialog.
    See reducers/global.js for usage
    */}
    <AlertModal />

    {/*
    This is a toastr -like react component
    See reducers/global.js for example use
    See https://github.com/juliancwirko/react-s-alert
    Global config here, can be over ridden on individual calls.
    */}
    <Alert stack={true} effect="slide" offset={160} />
    
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
    
  </div>
);

export default App;
