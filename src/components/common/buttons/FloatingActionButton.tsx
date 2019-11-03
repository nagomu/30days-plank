import styled from '@emotion/styled';

import { rgba } from '~/utils';

const FloatingActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  transition: box-shadow 0.25s ease-in-out;
  border: 0;
  border-radius: 999em;
  background-color: #1e88e5;
  box-shadow: 0 2px 4px ${rgba('#000', 0.4)};
  color: #fff;
  font-size: 24px;

  &:disabled {
    background-color: ${rgba('#000', 0.38)};
    box-shadow: 0 2px 4px ${rgba('#000', 0)};
    color: ${rgba('#212121', 0.6)};
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px ${rgba('#000', 0.4)};
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 0 0 4px ${rgba('#000', 0.4)};
  }
`;

export default FloatingActionButton;
