import { styled } from 'linaria/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import FloatingActionButton from '~/components/common/buttons/FloatingActionButton';
import Icon from '~/components/common/icons/Icon';

const Button = styled(FloatingActionButton)`
  position: fixed;
  right: 24px;
  bottom: 48px;
`;

type Props = {
  pathname: string;
};

const StartButton: React.FC<Props> = ({ pathname }) => (
  <Button as={NavLink} exact to={pathname}>
    <Icon name="play_arrow" />
  </Button>
);

export default StartButton;
