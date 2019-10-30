import { Workout } from '~/store/workout';

export const calculateRate = (workouts: Workout[]): number => {
  const completed = workouts.filter(w => w.isCompleted === true);
  return Math.round((completed.length / workouts.length) * 100);
};
