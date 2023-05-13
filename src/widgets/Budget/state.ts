import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBudget } from './types';

interface IState {
  budget: IBudget[];
}

const initialState: IState = {
  budget: [
    { id: 1, type: 'dec', value: 23, date: 1683537543818, comletedAt: null },
    {
      id: 2,
      type: 'dec',
      value: 10,
      date: 1683542043818,
      comletedAt: 1683542043818,
    },
    {
      id: 3,
      type: 'inc',
      value: 15,
      date: 1683547556818,
      comletedAt: 1683547556818,
    },
    { id: 4, type: 'inc', value: 30, date: 1683547943818, comletedAt: null },
    { id: 4, type: 'inc', value: 8, date: 1683536943818, comletedAt: null },
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
