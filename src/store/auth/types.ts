import { User } from '~/types';

export type AuthState = {
  user?: User;
  isLoading?: boolean;
};

export type AuthActions = {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
};

export const OBSERVE_AUTH_STATE_CHANGED = 'OBSERVE_AUTH_STATE_CHANGED';
export type ObserveAuthStateChangedAction = {
  type: typeof OBSERVE_AUTH_STATE_CHANGED;
};

export const AUTH_STATE_CHANGED = 'AUTH_STATE_CHANGED';
export type AuthStateChangedAction = {
  type: typeof AUTH_STATE_CHANGED;
};

export const FETCH_USER = 'FETCH_USER';
export type FetchUserAction = {
  type: typeof FETCH_USER;
};

export const SET_USER = 'SET_USER';
export type SetUserAction = {
  type: typeof SET_USER;
  payload: {
    user?: User;
  };
};

export const ADD_USER = 'ADD_USER';
export type AddUserAction = {
  type: typeof ADD_USER;
};

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export type AddUserSuccessAction = {
  type: typeof ADD_USER_SUCCESS;
};

export const SIGN_IN = 'SIGN_IN';
export type SignInAction = {
  type: typeof SIGN_IN;
};

export const SIGN_OUT = 'SIGN_OUT';
export type SignOutAction = {
  type: typeof SIGN_OUT;
};

export type AuthActionTypes =
  | ObserveAuthStateChangedAction
  | AuthStateChangedAction
  | FetchUserAction
  | SetUserAction
  | AddUserAction
  | AddUserSuccessAction
  | SignInAction
  | SignOutAction;
