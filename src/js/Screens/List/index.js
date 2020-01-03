import React, { useEffect, useContext, useState } from 'react';
import { get } from 'Actions';
import { store } from 'Store';
import styles from './list.css';

export default function List (props) {
  const [files, setFiles] = useState([]);
  const { dispatch } = useContext(store);
  useEffect(() => {
    async function fetchData() {
      const _files = await get();
      if (_files === false) {
        props.history.push(`/login`);
        return
      }
      setFiles(_files);
    }
    fetchData();
  }, []);

  const onClick = (e, name) => {
    e.preventDefault();
    props.history.push(`/n/${name}`);
  }

  let fileName = '';
  const onChange = (e) => {
    fileName = e.target.value
  }
  const onCreateFile = (e) => {
    e.preventDefault();
    props.history.push(`/n/${fileName}`);
  }

  const renderFileHTML = file => {
    const { name } = file;
    return <a key={name} href={`/n/${name}`}>{name}</a>
  }
  return (
    <div>
      <form onSubmit={onCreateFile} className={styles.create}>
        <input placeholder="Name on new note" type="text" autoCapitalize="none" autoCorrect="off" onChange={onChange} />
        <button>Create</button>
      </form>
      <div className={styles.files}>
        { files.map(file => renderFileHTML(file)) }
      </div>
    </div>
  );
}

