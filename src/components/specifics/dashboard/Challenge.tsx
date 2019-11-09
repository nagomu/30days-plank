import styled from '@emotion/styled';
import * as React from 'react';

import PrimaryButton from '~/components/common/buttons/PrimaryButton';
import StartButton from '~/components/specifics/dashboard/StartButton';
import Menu from '~/components/specifics/dashboard/Workout';
import { useOnArchive } from '~/hooks/specifics/dashboard/useOnArchive';
import { Workout } from '~/types';
import { isToday } from '~/utils';

const Expired = styled.div`
  padding: 0 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Workouts = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = {
  challengeId: string;
  workouts: Workout[];
};

const Challenge: React.FC<Props> = ({ challengeId, workouts }) => {
  const { isExpired, onArchive } = useOnArchive();
  const todaysWorkout = workouts.find(w => isToday(w.scheduledDate));
  const pathname = (id: string): string =>
    `/challenges/${challengeId}/workouts/${id}`;

  return (
    <>
      {isExpired && (
        <Expired>
          <p>This challenge seems to be out of date</p>
          <p>
            <PrimaryButton onClick={onArchive}>Archive now</PrimaryButton>
          </p>
        </Expired>
      )}
      <Workouts>
        {workouts.map(workout => (
          <Menu
            {...workout}
            key={workout.id}
            pathname={`${pathname(workout.id)}`}
            isToday={
              !!todaysWorkout &&
              !workout.isRest &&
              todaysWorkout.id === workout.id
            }
          />
        ))}
      </Workouts>
      {!!todaysWorkout &&
        !todaysWorkout.isRest &&
        !todaysWorkout.isCompleted && (
          <StartButton pathname={`${pathname(todaysWorkout.id)}`} />
        )}
    </>
  );
};
export default Challenge;
