import styled from '@emotion/styled';
import * as React from 'react';

import Avatar from '~/components/common/icons/Avatar';
import DrawerNav from '~/components/common/layouts/DrawerNav';
import Loading from '~/components/common/loaders/Loading';
import { Props } from '~/containers/common/layouts/App';

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

const SmallScreen: React.FC<Props> = ({
  children,
  onSignOut,
  isLoading,
  isNavOpen,
  user,
}) => {
  return (
    <Screen>
      {!isNavOpen ? (
        <Container>
          <NavBar>
            <Avatar asButton={true} user={user} />
          </NavBar>
          <Main>{isLoading ? <Loading /> : children}</Main>
        </Container>
      ) : (
        <DrawerNav onSignOut={onSignOut} user={user} />
      )}
    </Screen>
  );
};

export default SmallScreen;
