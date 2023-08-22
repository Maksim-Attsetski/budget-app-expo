import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  margin: number;
  ratePerHour: number;
}

const initialState: IState = {
  margin: 0.4,
  ratePerHour: 7,
};

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setMarginAC: (state: IState, action: PayloadAction<number>) => {
      state.margin = action.payload;
    },
    setRatePerHourAC: (state: IState, action: PayloadAction<number>) => {
      state.ratePerHour = action.payload;
    },
  },
});

export const settingActions = { ...settingSlice.actions };
export const settingReducer = settingSlice.reducer;
