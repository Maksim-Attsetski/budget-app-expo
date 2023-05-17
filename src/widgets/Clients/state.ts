import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IClient, defaultClient } from './types';

interface IState {
  clients: IClient[];
  addClientModalvisible: boolean;
  modalDefaultProps: IClient;
}

const initialState: IState = {
  addClientModalvisible: false,
  modalDefaultProps: defaultClient,
  clients: [],
};

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    setClientsModalVisibleAC: (
      state: IState,
      action: PayloadAction<IClient>
    ) => {
      state.addClientModalvisible = !state.addClientModalvisible;
      state.modalDefaultProps = action.payload;
    },
    setClientsModalPropsAC: (state: IState, action: PayloadAction<IClient>) => {
      state.modalDefaultProps = action.payload;
    },
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
