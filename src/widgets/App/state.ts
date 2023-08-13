import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  isDark: boolean;
}

const initialState: IState = {
  isDark: true,
};

const appSlice = createSlice({
  name: 'myAppSlice',
  initialState,
  reducers: {
    setThemeAC: (state: IState, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

export const appActions = { ...appSlice.actions };
export const appReducer = appSlice.reducer;
