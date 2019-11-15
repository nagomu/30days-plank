import { styled } from 'linaria/react';

const Skeleton = styled.div`
  display: block;
  width: 120px;
  height: 22px;
  animation: pulse 2s ease-in-out infinite;

  &::before {
    width: 100%;
    background-color: #e0e0e0;
  }

  &::after {
    width: 88px;
    margin-top: 6px;
    background-color: rgba(224, 224, 224, 0.6);
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 8px;
  }

  @keyframes pulse {
    0% {
      opacity: 0.3;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.3;
    }
  }
`;

export default Skeleton;
