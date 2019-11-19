import styled from '@emotion/styled';
import * as React from 'react';

import PrimaryButton from '~/components/common/buttons/PrimaryButton';
import Workouts from '~/components/common/challenges/Workouts';
import Loading from '~/components/common/loaders/Loading';
import NotStarted from '~/components/specifics/dashboard/NotStarted';
import StartButton from '~/components/specifics/dashboard/StartButton';
import { useOnArchive } from '~/hooks/specifics/dashboard/useOnArchive';
import { Challenge, Workout } from '~/types';
import { isEmptyArray, isToday } from '~/utils';

const Expired = styled.div`
  padding: 0 16px;
  border-bottom: 1px solid #e0e0e0;
`;

type Props = {
  challenge?: Challenge;
  isLoading: boolean;
  onAddChallenge: () => void;
};

const Dashboard: React.FC<Props> = props => {
  const { challenge, isLoading, onAddChallenge } = props;
  const { isExpired, onArchive } = useOnArchive();

  const findTodaysWorkout = (): Workout | undefined => {
    if (!challenge) return undefined;
    return challenge.workouts.find(w => isToday(w.date) && !w.isRest);
  };
  const todaysWorkout = findTodaysWorkout();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!!challenge && !isEmptyArray(challenge.workouts) ? (
        <>
          {isExpired && (
            <Expired>
              <p>This challenge seems to be out of date</p>
              <p>
                <PrimaryButton onClick={onArchive}>Archive now</PrimaryButton>
              </p>
            </Expired>
          )}
          <Workouts
            challengeId={challenge.id}
            todaysWorkout={todaysWorkout}
            workouts={challenge.workouts}
          />
          {!!todaysWorkout && !todaysWorkout.isCompleted && (
            <StartButton
              pathname={`/challenges/${challenge.id}/workouts/${todaysWorkout.id}`}
            />
          )}
        </>
      ) : (
        <NotStarted onClick={onAddChallenge} />
      )}
    </>
  );
};

export default Dashboard;
