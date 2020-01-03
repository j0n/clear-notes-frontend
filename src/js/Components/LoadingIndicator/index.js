import React, { useContext } from 'react';
import styles from './loading.css';
import { store } from 'Store';

export default function LoadingIndicator(props) {
  const { mainState } = useContext(store);
  const { loading = false } = mainState;
  // const { dispatch } = useContext(store);
  return (
    <div className={styles.holder}>
      { loading && <div className={styles.loading}></div> }
    </div>
  );
}


