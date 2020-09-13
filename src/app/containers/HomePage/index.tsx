import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { SpeedControl } from '../SpeedControl';
import { Countdown } from '../Countdown';
import { selectCountdown } from '../Countdown/selectors';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey } from '../Countdown/slice';
import { getTimerText } from 'utils/helpers';

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const countdown = useSelector(selectCountdown);
  const { count } = countdown;

  const [minuteText, secondText] = count ? getTimerText(count) : ['00', '00'];
  return (
    <>
      <Helmet>
        <title>{`${minuteText}:${secondText}`}</title>
        <meta name="description" content="Countdown timer with react" />
      </Helmet>
      <Container>
        <Countdown />
        <SpeedControl />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
