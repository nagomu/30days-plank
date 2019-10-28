import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import WrappedComponent from '~/containers/specifics/workout/WorkoutTimer';
import { AppState } from '~/store';
import { onFetchChallenge } from '~/store/challenge';
import { Workout } from '~/store/workout';

const Workout: React.FC<
  RouteComponentProps<{ id: string; challengeId: string }>
> = props => {
  const dispatch = useDispatch();
  const { params } = props.match;
  const { user } = useSelector((state: AppState) => state.auth);
  const { challenge } = useSelector((state: AppState) => state.challenge);
  const workout = useSelector((state: AppState) => state.workout);

  React.useEffect(() => {
    if (user && !challenge) {
      onFetchChallenge(dispatch, user.uid);
    }
  }, []);

  if (!user || !challenge) return null;

  const workoutProps = challenge.workouts.find(w => w.id === params.id);

  if (!workoutProps) return null;

  return <WrappedComponent {...workoutProps} {...workout} />;
};

export default Workout;
