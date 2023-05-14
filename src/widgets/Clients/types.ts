export type TClientStatus = 'success' | 'wait' | 'cancel';

export interface IClient {
  id: string;
  name: string;
  lastname: string;
  description: string;
  price: number;
  status: TClientStatus;
  contacts: string;
}
