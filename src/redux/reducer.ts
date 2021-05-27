import { combineReducers } from '@reduxjs/toolkit';
import * as actionTypes from './actionTypes';

const initialState = {
  articles: [
    {
      id: 1,
      title: 'post 1',
      body: 'Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi',
    },
    {
      id: 2,
      title: 'post 2',
      body: 'Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint',
    },
  ],
};

const rootReducer = combineReducers({});

export default rootReducer;
