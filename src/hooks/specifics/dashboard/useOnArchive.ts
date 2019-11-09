import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { currentUser } from '~/services/firebase';
import { AppState } from '~/store';
import { onArchiveChallenge } from '~/store/challenge';
import { Challenge, Workout } from '~/types';

type useOnArchive = {
  isExpired: boolean;
  onArchive: () => void;
};

export const isExpired = (workouts?: Workout[]): boolean => {
  if (!workouts) return false;

  const today = new Date(Date.now());
  const lastDay = workouts[workouts.length - 1].scheduledDate.toDate();

  const formattedDate = (date: Date): number => {
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const dd = `${date.getDate()}`.padStart(2, '0');
    return parseInt(`${yyyy}${mm}${dd}`);
  };

  return formattedDate(lastDay) < formattedDate(today);
};

export const onArchive = (dispatch: Dispatch, challenge?: Challenge): void => {
  const uid = currentUser();
  if (!uid || !challenge) {
    throw new Error('Could not execute onArchive');
  }

  onArchiveChallenge(dispatch, challenge);

  return;
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
