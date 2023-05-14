import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { budgetReducer } from '../Budget';
import { clientReducer } from '../Clients';

const reducer = combineReducers({
  budget: budgetReducer,
  clients: clientReducer,
});

export const reduxStore = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
