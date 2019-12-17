import React, { Component, useContext } from 'react';
import { render } from 'react-dom';
import { store } from './store.js';
import TextArea from 'Components/TextArea'
import FileUpload from 'Components/FileUpload'
import Link from 'Components/Link'
import Button from 'Components/Button'

const { API_URL } = process.env;

export default function App() {
  const { mainState } = useContext(store);
  const { id =  'none.txt', content = '' } = mainState;
  return (
      <div>
        <Link type="header" name="id" autoCorrect="off" autoCapitalize="none" />
        <TextArea name="content" />
      </div>
  );
}
