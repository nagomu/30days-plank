import { Dispatch } from 'redux';

import { default as templates } from '~/config/workouts';
import addErrorToFireStore from '~/services/firebase/addErrorToFirestore';
import { onAddArchive } from '~/store/archive';
import {
  ADD_CHALLENGE,
  ADD_CHALLENGE_SUCCESS,
  AddChallengeParams,
  Challenge,
  ChallengeActionTypes,
  FETCH_CHALLENGE,
  SET_CHALLENGE,
  SET_PARTIAL_WORKOUT,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
  UpdateChallengeParams,
} from '~/store/challenge';
import { onFetchAllWorkouts, Workout } from '~/store/workout';
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  timestampFromDate,
} from '~/utils/firebase';
import { challenges, workouts } from '~/utils/firestore/collections';

export const fetchChallenge = (): ChallengeActionTypes => ({
  type: FETCH_CHALLENGE,
});

export const setChallenge = (challenge?: Challenge): ChallengeActionTypes => ({
  type: SET_CHALLENGE,
  payload: { challenge },
});

export const setPartialWorkout = (workout: Workout): ChallengeActionTypes => ({
  type: SET_PARTIAL_WORKOUT,
  payload: { workout },
});

export const addChallenge = (): ChallengeActionTypes => ({
  type: ADD_CHALLENGE,
});

export const addChallengeSuccess = (): ChallengeActionTypes => ({
  type: ADD_CHALLENGE_SUCCESS,
});

export const updateChallenge = (): ChallengeActionTypes => ({
  type: UPDATE_CHALLENGE,
});

export const updateChallengeSuccess = (): ChallengeActionTypes => ({
  type: UPDATE_CHALLENGE_SUCCESS,
});

export const onFetchChallenge = async (
  dispatch: Dispatch,
  uid: string,
): Promise<void> => {
  dispatch(fetchChallenge());

  try {
    const snapshot: QuerySnapshot = await challenges(uid)
      .orderBy('createdAt', 'desc')
      .where('isActive', '==', true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      dispatch(setChallenge(undefined));
      return;
    }

    /*
      NOTE: Here forEach is used.
      However, if this is the case, this process is performed only once.
      Because `limit = 1` is specified in Query.
    */
    snapshot.forEach((doc: QueryDocumentSnapshot): void => {
      const challenge = {
        id: doc.id,
        ...doc.data(),
      };

      dispatch(setChallenge(challenge as Challenge));
      onFetchAllWorkouts(dispatch, uid, challenge as Challenge);
    });
  } catch (error) {
    addErrorToFireStore(error);
  }
  return;
};

export const onAddChallenge = async (
  dispatch: Dispatch,
  uid: string,
  challenge: AddChallengeParams,
): Promise<void> => {
  dispatch(addChallenge());

  try {
    const ref = await challenges(uid).add(challenge);
    dispatch(addChallengeSuccess());
    const snapshot = await ref.get();
    if (snapshot.exists) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const date = now.getDate();

      const _templates = templates.map((template, i) => ({
        ...template,
        scheduledDate: timestampFromDate(new Date(year, month, date + i)),
      }));
      _templates.forEach(
        async params => await workouts(uid, snapshot.id).add(params),
      );
    }
    onFetchChallenge(dispatch, uid);
  } catch (error) {
    addErrorToFireStore(error);
  }
  return;
};

export const onUpdateChallenge = async (
  dispatch: Dispatch,
  uid: string,
  challenge: UpdateChallengeParams,
): Promise<void> => {
  dispatch(updateChallenge());

  try {
    await challenges(uid)
      .doc(challenge.id)
      .update(challenge);

    dispatch(updateChallengeSuccess());
    onFetchChallenge(dispatch, uid);
  } catch (error) {
    addErrorToFireStore(error);
  }
  return;
};

export const onArchiveChallenge = async (
  dispatch: Dispatch,
  uid: string,
  challenge: Challenge,
): Promise<void> => {
  try {
    const updateParams: UpdateChallengeParams = {
      id: challenge.id,
      description: '',
      isActive: false,
    };

    await onUpdateChallenge(dispatch, uid, updateParams);
    await onAddArchive(dispatch, uid, challenge.id, challenge.workouts);
    onFetchChallenge(dispatch, uid);
  } catch (error) {
    addErrorToFireStore(error);
  }
  return;
};
