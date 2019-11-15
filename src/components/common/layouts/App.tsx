import { styled } from 'linaria/react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Avatar from '~/components/common/icons/Avatar';
import DrawerNav from '~/components/common/layouts/DrawerNav';
import Footer from '~/components/common/layouts/Footer';
import Loading from '~/components/common/loaders/Loading';
import { AppState } from '~/store';
import { User } from '~/types';

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  animation: fadeIn 0.25s ease-in-out;
  background-color: #fff;

  @media (min-width: 512px) {
    top: 50%;
    left: 50%;
    width: 480px;
    max-height: 90vh;
    overflow: hidden;
    transform: translate(-50%, -50%);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
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
  const { pathname } = useLocation();

  const shouldNavBarShowed = pathname === '/dashboard' || pathname === '/';
  const isSignIn = pathname === '/';
  const style = !shouldNavBarShowed ? { gridTemplateRows: '1fr' } : undefined;

  return (
    <Screen>
      {isNavOpen ? (
        <DrawerNav onSignOut={onSignOut} user={user} />
      ) : (
        <Container style={style}>
          {shouldNavBarShowed && (
            <NavBar>
              <Avatar asButton={true} user={user} />
            </NavBar>
          )}
          <Main>{isLoading ? <Loading /> : children}</Main>
        </Container>
      )}
      {isSignIn && <Footer />}
    </Screen>
  );
};

export default App;
