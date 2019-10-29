import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppState } from '~/store';
import { onFetchChallenge } from '~/store/challenge';
import { onUpdateWorkout, UpdateWorkoutParams, Workout } from '~/store/workout';

type UseWorkout = {
  isLoading: boolean;
  workout?: Workout;
  onUpdate: (params: UpdateWorkoutParams) => void;
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

  const onUpdate = (params: UpdateWorkoutParams): void => {
    if (!user || !challenge || !workout) {
      throw new Error('Could not execute onUpdateWorkout');
    }
    onUpdateWorkout(dispatch, user.uid, challenge, params);
    return;
  };

  return {
    isLoading,
    workout,
    onUpdate,
  };
};