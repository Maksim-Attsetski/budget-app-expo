import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IClient, defaultClient } from './types';

interface IState {
  clients: IClient[];
  addClientModalvisible: boolean;
}

const initialState: IState = {
  addClientModalvisible: false,
  clients: [],
};

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    setClientsModalVisibleAC: (state: IState) => {
      state.addClientModalvisible = !state.addClientModalvisible;
    },
    setClientsAC: (state: IState, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload;
    },
    addClientAC: (state: IState, action: PayloadAction<IClient>) => {
      state.clients = [action.payload, ...state.clients];
    },
    updateClientAC: (state: IState, action: PayloadAction<IClient>) => {
      state.clients = state.clients.map((el) =>
        el.uid === action.payload.uid ? { ...el, ...action.payload } : el
      );
    },
    deleteClientAC: (state: IState, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((el) => el.uid !== action.payload);
    },
  },
});

export const clientReducer = clientSlice.reducer;
export const clientActions = clientSlice.actions;
