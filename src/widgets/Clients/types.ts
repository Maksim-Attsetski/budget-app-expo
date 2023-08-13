export interface IClient {
  uid: string;
  name: string;
  lastname: string;
  contacts: string;
  createdAt: number;
}

export const defaultClient = {
  uid: '0',
  contacts: '+375',
  name: '',
  lastname: '',
  orders: [],
  createdAt: Date.now(),
} as IClient;
