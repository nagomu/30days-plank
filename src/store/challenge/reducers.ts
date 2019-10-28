import {
  ADD_CHALLENGE,
  ADD_CHALLENGE_SUCCESS,
  ChallengeActionTypes,
  ChallengeState,
  FETCH_CHALLENGE,
  SET_CHALLENGE,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
} from '~/store/challenge';

export const initialState: ChallengeState = {
  payload: undefined,
  isLoading: undefined,
};

export const challengeReducer = (
  state = initialState,
  action: ChallengeActionTypes,
): ChallengeState => {
  switch (action.type) {
    case SET_CHALLENGE:
      return {
        ...state,
        isLoading: false,
        payload: action.payload.challenge,
      };
    case ADD_CHALLENGE_SUCCESS:
    case UPDATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_CHALLENGE:
    case FETCH_CHALLENGE:
    case UPDATE_CHALLENGE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
