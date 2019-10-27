import * as React from 'react';
import styled from '@emotion/styled';

import FloatingActionButton from '~/components/common/buttons/FloatingActionButton';
import Icon from '~/components/common/icons/Icon';
import { Status } from '~/store/workout';

const Button = styled(FloatingActionButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  onStart: () => void;
  onTogglePause: () => void;
  status: Status;
};

const StartOrPauseButton: React.FC<Props> = ({
  onStart,
  onTogglePause,
  status,
}) => {
  const iconName =
    status === Status.start || status === Status.restart
      ? 'pause'
      : 'play_arrow';

  const label = (): string => {
    if (status === Status.finish) {
      return '';
    }
    if (status === Status.start || status === Status.restart) {
      return 'Pause';
    }
    return 'Start';
  };

  const handleClick = (): void => {
    if (status !== Status.standby && status !== Status.finish) {
      return onTogglePause();
    }
    return onStart();
  };

  return (
    <Button
      aria-label={label()}
      disabled={status === Status.finish}
      onClick={handleClick}
      role="button"
    >
      <Icon name={iconName} />
    </Button>
  );
};

export default StartOrPauseButton;
