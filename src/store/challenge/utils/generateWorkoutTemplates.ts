import { workoutTemplate } from '~/config/workouts';
import { WorkoutTemplate } from '~/store/workout';
import { timestampFromDate } from '~/utils/firebase';

export const generateWorkoutTemplates = (): WorkoutTemplate[] => {
  const now = new Date(Date.now());
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  return workoutTemplate.map((template, i) => ({
    ...template,
    scheduledDate: timestampFromDate(new Date(year, month, date + i)),
  }));
};
