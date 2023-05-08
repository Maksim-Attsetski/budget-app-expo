import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBudget } from './types';

interface IState {
  budget: IBudget[];
}

const initialState: IState = {
  budget: [
    { id: 1, type: 'dec', value: 23, date: Date.now() },
    { id: 2, type: 'dec', value: 10, date: Date.now() },
    { id: 3, type: 'dec', value: 15, date: Date.now() },
    { id: 4, type: 'inc', value: 37, date: Date.now() },
  ],
};

const budgetSlice = createSlice({
  name: 'budgetSlice',
  initialState,
  reducers: {
    budgetCreateAC: (state: IState, action: PayloadAction<IBudget>) => {
      state.budget = [action.payload, ...state.budget];
    },
    budgetUpdateAC: (state: IState, action: PayloadAction<IBudget>) => {
      state.budget = state.budget.map((el) => (el.id ? { ...el, action } : el));
    },
    budgetDeleteAC: (state: IState, action: PayloadAction<number>) => {
      state.budget = state.budget.filter((el) => el.id !== action.payload);
    },
  },
});

export const budgetReducer = budgetSlice.reducer;
export const budgetActions = budgetSlice.actions;
