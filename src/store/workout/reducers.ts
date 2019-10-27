import { WorkoutActionTypes, WorkoutState } from '~/store/workout';
import firebase from '~/utils/firebase';

// TODO
export const initialState: WorkoutState = {
  isLoading: false,
  workout: {
    id: '1',
    isCompleted: false,
    isRest: false,
    menu: 20,
    pathname: '/dashboard',
    scheduledDate: firebase.firestore.Timestamp.fromDate(new Date()),
    title: 'Day 1',
  },
};

// TODO
export const workoutReducer = (
  state = initialState,
  action: WorkoutActionTypes,
): WorkoutState => {
  switch (action.type) {
    default:
      return state;
  }
};
