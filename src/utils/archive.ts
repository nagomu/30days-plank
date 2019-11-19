import { Workout } from '~/types';
import { formatUS } from '~/utils';

export const generateTitle = (workouts: Workout[]): string => {
  const firstDate = workouts[0].date;
  const lastDate = workouts[workouts.length - 1].date;
  return `${formatUS(firstDate)} - ${formatUS(lastDate)}`;
};
