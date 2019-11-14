import { styled } from 'linaria/react';
import * as React from 'react';

import FloatingActionButton from '~/components/common/buttons/FloatingActionButton';
import Icon from '~/components/common/icons/Icon';
import { Timer } from '~/types';

const Button = styled(FloatingActionButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  onStart: () => void;
  onTogglePause: () => void;
  status: Timer;
};

const StartOrPauseButton: React.FC<Props> = ({
  onStart,
  onTogglePause,
  status,
}) => {
  const iconName =
    status === Timer.start || status === Timer.restart ? 'pause' : 'play_arrow';

  const label = (): string => {
    if (status === Timer.finish) {
      return '';
    }
    if (status === Timer.start || status === Timer.restart) {
      return 'Pause';
    }
    return 'Start';
  };

  const handleClick = (): void => {
    if (status !== Timer.standby && status !== Timer.finish) {
      return onTogglePause();
    }
    return onStart();
  };

  return (
    <Button
      aria-label={label()}
      disabled={status === Timer.finish}
      onClick={handleClick}
      role="button"
    >
      <Icon name={iconName} />
    </Button>
  );
};

export default StartOrPauseButton;
