import {
  ADD_CHALLENGE,
  ADD_CHALLENGE_SUCCESS,
  ChallengeActionTypes,
  ChallengeState,
  FETCH_CHALLENGE,
  SET_CHALLENGE,
  SET_PARTIAL_WORKOUT,
  UPDATE_CHALLENGE,
  UPDATE_CHALLENGE_SUCCESS,
} from '~/store/challenge';

export const initialState: ChallengeState = {
  challenge: undefined,
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
        challenge: action.payload.challenge,
      };
    case SET_PARTIAL_WORKOUT:
      return {
        ...state,
        isLoading: false,
        challenge: state.challenge
          ? {
              ...state.challenge,
              workouts: [...state.challenge.workouts, action.payload.workout],
            }
          : undefined,
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
