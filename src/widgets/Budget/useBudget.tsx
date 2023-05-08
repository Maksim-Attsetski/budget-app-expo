import { useActions, useTypedSelector } from '../../shared';
import { IBudget } from './types';

export const useBudget = () => {
  const { budget } = useTypedSelector((state) => state.budget);
  const { action } = useActions();

  const onCreate = (newBudget: IBudget) => {
    action.budgetCreateAC(newBudget);
  };
  const onUpdate = (newBudget: IBudget) => {
    action.budgetUpdateAC(newBudget);
  };
  const onDelete = (id: number) => {
    action.budgetDeleteAC(id);
  };

  return { budget, onCreate, onUpdate, onDelete };
};
