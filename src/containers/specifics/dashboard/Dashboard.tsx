import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WrappedComponent from '~/components/specifics/dashboard/Dashboard';
import { AppState } from '~/store';
import { onAddChallenge, onFetchChallenge } from '~/store/challenge';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);
  const challenge = useSelector((state: AppState) => state.challenge);
  const workout = useSelector((state: AppState) => state.workout);

  React.useEffect(() => {
    if (user && user.challenge && !challenge.challenge) {
      onFetchChallenge(dispatch, user.challenge);
    }
  }, []);

  const handleAddChallenge = (): void => {
    if (!user) return;
    onAddChallenge(dispatch);
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
