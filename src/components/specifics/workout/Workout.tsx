import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';
import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import DonutChart from '~/components/specifics/workout/DonutChart';
import ResetButton from '~/components/specifics/workout/ResetButton';
import StartOrPauseButton from '~/components/specifics/workout/StartOrPauseButton';
import {
  HandlerProps,
  Props as StoreProps,
  State as StateProps,
} from '~/containers/specifics/workout/Workout';
import { Status } from '~/store/workout';

const Container = styled.div`
  position: relative;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 64px;
  left: 0;
  width: 100%;

  @media all and (orientation: landscape) and (max-height: 460px) {
    bottom: 32px;
  }
`;

type Props = StoreProps & Omit<StateProps, 'timer'> & HandlerProps;

const Workout: React.FC<Props> = props => {
  const {
    isCompleted,
    isLoading,
    menu,
    onReset,
    onStart,
    onTogglePause,
    pathname,
    progress,
    status,
    title,
  } = props;

  return (
    <DrawerScreen
      title={`${title} - ${menu} sec`}
      pathname={pathname || '/dashboard'}
      icon={
        isCompleted ? (
          <Icon name="done" style={{ width: '24px', height: '24px' }} />
        ) : (
          undefined
        )
      }
      isLoading={isLoading}
    >
      <Container>
        <DonutChart progress={progress} seconds={menu} status={status} />
        <ButtonGroup>
          <StartOrPauseButton
            onStart={onStart}
            onTogglePause={onTogglePause}
            status={status}
          />
          {status !== Status.standby && (
            <ResetButton role="button" onClick={onReset}>
              Reset
            </ResetButton>
          )}
        </ButtonGroup>
      </Container>
    </DrawerScreen>
  );
};

export default Workout;
