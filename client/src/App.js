import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Configuration from './components/Configuration';
import Elements from './components/Elements';
import Grading from './components/Grading';
import Overall from './components/Overall';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          <Home />
        )}/>
        <Route path="/configuration" render={() => (
          <Configuration />
        )}/>
        <Route path="/elements" render={() => (
          <Elements />
        )}/>
        <Route path="/grading" render={() => (
          <Grading />
        )}/>
        <Route path="/overall" render={() => (
          <Overall />
        )}/>
      </Switch>
    );
  }
}

export default App;