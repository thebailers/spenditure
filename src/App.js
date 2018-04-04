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

// redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
