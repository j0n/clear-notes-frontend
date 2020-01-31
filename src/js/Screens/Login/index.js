import React, { useContext, useState } from 'react';
import Link from 'Components/Link'

import { store } from '../../store.js';
import styles from './login.css';
import Button from 'Components/Button';

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
      dispatch({ type: 'LOGIN', token })
      props.history.push("/");
    } catch (err) {
      alert('Error');
    }
    return false;
  }
  const { email = '', password = '' } = state;
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Clear notes</h1>
        <form onSubmit={onSubmit}>
          <input
            className={styles.input}
            value={email}
            type="Email"
            placeholder="email"
            onChange={onEmailChange}
          />
          <input
            className={styles.input}
            value={password}
            type="password"
            placeholder="Password"
            onChange={onPasswordChange}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

