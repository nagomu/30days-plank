import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '~/components/common/icons/Avatar';
import DrawerNav from '~/components/common/layouts/DrawerNav';
import Loading from '~/components/common/loaders/Loading';
import { AppState } from '~/store';
import { User } from '~/store/auth';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 56px 1fr;
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.25s ease-in-out;
`;

const NavBar = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Main = styled.main`
  display: block;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

type Props = {
  children: React.ReactNode;
  user?: User;
  isLoading?: boolean;
  onSignOut: () => Promise<void>;
};

const App: React.FC<Props> = ({ children, onSignOut, isLoading, user }) => {
  const { isNavOpen } = useSelector((state: AppState) => state.layout);

  return (
    <Screen>
      {isNavOpen ? (
        <DrawerNav onSignOut={onSignOut} user={user} />
      ) : (
        <Container>
          <NavBar>
            <Avatar asButton={true} user={user} />
          </NavBar>
          <Main>{isLoading ? <Loading /> : children}</Main>
        </Container>
      )}
    </Screen>
  );
};

export default App;
