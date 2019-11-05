import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import * as React from 'react';

import { Status } from '~/store/workout';
import { rgba } from '~/utils';

const circumference = `${Math.PI * 188}px`;

const Container = styled.figure`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 192px;
  height: 192px;
  margin: 0;
  padding: 0;
  transform: translate(-50%, -70%);

  @media all and (orientation: landscape) and (max-height: 460px) {
    top: 104px;
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const Stroke = styled.circle`
  r: 94;
  cx: 96;
  cy: 96;
  stroke-width: 2;
  stroke: #e0e0e0;
  fill: #fff;
`;

const countdown = keyframes`
  from {
    stroke-dashoffset: -${circumference};
  }

  to {
    stroke-dashoffset: 0;
  }
`;

const Progress = styled.circle`
  animation-name: ${countdown};
  animation-timing-function: linear;
  r: 94;
  cx: 96;
  cy: 96;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: ${circumference};
  stroke-dashoffset: -${circumference};
  stroke: #1e88e5;
  fill: transparent;
`;

const Label = styled.figcaption`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  transform: translate(-48px, -40px);
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  text-align: center;
`;

const CountDown = styled.span`
  display: block;
  color: #1e88e5;
  font-size: 80px;
  line-height: 1;
  white-space: nowrap;
`;

const Seconds = styled.span`
  display: block;
  min-height: 16px;
  color: ${rgba('#212121', 0.6)};
  font-size: 16px;
`;

type Props = {
  progress: number;
  seconds: number;
  status: Status;
};

const DonutChart: React.FC<Props> = props => {
  const { progress, seconds, status } = props;

  const playState: 'running' | 'paused' =
    status === Status.start || status === Status.restart ? 'running' : 'paused';

  const progressStyle: React.CSSProperties = {
    animationDuration: `${seconds}s`,
    animationPlayState: playState,
  };

  const isStandby: boolean = status === Status.standby;

  return (
    <Container>
      <Svg xmlns="http://www.w3.org/2000/svg">
        <g>
          <Stroke />
          {!isStandby && <Progress style={progressStyle} />}
        </g>
      </Svg>
      <Label>
        <CountDown>{isStandby ? seconds : progress}</CountDown>
        <Seconds>{isStandby ? ' ' : seconds}</Seconds>
      </Label>
    </Container>
  );
};

export default DonutChart;
