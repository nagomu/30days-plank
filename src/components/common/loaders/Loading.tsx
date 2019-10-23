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

const Loading: React.FC = () => (
  <Screen>
    <Skeleton />
  </Screen>
);

export default Loading;
