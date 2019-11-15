import { styled } from 'linaria/react';

export const floatingActionButtonStyles = `
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 24px;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.38);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
    color: rgba(33, 33, 33, 0.6);
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:hover:not(:disabled) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  }
`;

const FloatingActionButton = styled.button`
  ${floatingActionButtonStyles}
`;

export default FloatingActionButton;
