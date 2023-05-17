import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { budgetReducer } from './widgets/Budget';
import { clientReducer } from './widgets/Clients';
import { appReducer } from './widgets/App';

const reducer = combineReducers({
  app: appReducer,
  budget: budgetReducer,
  clients: clientReducer,
});

export const reduxStore = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
