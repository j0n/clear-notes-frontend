import React, { useState, useEffect, useContext } from 'react';
import styles from './textarea.css';
import { store } from '../../store.js';

export default function Textarea(props) {
  const { dispatch, mainState } = useContext(store);
  const { name } = props;
  const value = mainState[name] || "";
  const { id } = mainState;
  const onUpdate = (e) => {
    const { value } = e.target;
    dispatch({ type: 'UPDATE_VALUE', name, value, id })
  }

  return (
    <div>
      <textarea className={styles.textarea} onChange={onUpdate} value={value}></textarea>
    </div>
  );
}

