import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { budgetReducer } from '../Budget';

const reducer = combineReducers({
  budget: budgetReducer,
});

export const reduxStore = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
