import { Dispatch } from 'redux';
import timekeeper from 'timekeeper';

import addChallengeToFirestore from '~/services/firebase/addChallengeToFirestore';
import fetchChallengeFromFirestore from '~/services/firebase/fetchChallengeFromFirestore';
import updateChallengeToFirestore from '~/services/firebase/updateChallengeToFirestore';
import {
  ADD_CHALLENGE,
  ADD_CHALLENGE_SUCCESS,
  AddChallengeParams,
  Challenge,
  ChallengeActionTypes,
  FETCH_CHALLENGE,
  SET_CHALLENGE,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
  UpdateChallengeParams,
} from '~/store/challenge';
import { QueryDocumentSnapshot, QuerySnapshot } from '~/utils/firebase';

export const fetchChallenge = (): ChallengeActionTypes => ({
  type: FETCH_CHALLENGE,
});

export const setChallenge = (challenge?: Challenge): ChallengeActionTypes => ({
  type: SET_CHALLENGE,
  payload: { challenge },
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
    const snapshot: QuerySnapshot = await fetchChallengeFromFirestore(uid);
    if (snapshot.empty) return;

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
    });
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: fetchChallengeFromFirestore');
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
    await addChallengeToFirestore(uid, challenge);
    dispatch(addChallengeSuccess());
    onFetchChallenge(dispatch, uid);
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: addChallengeToFirestore');
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
    await updateChallengeToFirestore(uid, challenge);
    dispatch(updateChallengeSuccess());
    onFetchChallenge(dispatch, uid);
  } catch {
    // FIXME / TODO: Add error handling
    console.error('Error: setChallengeToFirestore');
  }
  return;
};

timekeeper.reset();
