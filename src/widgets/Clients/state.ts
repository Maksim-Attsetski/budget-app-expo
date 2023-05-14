import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IClient } from './types';

interface IState {
  clients: IClient[];
}

const initialState: IState = {
  clients: [],
};

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    setClientsAC: (state: IState, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload;
    },
    addClientAC: (state: IState, action: PayloadAction<IClient>) => {
      state.clients = [action.payload, ...state.clients];
    },
    updateClientAC: (state: IState, action: PayloadAction<IClient>) => {
      state.clients = state.clients.map((el) =>
        el.id === action.payload.id ? { ...el, ...action.payload } : el
      );
    },
    deleteClientAC: (state: IState, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((el) => el.id !== action.payload);
    },
  },
});

export const clientReducer = clientSlice.reducer;
export const clientActions = clientSlice.actions;
