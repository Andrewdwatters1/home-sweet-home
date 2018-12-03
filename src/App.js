import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';

import './App.css';
import Form from './components/Form';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/welcome" component={Form} />
      </Switch>
    );
  }
}

export default App;
