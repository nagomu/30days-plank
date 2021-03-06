import styled from '@emotion/styled';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '~/components/common/icons/Avatar';
import Icon from '~/components/common/icons/Icon';
import config from '~/config';
import { screenEffect } from '~/config';
import { AuthActions } from '~/hooks/common/useAuth';
import { useLayout } from '~/hooks/common/useLayout';
import { AuthState } from '~/store/auth';
import { rgba } from '~/utils';

const Screen = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;

  @media (min-width: 512px) {
    top: 50%;
    left: 50%;
    width: 480px;
    max-height: 90vh;
    overflow: hidden;
    transform: translate(-50%, -50%);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 4px ${rgba('#000', 0.1)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  ${screenEffect}
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  margin: 0;
  padding: 8px 16px;
  border: 0;
  border-bottom: 1px solid #e0e0e0;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const ForwardIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  fill: #1e88e5;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  padding: 8px 16px;
  transition: background-color 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
  border-width: 1px;
  border-style: solid;
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
`;

const Button = SignOutButton.withComponent(NavLink);

const ButtonText = styled.span`
  display: block;
  margin-left: 18px;
  overflow: hidden;
  font-size: 18px;
  font-weight: 500;
`;

type Props = Pick<AuthActions, 'onSignOut'> & Pick<AuthState, 'user'>;

const DrawerNav: React.FC<Props> = ({ onSignOut, user }) => {
  const { onToggleNav } = useLayout();
  const onClick = (): void => {
    onToggleNav();
    onSignOut();
    return;
  };
  return (
    <Screen>
      <Container>
        <CloseButton type="button" onClick={onToggleNav}>
          <Avatar asButton={false} user={user} />
          <ForwardIcon name="arrow_forward" />
        </CloseButton>
        {user && (
          <Menu>
            {config.nav.map(nav => (
              <Button
                exact
                key={nav.pathname}
                onClick={onToggleNav}
                role="button"
                to={nav.pathname}
              >
                <Icon name={nav.icon} />
                <ButtonText>{nav.label}</ButtonText>
              </Button>
            ))}
            <SignOutButton onClick={onClick} type="button">
              <Icon name="exit_to_app" />
              <ButtonText>Sign out</ButtonText>
            </SignOutButton>
          </Menu>
        )}
      </Container>
    </Screen>
  );
};

export default DrawerNav;
