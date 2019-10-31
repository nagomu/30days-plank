import { Workout } from '~/store/workout';

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
