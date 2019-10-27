import styled from '@emotion/styled';

import rgba from '~/utils/rgba';

enum Color {
  primary,
}

type Props = {
  color?: Color;
};

const TextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 0;
  padding: 6px 16px;
  transition: background-color 0.25s ease-in-out;
  border: 0;
  border-radius: 2px;
  background-color: ${rgba('#000', 0)};
  color: ${(props: Props): string =>
    props.color === Color.primary ? '#1e88e5' : '#212121'};
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.714285714;
  text-transform: uppercase;

  &:disabled {
    background-color: ${rgba('#000', 0.38)};
    color: ${rgba('#212121', 0.6)};
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:active:not(:disabled),
  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    background-color: ${rgba('#000', 0.15)};
  }
`;

export default TextButton;
