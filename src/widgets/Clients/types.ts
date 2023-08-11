export interface IClient {
  uid: string;
  name: string;
  lastname: string;
  contacts: string;
}

export const defaultClient = {
  uid: '0',
  contacts: '+375',
  name: '',
  lastname: '',
  orders: [],
} as IClient;
