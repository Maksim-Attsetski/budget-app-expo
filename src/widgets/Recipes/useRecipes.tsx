import { useState } from 'react';
import { QueryFilterConstraint } from 'firebase/firestore';

import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IRecipe } from './types';
import { useSetting } from '../Setting';

export const useRecipe = () => {
  const { maxCount, recipes } = useTypedSelector((s) => s.recipes);
  const { action } = useActions();
  const fbRecipes = useFirestore('zefirka-recipes');
  const { margin, ratePerHour } = useSetting();

  const [loading, setLoading] = useState<boolean>(false);

  const onGetRecipes = async (
    whereArr?: QueryFilterConstraint[],
    limitVal?: number,
    save: boolean = true
  ): Promise<{ result: IRecipe[]; count: number }> => {
    try {
      setLoading(true);
      const curRecipes = await fbRecipes.getAll(whereArr ?? [], limitVal);
      curRecipes?.count > 0 && save && action?.setRecipes?.(curRecipes);
      return curRecipes;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onSearchRecipes = async (
    query: string,
    save: boolean = false,
    limitVal: number = 10
  ) => {
    try {
      setLoading(true);
      const curData = await fbRecipes.search<IRecipe>(
        query,
        ['name', 'description', 'cost_price'],
        limitVal
      );

      save && action.setRecipes(curData);
      return curData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onAddRecipe = async (data: IRecipe): Promise<void> => {
    try {
      setLoading(true);
      const newData = { ...data, inTrash: 0, createdAt: Date.now() };
      const uid = await fbRecipes.addWithId(newData);
      action.addRecipeAC({ ...newData, uid });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onUpdateRecipe = async (data: IRecipe): Promise<void> => {
    try {
      setLoading(true);
      await fbRecipes.update(data.uid, data);
      action.updateRecipeAC(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteRecipe = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await fbRecipes.remove(id);
      action.deleteRecipeAC(id);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const recipesInTrash = recipes.filter((el) => el.inTrash > 0);

  const totalPrice = recipesInTrash.reduce(
    (prev, cur) => prev + cur.cost_price * cur.inTrash,
    0
  );

  const totalWeight = recipesInTrash.reduce(
    (prev, cur) => prev + cur.weight * cur.inTrash,
    0
  );

  const totalTime = recipesInTrash.reduce(
    (prev, cur) => prev + cur.time * cur.inTrash,
    0
  );

  const laborCost = totalTime * (ratePerHour / 3600);

  const totalProductCost = +(
    laborCost +
    totalPrice +
    (laborCost + totalPrice) * margin
  ).toFixed(2);

  return {
    maxCount,
    recipes,
    recipeLoading: loading,
    totalPrice,
    totalTime,
    totalWeight,
    laborCost,
    totalProductCost,
    recipesInTrash,
    onGetRecipes,
    onAddRecipe,
    onUpdateRecipe,
    onDeleteRecipe,
    onSearchRecipes,
  };
};
