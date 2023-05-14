export type TClientStatus = 'success' | 'wait' | 'cancel';

export interface IClient {
  id: string;
  name: string;
  lastname: string;
  description: string;
  status: TClientStatus;
  contacts: string;
}
