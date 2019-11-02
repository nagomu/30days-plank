import styled from '@emotion/styled';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import FloatingActionButton from '~/components/common/buttons/FloatingActionButton';
import Icon from '~/components/common/icons/Icon';

const Button = styled(FloatingActionButton)`
  position: fixed;
  right: 24px;
  bottom: 48px;
`;

const NavButton = Button.withComponent(NavLink);

type Props = {
  pathname: string;
};

const StartButton: React.FC<Props> = ({ pathname }) => (
  <NavButton exact to={pathname}>
    <Icon name="play_arrow" />
  </NavButton>
);

export default StartButton;
