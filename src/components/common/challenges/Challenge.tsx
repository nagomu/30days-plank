import styled from '@emotion/styled';
import * as React from 'react';

import Menu from '~/components/common/challenges/Workout';
import { Workout } from '~/types';

const Workouts = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = {
  challengeId: string;
  todaysWorkout?: Workout;
  workouts: Workout[];
};

const Challenge: React.FC<Props> = ({
  challengeId,
  todaysWorkout,
  workouts,
}) => {
  const isToday = (workout: Workout): boolean =>
    !!todaysWorkout && todaysWorkout.id === workout.id;
  const pathname = (id: string): string =>
    `/challenges/${challengeId}/workouts/${id}`;

  return (
    <Workouts>
      {workouts.map(workout => (
        <Menu
          {...workout}
          key={workout.id}
          pathname={`${pathname(workout.id)}`}
          isToday={isToday(workout)}
        />
      ))}
    </Workouts>
  );
};
export default Challenge;
