import React, { useContext, useEffect } from 'react';
import TextArea from 'Components/TextArea'
import Link from 'Components/Link'
import { store } from 'Store';
import styles from './note.css';

export default function Note (props) {
  const { dispatch } = useContext(store);
  useEffect(() => {
    const { id = false } = props.match.params;
    if (id) {
      dispatch({
        type: 'UPDATE_VALUE',
        name: 'id',
        value: props.match.params.id
      });
    }
  }, []);
  return (
    <div className={styles.note}>
      <a className={styles.backButton} href="/">&#9664;</a>
      <Link
        type="header"
        name="id"
        className={styles.top}
        autoCorrect="off"
        autoCapitalize="none"
      />
      <TextArea name="content" />
    </div>
  );
}

