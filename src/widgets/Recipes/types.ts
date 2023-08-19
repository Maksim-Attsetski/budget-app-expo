export interface IRecipe {
  uid: string;
  name: string;
  description: string;
  cost_price: number;
  weight: number;
  time: number;
  createdAt: number;
}

export interface ITrashItem {
  recipe: IRecipe;
  count: number;
}
