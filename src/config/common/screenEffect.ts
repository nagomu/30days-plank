import { css, keyframes } from '@emotion/core';

const popup = keyframes`
  0% {
    transform: translateY(16px);
  }

  100% {
    transform: translateY(0);
  }
`;

export const screenEffect = css`
  animation: ${popup} 0.2s ease-in-out;
`;
