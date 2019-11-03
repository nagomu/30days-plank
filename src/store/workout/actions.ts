import { Dispatch } from 'redux';

import { QueryDocumentSnapshot, QuerySnapshot } from '~/services/firebase';
import { postError, timestampFromDate, workouts } from '~/services/firestore';
import {
  Challenge,
  onFetchChallenge,
  setChallenge,
  setPartialWorkout,
} from '~/store/challenge';
import {
  FETCH_ALL_WORKOUTS,
  FETCH_ALL_WORKOUTS_SUCCESS,
  FETCH_WORKOUT,
  FETCH_WORKOUT_SUCCESS,
  SET_WORKOUT,
  UPDATE_WORKOUT,
  UPDATE_WORKOUT_SUCCESS,
  UpdateWorkoutParams,
  Workout,
  WorkoutActionTypes,
} from '~/store/workout';

export const fetchWorkout = (): WorkoutActionTypes => ({
  type: FETCH_WORKOUT,
});

export const fetchWorkoutSuccess = (): WorkoutActionTypes => ({
  type: FETCH_WORKOUT_SUCCESS,
});

export const fetchAllWorkouts = (): WorkoutActionTypes => ({
  type: FETCH_ALL_WORKOUTS,
});

export const fetchAllWorkoutsSuccess = (): WorkoutActionTypes => ({
  type: FETCH_ALL_WORKOUTS_SUCCESS,
});

export const setWorkout = (): WorkoutActionTypes => ({
  type: SET_WORKOUT,
});

export const updateWorkout = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT,
});

export const updateWorkoutSuccess = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT_SUCCESS,
});

export const onFetchWorkout = async (
  dispatch: Dispatch,
  uid: string,
  challengeId: string,
  workoutId: string,
): Promise<void> => {
  dispatch(fetchWorkout());

  try {
    const doc = await workouts(uid, challengeId)
      .doc(workoutId)
      .get();
    dispatch(fetchWorkoutSuccess());

    const data = doc.data();
    if (!data) return;
    const workout = {
      id: doc.id,
      ...data,
    } as Workout;

    dispatch(setPartialWorkout(workout));
    dispatch(setWorkout());
    return;
  } catch (error) {
    postError(error);
  }
};

export const onFetchAllWorkouts = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  dispatch(fetchAllWorkouts());

  try {
    const snapshot: QuerySnapshot = await workouts(uid, challenge.id)
      .orderBy('scheduledDate', 'asc')
      .get();
    dispatch(fetchAllWorkoutsSuccess());
    if (snapshot.empty) return;

    dispatch(setWorkout());
    const results: Workout[] = [];
    snapshot.forEach((doc: QueryDocumentSnapshot): void => {
      const workout = {
        id: doc.id,
        ...doc.data(),
      };
      results.push(workout as Workout);
    });

    const params = {
      ...challenge,
      workouts: results.length < 1 ? challenge.workouts : results,
    };
    dispatch(setChallenge(params));
  } catch (error) {
    postError(error);
  }
  return;
};

export const onUpdateWorkout = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
  workout: UpdateWorkoutParams,
): Promise<void> => {
  dispatch(updateWorkout());

  try {
    const { id, isCompleted } = workout;
    const params = {
      isCompleted,
      updatedAt: timestampFromDate(new Date()),
    };
    await workouts(uid, challenge.id)
      .doc(id)
      .update(params);
    dispatch(updateWorkoutSuccess());
    await onFetchWorkout(dispatch, uid, challenge.id, workout.id);
    onFetchChallenge(dispatch, uid);
  } catch (error) {
    postError(error);
  }
  return;
};
