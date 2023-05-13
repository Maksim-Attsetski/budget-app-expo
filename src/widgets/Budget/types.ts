export type TBudgetType = 'inc' | 'dec';

export interface IBudget {
  id: number;
  type: TBudgetType;
  value: number;
  description?: string;
  comletedAt: number | null;
  date: number;
}
