import React, { useContext, useState } from 'react';
import Link from 'Components/Link'

import { store } from '../../store.js';

const { API_URL } = process.env;

export default function Login (props) {
  const [state, setState] = useState({email: '', password: ''})
  const { dispatch } = useContext(store);
  const onEmailChange = e => {
    const { value } = e.target;
    setState({ email: value, password: state.password });
  }
  const onPasswordChange = e => {
    const { value } = e.target;
    setState({ password: value, email: state.email });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const options = {
      body: JSON.stringify({ email, password }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
    try {
      const response = await fetch(`${API_URL}auth/login`, options);
      if (response.status === 401) {
        alert('Wrong credentials');
        return;
      }
      const { token } = await response.json();
      dispatch({
        type: 'LOGIN',
        token
      })
      props.history.push("/");
    } catch (err) {
      alert('Error');
    }
    return false;
  }
  const { email = '', password = '' } = state;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={email} type="email" onChange={onEmailChange} />
        <input value={password} type="password" onChange={onPasswordChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

