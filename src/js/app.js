import React, { Component, useContext } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { store } from './store.js';
import TextArea from 'Components/TextArea'
import FileUpload from 'Components/FileUpload'
import Link from 'Components/Link'
import Button from 'Components/Button'
import Note from 'Screens/Note'
import Login from 'Screens/Login'
import List from 'Screens/List'
import LoadingIndicator from 'Components/LoadingIndicator';

export default function App() {
  return (
    <div>
      <LoadingIndicator />
      <Router>
        <Switch>
          <Route exact path="/n/:id" component={Note} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={List} />
        </Switch>
      </Router>
    </div>
  );
}
