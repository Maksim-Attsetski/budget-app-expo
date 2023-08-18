import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRecipe } from './types';
import { IResponse } from '../../shared';

interface IState {
  recipes: IRecipe[];
  maxCount: number;
}

const initialState: IState = {
  maxCount: 0,
  recipes: [],
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
  },
});

export const recipeActions = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
