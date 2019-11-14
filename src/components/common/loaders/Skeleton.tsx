import { keyframes } from '@emotion/core';
import { styled } from 'linaria/react';

import { rgba } from '~/utils';

const pulse = keyframes`
  0% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
`;

const Skeleton = styled.div`
  display: block;
  width: 120px;
  height: 22px;
  animation: ${pulse} 2s ease-in-out infinite;

  &::before {
    width: 100%;
    background-color: #e0e0e0;
  }

  &::after {
    width: 88px;
    margin-top: 6px;
    background-color: ${rgba('#e0e0e0', 0.6)};
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 8px;
  }
`;

export default Skeleton;
