import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBudget } from './types';

interface IState {
  budget: IBudget[];
}

const initialState: IState = {
  budget: [],
};

const budgetSlice = createSlice({
  name: 'budgetSlice',
  initialState,
  reducers: {
    setBudgetAC: (state: IState, action: PayloadAction<IBudget[]>) => {
      state.budget = [...action.payload];
    },
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
