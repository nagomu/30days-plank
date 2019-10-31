import styled from '@emotion/styled';
import * as React from 'react';

import PrimaryButton from '~/components/common/buttons/PrimaryButton';
import Workout from '~/components/specifics/dashboard/Workout';
import { useOnArchive } from '~/hooks/specifics/dashboard/useOnArchive';
import { Workout as WorkoutType } from '~/store/workout';

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
  workouts: WorkoutType[];
};

const Challenge: React.FC<Props> = ({ challengeId, workouts }) => {
  const { isExpired, onArchive } = useOnArchive();

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
          <Workout
            {...workout}
            key={workout.id}
            pathname={`/challenges/${challengeId}/workouts/${workout.id}`}
          />
        ))}
      </Workouts>
    </>
  );
};
export default Challenge;
