/**
 *
 * Countdown
 *
 */

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectCountdown } from './selectors';
import { Button } from 'app/components/Button';
import { oneminute } from 'utils/helpers';
import { TimerCounterContainer } from './TimerCounter';

export function Countdown() {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const countdown = useSelector(selectCountdown);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { count, initial } = countdown;
  const setCount = useCallback(
    e => {
      return dispatch(actions.setCount(e));
    },
    [dispatch],
  );
  const setInitial = (e: number) => dispatch(actions.setInitial(e));
  const setPaused = useCallback(e => dispatch(actions.setPaused(e)), [
    dispatch,
  ]);

  const startTimer = () => {
    setPaused(false);
    setCount(initial);
  };

  return (
    <>
      <div>
        Countdown:{' '}
        <Input
          type="number"
          placeholder="(Min)"
          min={1}
          onChange={e => setInitial(parseInt(e.target.value) * oneminute)}
        />
        <Button primary onClick={() => startTimer()}>
          Start
        </Button>
      </div>

      <Comment>
        {count && count < initial / 2 ? (
          <i>More than halfway there!</i>
        ) : (
          count === 0 && count <= 0 && <i>Time's up!</i>
        )}
      </Comment>
      <TimerCounterContainer />
    </>
  );
}

const Comment = styled.div`
  height: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  height: 39px;
  margin: 4px;
  max-width: 120px;
`;
