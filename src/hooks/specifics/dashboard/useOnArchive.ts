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
  const { challenge } = useSelector((state: AppState) => state.challenge);
  const workouts = challenge ? challenge.workouts : undefined;

  return {
    isExpired: isExpired(workouts),
    onArchive: (): void => onArchive(dispatch, challenge),
  };
};
