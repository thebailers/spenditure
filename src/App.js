import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

// utilities
import setAuthToken from './utilities/setAuthToken';

// reducers
import rootReducer from './store/rootReducer';

// actions
import { setCurrentUser } from './components/Auth/action_creators';

// components
import Root from './components/Root';

// styles
import './App.css';

const INITIAL_STATE = {};

// redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeEnhancers(applyMiddleware(thunk)),
);

if (localStorage.getItem('mm-jwtToken')) {
  setAuthToken(localStorage.getItem('mm-jwtToken'))
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('mm-jwtToken'))))
}

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
