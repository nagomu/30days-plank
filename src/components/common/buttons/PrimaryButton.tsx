import { styled } from 'linaria/react';

const PrimaryButton = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 12px 16px;
  overflow: hidden;
  transition: box-shadow 0.25s ease-in-out;
  border: 0;
  border-radius: 2px;
  background-color: #1e88e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  -webkit-appearance: none;

  &:disabled {
    background-color: #e0e0e0;
    color: rgba(33, 33, 33, 0.5);
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:hover:not(:disabled) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  &:active:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
`;

export default PrimaryButton;
