import { Workout, WorkoutTemplate } from '~/types';
import { timestamp } from '~/utils';

const menus = [
  20,
  20,
  30,
  30,
  40,
  0,
  45,
  45,
  60,
  60,
  60,
  90,
  0,
  90,
  90,
  120,
  120,
  150,
  0,
  150,
  150,
  180,
  180,
  210,
  210,
  0,
  240,
  240,
  270,
  300,
];

export const workoutTemplateFactory = (now: Date): WorkoutTemplate[] => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const ts = timestamp(now);

  return menus.map((menu, i) => ({
    title: menu === 0 ? 'Rest' : `Day ${i + 1}`,
    menu,
    date: timestamp(new Date(year, month, date + i, 0, 0, 0)),
    isCompleted: false,
    isRest: menu === 0,
    createdAt: ts,
    updatedAt: ts,
  }));
};

export const workoutFactory = (now?: Date): Workout[] =>
  workoutTemplateFactory(now || new Date()).map((w, i) => ({
    ...w,
    id: `${i + 1}`,
  }));
