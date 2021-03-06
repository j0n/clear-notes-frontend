import React, {createContext, useReducer} from 'react';
import Load from './Middlewares/Load';
const initialState = {
  id: 'yo',
  token: localStorage.getItem('note-token') || false,
  content: '',
  loading: false,
};
const store = createContext(initialState);
const { Provider } = store;
const compose = (...fns) => {
  return fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );
}

const StateProvider = ( { children } ) => {
  const [mainState, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'PENDING':
        return {
          ...state,
          loading: true
        }
      case 'PENDING_DONE':
        return {
          ...state,
          loading: false
        }
      case 'LOGOUT':
        return {
          ...state,
          token: false
        }
      case 'LOGIN':
        const { token } = action;
        return {
          ...state,
          token
        }
      case 'UPDATE_VALUE':
        const { type, name, value } = action;
        const { links = {} } = state;
        return {
          ...state,
          [name]: value
        }
      case 'LOADED_CONTENT':
        const { id, content } = action;
        const { id: currentId } = state;
        if (id !== currentId) {
          return state;
        }
        return {
          ...state,
          content
        }
      default:
        throw new Error();
    };
  }, initialState);
  const middlewares = [Load];
  const middlewareAPI = {
    getState: () => mainState,
    dispatch: action => dispatch(action)
  }
  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  const enhancedDispatch = compose(...chain)(dispatch)

  return <Provider value={{ mainState, dispatch: enhancedDispatch }}>{children}</Provider>;
};

export { store, StateProvider }
