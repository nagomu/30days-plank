import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WrappedComponent from '~/components/specifics/dashboard/Dashboard';
import { timestampFromDate } from '~/services/firestore';
import { AppState } from '~/store';
import { User } from '~/store/auth';
import {
  AddChallengeParams,
  onAddChallenge,
  onFetchChallenge,
} from '~/store/challenge';

type Props = {
  user?: User;
};

const Dashboard: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const challenge = useSelector((state: AppState) => state.challenge);
  const workout = useSelector((state: AppState) => state.workout);

  React.useEffect(() => {
    if (user && !challenge.challenge) {
      onFetchChallenge(dispatch, user.uid);
    }
  }, []);

  const params: AddChallengeParams = {
    isActive: true,
    createdAt: timestampFromDate(new Date()),
    workouts: [],
  };

  const handleAddChallenge = (): void => {
    if (!user) return;
    onAddChallenge(dispatch, user.uid, params);
  };

  const isLoading = !user || !!challenge.isLoading || !!workout.isLoading;

  return (
    <WrappedComponent
      challenge={challenge.challenge}
      isLoading={isLoading}
      onAddChallenge={handleAddChallenge}
    />
  );
};

export default Dashboard;
