import {
  storage,
  storageKeys,
  useActions,
  useTypedSelector,
} from '../../shared';
import { IBudget } from './types';

export const useBudget = () => {
  const { budget: data } = useTypedSelector((state) => state.budget);
  const { action } = useActions();

  const budget = [...data].sort((a, b) => b.date - a.date);

  const setBudget = async () => {
    const currentBudget = await storage.get(storageKeys.budget);
    currentBudget && action.setBudgetAC(currentBudget);
  };

  const onCreate = async (info: IBudget) => {
    const newBudget = {
      ...info,
      id: data.length + 1,
      date: Date.now(),
    } as IBudget;

    const currentBudget = [newBudget, ...budget];
    action.setBudgetAC(currentBudget);
    await storage.set(storageKeys.budget, currentBudget);
  };

  const onUpdate = async (newBudget: IBudget) => {
    const currentBudget = [...budget].map((el) =>
      newBudget.id ? { ...el, newBudget } : el
    );

    action.setBudgetAC(currentBudget);
    await storage.set(storageKeys.budget, currentBudget);
  };
  const onDelete = async (id: number) => {
    const currentBudget = budget.filter((el) => id !== el.id);

    action.setBudgetAC(currentBudget);
    await storage.set(storageKeys.budget, currentBudget);
  };

  return { budget, setBudget, onCreate, onUpdate, onDelete };
};
