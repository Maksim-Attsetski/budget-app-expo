import { useState } from 'react';
import { QueryFilterConstraint } from 'firebase/firestore';

import { useActions, useTypedSelector } from '../../shared';
import { useFirestore } from '../../shared';
import { IBudget } from './types';

export const useBudget = () => {
  const { budget: data } = useTypedSelector((state) => state.budget);
  const { action } = useActions();
  const fbBudget = useFirestore('zefirka-budget');
  const [loading, setLoading] = useState<boolean>(false);

  const budget = [...data].sort((a, b) => b.createdAt - a.createdAt);

  const setBudget = async (
    whereArr: QueryFilterConstraint[] = [],
    limitVal: number = 10
  ): Promise<void> => {
    try {
      setLoading(true);
      const currentBudget = await fbBudget.getAll(whereArr, limitVal);
      currentBudget && action.setBudgetAC(currentBudget.result);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async (info: IBudget): Promise<void> => {
    try {
      setLoading(true);
      const newBudget = {
        ...info,
        createdAt: Date.now(),
      } as IBudget;

      const uid = await fbBudget.addWithId(newBudget);
      action.budgetCreateAC({ ...newBudget, uid });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (newBudget: IBudget): Promise<void> => {
    try {
      setLoading(true);
      await fbBudget.update(newBudget?.uid, newBudget);
      action.budgetUpdateAC(newBudget);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await fbBudget.remove(id);
      action.budgetDeleteAC(id);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    budget,
    budgetLoading: loading,
    setBudget,
    onCreate,
    onUpdate,
    onDelete,
  };
};
