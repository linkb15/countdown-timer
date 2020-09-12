import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.countdown || initialState;

export const selectCountdown = createSelector(
  [selectDomain],
  countdownState => countdownState,
);
