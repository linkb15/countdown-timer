/**
 *
 * Countdown
 *
 */

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectCountdown } from './selectors';
import { selectSpeedControl } from '../SpeedControl/selectors';
import { Button } from 'app/components/Button';

interface Props {}

export function Countdown(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const countdown = useSelector(selectCountdown);
  const speedControl = useSelector(selectSpeedControl);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { count, initial, paused } = countdown;
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
  const { ms } = speedControl;

  const [color, setColor] = React.useState(false);
  const [blink, setBlink] = React.useState(false);
  const counter = React.useRef<number>();
  const change = React.useRef<number>();

  const timer = useCallback(() => {
    if (count) {
      if (!paused) {
        const result = count - 1;
        setCount(result <= 0 ? 0 : result);
        counter.current = setTimeout(timer, ms);
      }
    }
  }, [count, ms, paused, setCount]);

  useEffect(() => {
    if (blink) change.current = setInterval(() => setColor(prev => !prev), 300);

    return () => {
      clearInterval(change.current);
    };
  }, [blink]);

  useEffect(() => {
    if (count && count > 0) {
      if (count > 10) {
        setBlink(false);
        setColor(false);
        clearInterval(change.current);
      }
      if (count <= 10) {
        setBlink(true);
      }
      if (counter) clearTimeout(counter.current);
      if (!paused) counter.current = setTimeout(timer, ms);
    }
    if (!count) {
      setPaused(true);
      setColor(false);
      setBlink(false);
      clearInterval(change.current);
    }
    return () => {
      clearTimeout(counter.current);
    };
  }, [ms, paused, count, timer, setPaused]);

  const startTimer = () => {
    setPaused(false);
    setCount(initial);
  };

  useEffect(() => () => {});

  const oneminute = 60;
  const quotient = (a, b) => (a - (a % b)) / b;
  const remainder = (a, b) => a % b;
  const minute = quotient(count, oneminute),
    second = remainder(count, oneminute);

  const minuteText = quotient(minute, 10) >= 1 ? minute : '0' + minute;
  const secondText = quotient(second, 10) >= 1 ? second : '0' + second;

  return (
    <>
      <Div>
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

        <TimerCounter
          color={
            color
              ? 'transparent'
              : count && count > 0 && count < 20
              ? 'red'
              : 'black'
          }
        >
          {minuteText || '00'}:{secondText || '00'}
          <BtnPlayPause
            onClick={() => {
              if (count && count > 0) setPaused(!paused);
            }}
          >
            {paused ? <Play /> : <Pause />}
          </BtnPlayPause>
        </TimerCounter>
      </Div>
    </>
  );
}

const Div = styled.div``;

const Play = () => {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <polygon points="15,0 50,30 15,60" />
    </svg>
  );
};

const Pause = () => {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" width="9" height="60" rx="4" />
      <rect x="36" width="9" height="60" rx="4" />
    </svg>
  );
};

const Comment = styled.div`
  height: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  height: 39px;
  margin: 4px;
  max-width: 120px;
`;

const TimerCounter = styled.div`
  font-size: 20vw;
  font-weight: bold;
  color: ${p => p.color};
  display: flex;
  align-items: center;
  position: relative;
`;

const BtnPlayPause = styled.button`
  position: absolute;
  top: 50%;
  transform: translate(100%, -50%);
  right: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  color: black;
  background: white;
  &:hover {
    opacity: 0.8;
    background: black;
    color: white;
  }
`;
