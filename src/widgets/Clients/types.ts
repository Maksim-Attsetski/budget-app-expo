export type TOrderStatus = 'success' | 'wait' | 'cancel';

export interface IClientOrder {
  id: string;
  description: string;
  price: number;
  status: TOrderStatus;
  createdAt: number;
  dealAt: number;
}

export interface IClient {
  id: string;
  name: string;
  lastname: string;
  contacts: string;
  orders: IClientOrder[];
}

export const defaultClient = {
  id: '0',
  contacts: '+375',
  name: '',
  lastname: '',
  orders: [],
} as IClient;
