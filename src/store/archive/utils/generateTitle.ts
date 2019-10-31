import { Workout } from '~/store/workout';

export const generateTitle = (workouts: Workout[]): string => {
  const firstDate = workouts[0].scheduledDate.toDate();
  const lastDate = workouts[workouts.length - 1].scheduledDate.toDate();

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formateDate = (date: Date): string =>
    new Intl.DateTimeFormat('en-US', options).format(date);

  return `${formateDate(firstDate)} - ${formateDate(lastDate)}`;
};
