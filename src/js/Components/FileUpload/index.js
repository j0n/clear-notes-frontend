import React, { useState, useEffect, useContext } from 'react';
import { store } from '../../store.js';
export default function FileUpload() {
  const { mainState, dispatch }= useContext(store);

  console.log(mainState); // this will return { color: red }
  const [state, setState] = useState(0);
  useEffect(() => {
    console.log(state);
  });
  const onUploadedImage = (e) => {
    const imageBlob = e.target.result;

    setState({ imageBlob })
    dispatch({
      type: 'action',
      data: {
        imageBlob
      }
    })
  }

  const onUpdate = (e) => {
    console.log(e.target.files);
    const reader = new FileReader();
    reader.onload = onUploadedImage;
    reader.readAsDataURL(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const options = {
      method: 'POST',
      body: formData,
      // If you add this, upload won't work
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    };

    fetch('http://localhost:7764/image', options);
  }

  return (
    <div>
      { state.imageBlob && <img src={state.imageBlob} /> }
      <input type="file" id="input" onChange={onUpdate} />
    </div>
  );
}

