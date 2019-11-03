import { workoutTemplate } from '~/config';
import { timestampFromDate } from '~/services/firestore';
import { WorkoutTemplate } from '~/store/workout';

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
