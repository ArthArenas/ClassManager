import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

import Home from './components/Home';
import Configuration from './components/Configuration';
import Elements from './components/Elements';
import Grading from './components/Grading';
import Overall from './components/Overall';
import ExamGrading from './components/ExamGrading';

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faCheck, faTimes, faExclamation);

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
        <Route path="/examGrading" render={() => (
          <ExamGrading />
        )}/>
      </Switch>
    );
  }
}

export default App;