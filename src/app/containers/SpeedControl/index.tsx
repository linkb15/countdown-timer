/**
 *
 * SpeedControl
 *
 */

import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectSpeedControl } from './selectors';
import { Button } from 'app/components/Button';

interface Props {}

export const SpeedControl = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const speedControl = useSelector(selectSpeedControl);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { ms, speedMenu } = speedControl;
  const setMs = (e: Number) => dispatch(actions.setMs(e));
  return (
    <>
      <Div>
        {speedMenu.map((e, i) => (
          <Button
            secondary
            key={i}
            onClick={() => setMs(1000 / e)}
            active={ms === 1000 / e}
          >
            {e}X
          </Button>
        ))}
      </Div>
    </>
  );
});

const Div = styled.div``;
