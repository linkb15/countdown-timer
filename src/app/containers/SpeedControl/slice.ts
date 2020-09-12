import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the SpeedControl container
export const initialState: ContainerState = {
  speedMenu: [1, 1.5, 2, 100],
  ms: 1000,
};

const speedControlSlice = createSlice({
  name: 'speedControl',
  initialState,
  reducers: {
    setMs(state, action: PayloadAction<Number>) {
      state.ms = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = speedControlSlice;
