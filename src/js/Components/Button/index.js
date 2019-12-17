import React from 'react';
import styles from './button.css';
import { store } from '../../store.js';

export default function Textarea(props) {
  const { children = null, onClick = () => {} } = props;
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        { children }
      </button>
    </div>
  );
}

