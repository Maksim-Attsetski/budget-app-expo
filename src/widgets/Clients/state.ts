import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IClient } from './types';

interface IState {
  clients: IClient[];
}

const initialState: IState = {
  clients: [
    {
      id: '1',
      contacts: '+375336644491',
      description: '1 букет (розовый) за 55р',
      name: 'Maks',
      lastname: 'Attsetski',
      status: 'success',
    },
    {
      id: '2',
      contacts: '+375336644491',
      description: '3 коробки зефира за 8р',
      name: 'Maks',
      lastname: 'Attsetski',
      status: 'wait',
    },
  ],
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
