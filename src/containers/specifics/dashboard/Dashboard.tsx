import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WrappedComponent from '~/components/specifics/dashboard/Dashboard';
import { currentUser } from '~/services/firebase';
import { timestampFromDate } from '~/services/firestore';
import { AppState } from '~/store';
import {
  AddChallengeParams,
  onAddChallenge,
  onFetchChallenge,
} from '~/store/challenge';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const challenge = useSelector((state: AppState) => state.challenge);
  const workout = useSelector((state: AppState) => state.workout);
  const uid = currentUser();

  React.useEffect(() => {
    if (uid && !challenge.challenge) {
      onFetchChallenge(dispatch, uid);
    }
  }, []);

  const params: AddChallengeParams = {
    isActive: true,
    createdAt: timestampFromDate(new Date()),
    workouts: [],
  };

  const handleAddChallenge = (): void => {
    if (!uid) return;
    onAddChallenge(dispatch, uid, params);
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
