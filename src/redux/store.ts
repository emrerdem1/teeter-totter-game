import { compose, Store } from 'redux';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

// Add a redux devtools type in window object.
// It also could be handled via package called "redux-devtools-extension".
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
