import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRecipe, ITrashItem } from './types';
import { IResponse } from '../../shared';

interface IState {
  recipes: IRecipe[];
  maxCount: number;
  trash: ITrashItem[];
}

const initialState: IState = {
  maxCount: 0,
  recipes: [],
  trash: [],
};

const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState,
  reducers: {
    setRecipes: (state: IState, action: PayloadAction<IResponse<IRecipe>>) => {
      state.recipes = action.payload.result;
      state.maxCount = action.payload.count;
    },
    addRecipeAC: (state: IState, action: PayloadAction<IRecipe>) => {
      state.recipes = [action.payload, ...state.recipes];
    },
    updateRecipeAC: (state: IState, action: PayloadAction<IRecipe>) => {
      state.recipes = state.recipes.map((el) =>
        el.uid === action.payload.uid ? { ...el, ...action.payload } : el
      );
    },
    deleteRecipeAC: (state: IState, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((el) => el.uid !== action.payload);
    },
    addTrashItemAC: (state: IState, action: PayloadAction<IRecipe>) => {
      const trashItem = state.trash.find(
        (el) => el.recipe.uid === action.payload.uid
      );
      if (trashItem) {
        state.trash = state.trash.map((item) =>
          trashItem.recipe.uid === item.recipe.uid
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        state.trash = [...state.trash, { count: 1, recipe: action.payload }];
      }
    },
    deleteTrashItemAC: (state: IState, action: PayloadAction<string>) => {
      state.trash = state.trash.filter(
        (item) => item.recipe.uid !== action.payload
      );
    },
  },
});

export const recipeActions = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
