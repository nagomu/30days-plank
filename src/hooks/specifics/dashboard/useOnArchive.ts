import { useDispatch, useSelector } from 'react-redux';

import { isExpired } from '~/hooks/specifics/dashboard/utils/isExpired';
import { onArchive } from '~/hooks/specifics/dashboard/utils/onArchive';
import { AppState } from '~/store';

type useOnArchive = {
  isExpired: boolean;
  onArchive: () => void;
};

export const useOnArchive = (): useOnArchive => {
  const dispatch = useDispatch();
  const { auth, challenge } = useSelector((state: AppState) => ({
    auth: state.auth,
    challenge: state.challenge,
  }));

  const uid = auth.user ? auth.user.uid : undefined;
  const workouts = challenge.challenge
    ? challenge.challenge.workouts
    : undefined;

  return {
    isExpired: isExpired(workouts),
    onArchive: (): void => onArchive(dispatch, uid, challenge.challenge),
  };
};