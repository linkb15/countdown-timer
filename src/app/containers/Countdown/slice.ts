import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Countdown container
export const initialState: ContainerState = {
  paused: true,
  initial: 0,
  count: null,
};

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setPaused(state, action: PayloadAction<Boolean>) {
      state.paused = action.payload;
    },
    setInitial(state, action: PayloadAction<number>) {
      state.initial = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = countdownSlice;
