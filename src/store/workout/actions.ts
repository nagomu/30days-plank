import { Dispatch } from 'redux';

import { postError } from '~/services/firebase/error';
import * as WorkoutService from '~/services/firebase/workout';
import { setChallenge, setPartialWorkout } from '~/store/challenge';
import {
  FETCH_WORKOUTS,
  FETCH_WORKOUTS_SUCCESS,
  UPDATE_WORKOUT,
  UPDATE_WORKOUT_SUCCESS,
  UpdateWorkoutParams,
  WorkoutActionTypes,
} from '~/store/workout';
import { Challenge } from '~/types';
import { isEmptyArray } from '~/utils';

export const fetchWorkouts = (): WorkoutActionTypes => ({
  type: FETCH_WORKOUTS,
});

export const fetchWorkoutsSuccess = (): WorkoutActionTypes => ({
  type: FETCH_WORKOUTS_SUCCESS,
});

export const updateWorkout = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT,
});

export const updateWorkoutSuccess = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT_SUCCESS,
});

export const onFetchWorkouts = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  dispatch(fetchWorkouts());

  try {
    const results = await WorkoutService.fetchWorkouts(uid, challenge.id);
    dispatch(fetchWorkoutsSuccess());
    const params = {
      ...challenge,
      workouts: isEmptyArray(results) ? challenge.workouts : results,
    };
    dispatch(setChallenge(params));
  } catch (error) {
    postError(error);
  }
};

export const onUpdateWorkout = async (
  dispatch: Dispatch,
  uid: string,
  cid: string,
  workout: UpdateWorkoutParams,
): Promise<void> => {
  dispatch(updateWorkout());

  try {
    const result = await WorkoutService.updateWorkout(uid, cid, workout);
    dispatch(updateWorkoutSuccess());
    if (result) dispatch(setPartialWorkout(result));
  } catch (error) {
    postError(error);
  }
};
