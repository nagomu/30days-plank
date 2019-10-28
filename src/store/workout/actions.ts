import { Dispatch } from 'redux';

import addWorkoutsToFirestore from '~/services/firebase/addWorkoutsToFirestore';
import fetchAllWorkoutsFromFirestore from '~/services/firebase/fetchAllWorkoutsFromFirestore';
import updateWorkoutToFirestore from '~/services/firebase/updateWorkoutToFirestore';
import { Challenge, setChallenge } from '~/store/challenge';
import {
  ADD_WORKOUT,
  ADD_WORKOUT_SUCCESS,
  FETCH_ALL_WORKOUTS,
  FETCH_ALL_WORKOUTS_SUCCESS,
  SET_WORKOUT,
  UPDATE_WORKOUT,
  UPDATE_WORKOUT_SUCCESS,
  UpdateWorkoutParams,
  Workout,
  WorkoutActionTypes,
} from '~/store/workout';
import { QueryDocumentSnapshot, QuerySnapshot } from '~/utils/firebase';

export const fetchAllWorkouts = (): WorkoutActionTypes => ({
  type: FETCH_ALL_WORKOUTS,
});

export const fetchAllWorkoutsSuccess = (): WorkoutActionTypes => ({
  type: FETCH_ALL_WORKOUTS_SUCCESS,
});

export const setWorkout = (): WorkoutActionTypes => ({
  type: SET_WORKOUT,
});

export const addWorkout = (): WorkoutActionTypes => ({
  type: ADD_WORKOUT,
});

export const addWorkoutSuccess = (): WorkoutActionTypes => ({
  type: ADD_WORKOUT_SUCCESS,
});

export const updateWorkout = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT,
});

export const updateWorkoutSuccess = (): WorkoutActionTypes => ({
  type: UPDATE_WORKOUT_SUCCESS,
});

export const onFetchAllWorkouts = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  dispatch(fetchAllWorkouts());

  try {
    const snapshot: QuerySnapshot = await fetchAllWorkoutsFromFirestore(
      uid,
      challenge.id,
    );
    dispatch(fetchAllWorkoutsSuccess());
    if (snapshot.empty) return;

    dispatch(setWorkout());
    const workouts: Workout[] = [];
    snapshot.forEach((doc: QueryDocumentSnapshot): void => {
      const workout = {
        id: doc.id,
        ...doc.data(),
      };
      workouts.push(workout as Workout);
    });

    const params = {
      ...challenge,
      workouts: workouts.length < 1 ? challenge.workouts : workouts,
    };
    dispatch(setChallenge(params));
  } catch (error) {
    // FIXME / TODO: Add error handling
    console.error('Error: fetchAllWorkoutsFromFirestore');
  }
  return;
};

export const onAddWorkouts = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  dispatch(addWorkout());

  try {
    await addWorkoutsToFirestore(uid, challenge.id);
    dispatch(addWorkoutSuccess());
    onFetchAllWorkouts(dispatch, uid, challenge);
  } catch (error) {
    // FIXME / TODO: Add error handling
    console.error('Error: onAddWorkouts');
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
    await updateWorkoutToFirestore(uid, challenge.id, workout);
    dispatch(updateWorkoutSuccess());
    onFetchAllWorkouts(dispatch, uid, challenge);
  } catch (error) {
    // FIXME / TODO: Add error handling
    console.error('Error: onUpdateWorkout');
  }
  return;
};
