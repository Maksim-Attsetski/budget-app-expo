export type TBudgetType = 'inc' | 'dec';

export interface IBudget {
  uid: string;
  type: TBudgetType;
  value: number;
  description?: string;
  date: number;
}
