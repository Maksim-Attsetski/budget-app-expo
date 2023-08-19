import { useState } from 'react';
import { QueryFilterConstraint } from 'firebase/firestore';

import { useActions, useFirestore, useTypedSelector } from '../../shared';
import { IRecipe } from './types';

export const useRecipe = () => {
  const { maxCount, recipes, trash } = useTypedSelector((s) => s.recipes);
  const { action } = useActions();
  const fbRecipes = useFirestore('zefirka-recipes');
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

  const onAddRecipe = async (data: IRecipe): Promise<void> => {
    try {
      setLoading(true);
      const newData = { ...data, createdAt: Date.now() };
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

  return {
    maxCount,
    recipes,
    recipeLoading: loading,
    trash,
    onAddToTrash: action.addTrashItemAC,
    onDeleteFromTrash: action.deleteTrashItemAC,
    onGetRecipes,
    onAddRecipe,
    onUpdateRecipe,
    onDeleteRecipe,
  };
};
