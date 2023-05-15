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
  clients: [
    {
      id: '1',
      contacts: '+375336644491',
      name: 'Maks',
      lastname: 'Attsetski',
      orders: [
        {
          id: '1',
          createdAt: Date.now() - 360000,
          dealAt: Date.now() + 360000,
          price: 23,
          status: 'wait',
          description: '3 коробки зефира',
        },
      ],
    },
    {
      id: '2',
      contacts: '+375336644491',
      name: 'Даша',
      lastname: 'Отцецкая',
      orders: [
        {
          id: '1',
          description: '2 коробки зефира',
          price: 40,
          status: 'success',
          dealAt: Date.now() + 60000,
          createdAt: Date.now() - 60000,
        },
      ],
    },
  ],
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
