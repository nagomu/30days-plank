import { combineReducers, compose, createStore } from 'redux';

import config from '~/config';
import { archiveReducer, initialState as archive } from '~/store/archive';
import { authReducer, initialState as auth } from '~/store/auth';
import { challengeReducer, initialState as challenge } from '~/store/challenge';
import { initialState as workout, workoutReducer } from '~/store/workout';

const initialState = {
  archive,
  auth,
  challenge,
  workout,
};

const reducer = combineReducers({
  archive: archiveReducer,
  auth: authReducer,
  challenge: challengeReducer,
  workout: workoutReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const enhancer =
  config.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = typeof initialState;
export const store = createStore(reducer, initialState, enhancer());
