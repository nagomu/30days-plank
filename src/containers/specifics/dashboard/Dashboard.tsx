import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WrappedComponent from '~/components/specifics/dashboard/Dashboard';
import { currentUser } from '~/services/firebase/auth';
import { AppState } from '~/store';
import {
  AddChallengeParams,
  onAddChallenge,
  onFetchChallenge,
} from '~/store/challenge';
import { timestamp } from '~/utils';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const challenge = useSelector((state: AppState) => state.challenge);
  const workout = useSelector((state: AppState) => state.workout);
  const uid = currentUser();

  React.useEffect(() => {
    if (uid && !challenge.challenge) {
      onFetchChallenge(dispatch);
    }
  }, []);

  const params: AddChallengeParams = {
    isActive: true,
    createdAt: timestamp(new Date()),
    workouts: [],
  };

  const handleAddChallenge = (): void => {
    if (!uid) return;
    onAddChallenge(dispatch, params);
  };

  const isLoading = !uid || !!challenge.isLoading || !!workout.isLoading;

  return (
    <WrappedComponent
      challenge={challenge.challenge}
      isLoading={isLoading}
      onAddChallenge={handleAddChallenge}
    />
  );
};

export default Dashboard;
