import styled from '@emotion/styled';
import * as React from 'react';

import Workout from '~/components/specifics/dashboard/Workout';
import { Workout as WorkoutType } from '~/store/workout';

const Workouts = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = {
  challengeId: string;
  workouts: WorkoutType[];
};

const Challenge: React.FC<Props> = ({ challengeId, workouts }) => (
  <Workouts>
    {workouts.map(workout => (
      <Workout
        {...workout}
        key={workout.id}
        pathname={`/challenges/${challengeId}/workouts/${workout.id}`}
      />
    ))}
  </Workouts>
);

export default Challenge;
