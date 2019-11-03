import { Dispatch } from 'redux';

import { QueryDocumentSnapshot, QuerySnapshot } from '~/services/firebase';
import {
  batchChallenges,
  challenges,
  postError,
  workouts,
} from '~/services/firestore';
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
import { generateWorkoutTemplates } from '~/store/challenge/utils/generateWorkoutTemplates';
import { onFetchAllWorkouts, Workout } from '~/store/workout';

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
    postError(error);
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
    const { batch, ref } = batchChallenges(uid);
    const cid = ref.doc().id;
    batch.set(ref.doc(cid), challenge);
    generateWorkoutTemplates().forEach(params => {
      const wref = workouts(uid, cid);
      const wid = wref.doc().id;
      batch.set(wref.doc(wid), params);
    });

    await batch.commit();
    dispatch(addChallengeSuccess());
    await onFetchChallenge(dispatch, uid);
  } catch (error) {
    postError(error);
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
    postError(error);
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
    postError(error);
  }
  return;
};
