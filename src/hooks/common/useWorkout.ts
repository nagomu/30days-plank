import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppState } from '~/store';
import { onFetchChallenge } from '~/store/challenge';
import { Workout } from '~/store/workout';

type UseWorkout = {
  isLoading: boolean;
  workout?: Workout;
};

export const useWorkout = (): UseWorkout => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    challenge,
    isAuthenticating,
    isChallengeLoading,
    isWorkoutLoading,
    user,
  } = useSelector((state: AppState) => ({
    user: state.auth.user,
    isAuthenticating: state.auth.isLoading,
    challenge: state.challenge.challenge,
    isChallengeLoading: state.challenge.isLoading,
    isWorkoutLoading: state.workout.isLoading,
  }));

  useEffect(() => {
    if (user && !challenge) onFetchChallenge(dispatch, user.uid);
  }, []);

  const isLoading =
    isAuthenticating !== false ||
    isChallengeLoading !== false ||
    isWorkoutLoading !== false;

  const workout =
    challenge && challenge.workouts
      ? challenge.workouts.find(w => w.id === id)
      : undefined;

  return {
    isLoading,
    workout,
  };
};
