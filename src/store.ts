import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { budgetReducer } from './widgets/Budget';
import { clientReducer } from './widgets/Clients';
import { appReducer } from './widgets/App';
import { orderReducer } from './widgets/Orders';
import { recipeReducer } from './widgets/Recipes/state';

const reducer = combineReducers({
  app: appReducer,
  budget: budgetReducer,
  clients: clientReducer,
  orders: orderReducer,
  recipes: recipeReducer,
});

export const reduxStore = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
