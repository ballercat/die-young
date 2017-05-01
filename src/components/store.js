import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  reduxCompose(
    applyMiddleware(thunk)
  )
);

export default store;

