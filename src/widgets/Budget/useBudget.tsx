import { useActions, useTypedSelector } from '../../shared';
import { IBudget } from './types';

export const useBudget = () => {
  const { budget: data } = useTypedSelector((state) => state.budget);
  const { action } = useActions();

  const onCreate = (newBudget: IBudget) => {
    action.budgetCreateAC({
      ...newBudget,
      id: data.length + 1,
      date: Date.now(),
    });
  };
  const onUpdate = (newBudget: IBudget) => {
    action.budgetUpdateAC(newBudget);
  };
  const onDelete = (id: number) => {
    action.budgetDeleteAC(id);
  };

  const budget = data
    .filter((el) => el.comletedAt)
    .sort((a, b) => b.date - a.date);

  const waitList = data.filter((el) => !el.comletedAt);

  return { budget, waitList, onCreate, onUpdate, onDelete };
};
