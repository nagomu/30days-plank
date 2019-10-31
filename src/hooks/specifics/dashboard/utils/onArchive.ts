import { Dispatch } from 'redux';

import { Challenge, onArchiveChallenge } from '~/store/challenge';

export const onArchive = (
  dispatch: Dispatch,
  uid?: string,
  challenge?: Challenge,
): void => {
  if (!uid || !challenge) {
    throw new Error('Could not execute onArchive');
  }

  onArchiveChallenge(dispatch, uid, challenge);

  return;
};
