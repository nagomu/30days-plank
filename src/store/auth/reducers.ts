import {
  ADD_USER,
  ADD_USER_SUCCESS,
  AUTH_STATE_CHANGED,
  AuthActionTypes,
  AuthState,
  FETCH_USER,
  OBSERVE_AUTH_STATE_CHANGED,
  SET_USER,
  SIGN_IN,
  SIGN_OUT,
} from '~/store/auth';

export const initialState: AuthState = {
  user: undefined,
  isLoading: undefined,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case ADD_USER_SUCCESS:
    case AUTH_STATE_CHANGED:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_USER:
    case FETCH_USER:
    case OBSERVE_AUTH_STATE_CHANGED:
    case SIGN_IN:
    case SIGN_OUT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
