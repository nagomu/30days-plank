import styled from '@emotion/styled';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Icon from '~/components/common/icons/Icon';
import config from '~/config';
import { AuthActions, AuthState } from '~/store/auth';
import { rgba } from '~/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  border-right: 1px solid #e0e0e0;

  @media all and (min-width: 880px) {
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  width: 48px;
  height: 48px;
  margin: 0;
  margin-left: 8px;
  padding: 4px;
  font-size: 48px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #1e88e5;
  font-size: 40px;

  @media all and (min-width: 880px) {
    font-size: 40px;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 4px;

  @media all and (min-width: 880px) {
    align-items: flex-start;
  }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  padding: 4px 6px;
  transition: background-color 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-radius: 999em;
  border-color: ${rgba('#1e88e5', 0)};
  background-color: ${rgba('#1e88e5', 0)};
  color: inherit;
  font-size: 30px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${rgba('#1e88e5', 0.1)};
  }

  &:active {
    background-color: ${rgba('#1e88e5', 0.3)};
  }

  &:focus {
    border-color: ${rgba('#1e88e5', 0.5)};
    outline: none;
    background-color: ${rgba('#1e88e5', 0)};
  }

  &.active {
    color: #1e88e5;
  }

  @media all and (min-width: 880px) {
    justify-content: flex-start;
    width: 100%;
    padding-right: 12px;
    padding-left: 12px;
  }
`;

const Button = SignOutButton.withComponent(NavLink);

const ButtonText = styled.span`
  display: none;
  margin-left: 18px;
  overflow: hidden;
  font-size: 18px;
  font-weight: 500;

  @media all and (min-width: 880px) {
    display: block;
  }
`;

type Props = Pick<AuthActions, 'onSignOut'> & Pick<AuthState, 'user'>;

const Nav: React.FC<Props> = ({ onSignOut, user }) => (
  <Container>
    <Title>
      <Logo
        to={user ? '/dashboard' : '/'}
        role="button"
        title="30days plank challenge"
      >
        <Icon name="logo" />
      </Logo>
    </Title>
    {user && (
      <Menu>
        {config.nav.map(nav => (
          <Button key={nav.pathname} to={nav.pathname} exact role="button">
            <Icon name={nav.icon} />
            <ButtonText>{nav.label}</ButtonText>
          </Button>
        ))}
        <SignOutButton onClick={onSignOut} type="button">
          <Icon name="exit_to_app" />
          <ButtonText>Sign out</ButtonText>
        </SignOutButton>
      </Menu>
    )}
  </Container>
);

export default Nav;
