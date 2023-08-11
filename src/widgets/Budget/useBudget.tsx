import { useActions, useTypedSelector } from '../../shared';
import { useFirestore } from '../../shared';
import { IBudget } from './types';

export const useBudget = () => {
  const { budget: data } = useTypedSelector((state) => state.budget);
  const { action } = useActions();
  const fbBudget = useFirestore('zefirka-budget');

  const budget = [...data].sort((a, b) => b.date - a.date);

  const setBudget = async (): Promise<void> => {
    const currentBudget = await fbBudget.getAll([], 10);
    currentBudget && action.setBudgetAC(currentBudget.result);
  };

  const onCreate = async (info: IBudget): Promise<void> => {
    const newBudget = {
      ...info,
      date: Date.now(),
    } as IBudget;

    const uid = await fbBudget.addWithId(newBudget);
    action.budgetCreateAC({ ...newBudget, uid });
  };

  const onUpdate = async (newBudget: IBudget): Promise<void> => {
    await fbBudget.update(newBudget?.uid, newBudget);
    action.budgetUpdateAC(newBudget);
  };

  const onDelete = async (id: string): Promise<void> => {
    await fbBudget.remove(id);
    action.budgetDeleteAC(id);
  };

  return { budget, setBudget, onCreate, onUpdate, onDelete };
};
