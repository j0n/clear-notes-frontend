import React, { Component, useContext } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { store } from './store.js';
import TextArea from 'Components/TextArea'
import FileUpload from 'Components/FileUpload'
import Link from 'Components/Link'
import Button from 'Components/Button'
import Note from 'Screens/Note'

const { API_URL } = process.env;

export default function App() {
  const { mainState } = useContext(store);
  const { id =  'none.txt', content = '' } = mainState;
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Note />
          </Route>
          <Route exact path="/list">
            <h1>List</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
