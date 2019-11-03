import { Dispatch } from 'redux';

import { currentUser } from '~/services/firebase';
import { Challenge, onArchiveChallenge } from '~/store/challenge';

export const onArchive = (dispatch: Dispatch, challenge?: Challenge): void => {
  const uid = currentUser();
  if (!uid || !challenge) {
    throw new Error('Could not execute onArchive');
  }

  onArchiveChallenge(dispatch, challenge);

  return;
};
