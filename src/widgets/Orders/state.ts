import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrder } from './types';

interface IState {
  orders: IOrder[];
  count: number;
}

const initialState: IState = {
  count: 0,
  orders: [],
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrdersAC: (
      state: IState,
      action: PayloadAction<{ result: IOrder[]; count: number }>
    ) => {
      state.orders = action.payload.result;
      state.count = action.payload.count;
    },
    addOrderAC: (state: IState, action: PayloadAction<IOrder>) => {
      state.orders = [action.payload, ...state.orders];
    },
    updateOrderAC: (state: IState, action: PayloadAction<IOrder>) => {
      state.orders = state.orders.map((el) =>
        el.uid === action.payload.uid ? { ...el, ...action.payload } : el
      );
    },
    deleteOrderAC: (state: IState, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((el) => el.uid !== action.payload);
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
