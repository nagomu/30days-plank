import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';
import rgba from '~/utils/rgba';

const Button = styled.button`
  display: block;
  position: relative;
  width: 100%;
  height: 48px;
  margin: 48px 0 0;
  padding: 12px 56px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px ${rgba('#e0e0e0', 0)};
  color: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px ${rgba('#e0e0e0', 0.4)};
  }

  &:active {
    box-shadow: 0 2px 4px ${rgba('#e0e0e0', 0.8)};
  }

  &:focus {
    border-color: #1e88e5;
    outline: none;
    box-shadow: 0 2px 4px ${rgba('#e0e0e0', 0)};
  }
`;

const GoogleIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 16px;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
`;

type Props = {
  onClick: () => void;
};

const SignInButton: React.FC<Props> = ({ onClick }) => (
  <Button onClick={onClick} type="button">
    <GoogleIcon name="logo_google" />
    <span>Sign in with Google</span>
  </Button>
);

export default SignInButton;
