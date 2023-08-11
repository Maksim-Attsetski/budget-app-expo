export interface IOrder {
  uid: string;
  description: string;
  price: number;
  isDone: boolean;
  createdAt: number;
  clientUid: string;
  dealAt: number;
}
