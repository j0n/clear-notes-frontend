const { API_URL } = process.env;
let timeoutId = -1;
let saveTimeoutId = -1;
const applyMiddleware = store => next => async action => {
  const { dispatch, getState } = store;
  const { token = false } = getState();
  const { type, name = '', value = '', id } = action;
  if (type === 'UPDATE_VALUE') {
    if (name === 'content') {
      clearTimeout(saveTimeoutId);
      saveTimeoutId = setTimeout(async () => {
        dispatch({ type: 'PENDING' })
        const options = {
          method: 'POST',
          body: JSON.stringify({ id, content: value }),
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        };
        try {
          const response = await fetch(`${API_URL}note/${id}`, options);
          dispatch({ type: 'PENDING_DONE' })
        } catch (err) {
          dispatch({ type: 'PENDING_DONE' })
          console.log(err);
        }
      }, 1000);
    }
    if (name === 'id') {
      clearTimeout(timeoutId);
      setTimeout(async () => {
        dispatch({ type: 'PENDING' })
        const response = await fetch(`${API_URL}note/${value}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        dispatch({ type: 'PENDING_DONE' })
        if (response.status === 401) {
          dispatch({
            type: 'LOGOUT',
          })
        } else {
          const data = await response.json();
          const { content } = data;
          dispatch({
            type: 'LOADED_CONTENT',
            id: value,
            content
          })
        }
      }, 100);
    }
  }
  if (type === 'LOGIN') {
    const { token } = action;
    localStorage.setItem('note-token', token);
  }
  if (type === 'LOGOUT') {
    localStorage.removeItem('note-token');
  }
  const nextState = next(action);
  return nextState;
}

export default applyMiddleware;
