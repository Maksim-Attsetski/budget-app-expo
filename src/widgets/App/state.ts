import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  isDark: boolean;
  appLoading: boolean;
}

const initialState: IState = {
  isDark: false,
  appLoading: true,
};

const appSlice = createSlice({
  name: 'myAppSlice',
  initialState,
  reducers: {
    setThemeAC: (state: IState, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    setAppLoadingAC: (state: IState, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
  },
});

export const appActions = { ...appSlice.actions };
export const appReducer = appSlice.reducer;
