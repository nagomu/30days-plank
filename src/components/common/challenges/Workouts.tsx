import styled from '@emotion/styled';
import * as React from 'react';

import Menu from '~/components/common/challenges/Workout';
import { Workout } from '~/types';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = {
  challengeId: string;
  isArchived: boolean;
  todaysWorkout?: Workout;
  workouts: Workout[];
};

const Workouts: React.FC<Props> = ({
  challengeId,
  isArchived,
  todaysWorkout,
  workouts,
}) => {
  const isToday = (workout: Workout): boolean =>
    !!todaysWorkout && todaysWorkout.id === workout.id;
  const pathname = (id: string): string =>
    `/challenges/${challengeId}/workouts/${id}`;

  return (
    <List>
      {workouts.map(workout => (
        <Menu
          {...workout}
          key={workout.id}
          pathname={`${pathname(workout.id)}`}
          isArchived={isArchived}
          isToday={isToday(workout)}
        />
      ))}
    </List>
  );
};

export default Workouts;
