export interface IClient {
  uid: string;
  username: string;
  name: string;
  lastname: string;
  contacts: string;
  createdAt: number;
}

export const defaultClient = {
  uid: '0',
  contacts: '+375',
  username: '',
  name: '',
  lastname: '',
  orders: [],
  createdAt: Date.now(),
} as IClient;
