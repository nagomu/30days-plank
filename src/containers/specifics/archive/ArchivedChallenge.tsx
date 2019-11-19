import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Workouts from '~/components/common/challenges/Workouts';
import NotFound from '~/components/common/errors/NotFound';
import DrawerScreen from '~/components/common/layouts/DrawerScreen';
import { AppState } from '~/store';
import { onFetchArchivedChallenge } from '~/store/archive';
import { ChallengeState } from '~/store/challenge';
import { Challenge } from '~/types';
import { generateTitle, isEmptyArray } from '~/utils';

type ExistsWorkouts = {
  challenge: Challenge;
  isLoading?: boolean;
};

const existsWorkouts = (
  challenge: ChallengeState,
): challenge is ExistsWorkouts =>
  !!challenge.challenge && !isEmptyArray(challenge.challenge.workouts);

const ArchivedChallenge: React.FC = () => {
  const { challengeId } = useParams();
  const dispatch = useDispatch();
  const { user, challenge, workout } = useSelector((state: AppState) => ({
    user: state.auth.user,
    challenge: state.challenge,
    workout: state.workout,
  }));

  React.useEffect(() => {
    if (user && challengeId) onFetchArchivedChallenge(dispatch, challengeId);
  }, [user]);

  const isLoading = !user || !!challenge.isLoading || !!workout.isLoading;
  const title = existsWorkouts(challenge)
    ? generateTitle(challenge.challenge.workouts)
    : 'Archive';

  return (
    <DrawerScreen title={title} pathname="/archives" isLoading={isLoading}>
      {!challengeId || !existsWorkouts(challenge) ? (
        <NotFound />
      ) : (
        <Workouts
          challengeId={challengeId}
          todaysWorkout={undefined}
          workouts={challenge.challenge.workouts}
        />
      )}
    </DrawerScreen>
  );
};

export default ArchivedChallenge;
