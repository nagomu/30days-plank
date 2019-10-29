import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';
import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import DonutChart from '~/components/specifics/workout/DonutChart';
import ResetButton from '~/components/specifics/workout/ResetButton';
import StartOrPauseButton from '~/components/specifics/workout/StartOrPauseButton';
import { Status, Workout as WorkoutProps } from '~/store/workout';

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

type Props = {
  isLoading: boolean;
  pathname?: string;
  progress: number;
  status: Status;
  workout?: WorkoutProps;
  onReset: () => void;
  onStart: () => void;
  onTogglePause: () => void;
};

const Workout: React.FC<Props> = props => {
  const {
    isLoading,
    onReset,
    onStart,
    onTogglePause,
    pathname,
    progress,
    status,
    workout,
  } = props;

  const title = workout ? `${workout.title} - ${workout.menu} sec` : '';
  const isCompleted = workout ? workout.isCompleted : undefined;

  return (
    <DrawerScreen
      title={title}
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
      {workout && (
        <Container>
          <DonutChart
            progress={progress}
            seconds={workout.menu}
            status={status}
          />
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
      )}
    </DrawerScreen>
  );
};

export default Workout;
