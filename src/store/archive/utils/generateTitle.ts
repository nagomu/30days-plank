import { Workout } from '~/store/workout';
import { formatUS } from '~/utils/datetime';

export const generateTitle = (workouts: Workout[]): string => {
  const firstDate = workouts[0].scheduledDate;
  const lastDate = workouts[workouts.length - 1].scheduledDate;
  return `${formatUS(firstDate)} - ${formatUS(lastDate)}`;
};
