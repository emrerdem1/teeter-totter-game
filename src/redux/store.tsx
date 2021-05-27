import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

// Add a redux devtools type in window object.
// It also could be handled via package called "redux-devtools-extension".
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), composeEnhancers())
);

export default store;
