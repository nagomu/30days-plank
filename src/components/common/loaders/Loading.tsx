import styled from '@emotion/styled';
import * as React from 'react';

import Skeleton from '~/components/common/loaders/Skeleton';

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 12px 16px;
`;

const Message = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 12px 16px;
  transform: translate(-50%);
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 28px;
  font-weight: 700;
`;

const Loading: React.FC = () => (
  <Screen>
    <Skeleton />
    <Message>
      Let&rsquo;s start
      <br />
      30 Days Plank Challenge
    </Message>
  </Screen>
);

export default Loading;
