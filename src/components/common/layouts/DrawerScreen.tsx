import styled from '@emotion/styled';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '~/components/common/icons/Icon';
import Loading from '~/components/common/loaders/Loading';

const Screen = styled.div`
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
  width: 100%;
  height: 100%;
  background-color: #fff;

  @media all and (min-width: 680px) {
    position: absolute;
    grid-template-rows: 64px 1fr;
  }
`;

const NavBar = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #e0e0e0;

  @media all and (min-width: 680px) {
    height: 64px;
  }
`;

const Title = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 40px);
  height: 48px;
  padding: 12px 16px;
  overflow: hidden;
  color: #212121;
  font-size: 16px;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BackIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: #1e88e5;
`;

const GivenIcon = styled.div`
  width: 40px;
  height: 48px;
  padding: 12px 16px 12px 0;
`;

const LoadingPlaceHolder = styled.div`
  position: relative;
`;

type Props = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  pathname: string;
  title: React.ReactNode;
};

const DrawerScreen: React.FC<Props> = ({
  children,
  icon,
  isLoading,
  pathname,
  title,
}) => (
  <Screen>
    <NavBar>
      <Title exact to={pathname} role="button">
        <BackIcon name="arrow_back" />
        {title}
      </Title>
      {icon && <GivenIcon>{icon}</GivenIcon>}
    </NavBar>
    {isLoading ? (
      <LoadingPlaceHolder>
        <Loading />
      </LoadingPlaceHolder>
    ) : (
      children
    )}
  </Screen>
);

export default DrawerScreen;
