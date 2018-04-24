import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import rootReducer from './store/rootReducer';

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

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
