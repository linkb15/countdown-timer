import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.speedControl || initialState;

export const selectSpeedControl = createSelector(
  [selectDomain],
  speedControlState => speedControlState,
);
