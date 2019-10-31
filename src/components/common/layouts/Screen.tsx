import styled from '@emotion/styled';
import * as React from 'react';

import Nav from '~/components/common/layouts/Nav';
import Loading from '~/components/common/loaders/Loading';
import { Props } from '~/containers/common/layouts/App';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Layout = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;

  @media all and (min-width: 680px) {
    left: 50%;
    width: 680px;
    transform: translateX(-50%);
  }

  @media all and (min-width: 880px) {
    grid-template-columns: 280px 1fr;
    width: 880px;
  }
`;

const Main = styled.main`
  display: block;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  @media all and (min-width: 680px) {
    border-right: 1px solid #e0e0e0;
  }
`;

const Screen: React.FC<Props> = ({ children, onSignOut, isLoading, user }) => (
  <Container>
    <Layout>
      <Nav onSignOut={onSignOut} user={user} />
      <Main>{isLoading ? <Loading /> : children}</Main>
    </Layout>
  </Container>
);

export default Screen;
