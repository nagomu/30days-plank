import { Workout } from '~/store/workout';
import { timestampFromDate } from '~/utils/firebase';

export const mockWorkouts = (): Workout[] => {
  const arr = Array.from(Array(30), (_v, k) => k + 1);
  return arr.map(i => ({
    id: `${i}`,
    isCompleted: true,
    isRest: i === 6 || i === 13 || i === 19 || i === 26,
    menu: 20,
    scheduledDate: timestampFromDate(new Date(2019, 9, i)),
    title: i === 6 || i === 13 || i === 19 || i === 26 ? 'REST' : `Day ${i}`,
  }));
};
