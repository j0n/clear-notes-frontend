import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import styles from './link.css';
import { store } from '../../store.js';

export default function Links (props) {
  const [state, setState] = useState(0);
  const { dispatch, mainState } = useContext(store);

  const { name, type, ...rest } = props;
  const value = mainState[name] || "";

  const onUpdate = (e) => {
    const { value } = e.target;
    dispatch({ type: 'UPDATE_VALUE', name, value })
  }
  var classes = classNames({
    [styles.wrapper]: true,
    [styles.header]: type === 'header',
    [props.className]: true,
  });
  return (
    <div className={classes}>
      <input onChange={onUpdate} type="text" value={value} {...rest} />
    </div>
  );
}

