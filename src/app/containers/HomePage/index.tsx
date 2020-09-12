import React, { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { SpeedControl } from '../SpeedControl';
import { Countdown } from '../Countdown';

export function HomePage() {
  const [count, setCount] = React.useState<number | undefined>(0);
  const [initial, setInitial] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const [ms, setMs] = React.useState(1000);
  const [color, setColor] = React.useState(false);
  const [blink, setBlink] = React.useState(false);
  const counter = React.useRef<number>();
  const change = React.useRef<number>();

  const timer = useCallback(() => {
    if (count) {
      if (!paused) {
        setCount(prev => {
          if (prev) {
            const result = prev - 1;
            return result <= 0 ? 0 : result;
          }
        });
        counter.current = setTimeout(timer, ms);
      }
    }
  }, [count, ms, paused]);

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
  }, [ms, paused, count, timer]);

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

  const speedControlMenu = [1, 1.5, 2, 100];
  const minuteText = quotient(minute, 10) >= 1 ? minute : '0' + minute;
  const secondText = quotient(second, 10) >= 1 ? second : '0' + second;
  return (
    <>
      <Helmet>
        <title>{count && count.toString()}</title>
        <meta name="description" content="Countdown timer with react" />
      </Helmet>
      <Container>
        <Countdown />
        <SpeedControl />
      </Container>
      <Container>
        <div>
          Countdown:{' '}
          <Input
            type="number"
            placeholder="(Min)"
            min={1}
            onChange={e => setInitial(parseInt(e.target.value) * oneminute)}
          />
          <BtnStart onClick={() => startTimer()}>Start</BtnStart>
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

        <div>
          {speedControlMenu.map((e, i) => (
            <BtnSpeedControl
              key={i}
              onClick={() => setMs(1000 / e)}
              active={ms === 1000 / e}
            >
              {e}X
            </BtnSpeedControl>
          ))}
        </div>
      </Container>
    </>
  );
}

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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Comment = styled.div`
  height: 20px;
`;

const Input = styled.input`
  padding: 12px 16px;
  height: 39px;
  margin: 4px;
  max-width: 120px;
`;

const BtnStart = styled.button`
  margin: 4px;
  background-color: #6ab6a9;
  border: 0;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  padding: 12px 16px;
  &:hover {
    opacity: 0.8;
  }
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
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid black;
  color: black;
  background: white;
  &:hover {
    background: black;
    color: white;
    opacity: 0.8;
  }
`;

const BtnSpeedControl = styled.button<{ active: Boolean }>`
  background-color: ${p => (p.active ? '#6e6966' : 'white')};
  cursor: pointer;
  border: 0;
  text-transform: uppercase;
  color: ${p => (p.active ? 'white' : 'black')};
  padding: 12px 16px;
  margin: 4px;
  width: 75px;

  border: 2px solid black;
  &:hover {
    background-color: #6e6966;
    color: white;
    opacity: 0.8;
  }
`;
