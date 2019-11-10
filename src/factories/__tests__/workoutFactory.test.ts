import timekeeper from 'timekeeper';

import { workoutTemplateFactory } from '~/factories/workoutFactory';

const now = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
timekeeper.freeze(now);

describe('workoutTemplateFactory', () => {
  it('returns WorkoutTemplate[] correctly', () => {
    const formatDate = (value: Date): string => {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      const date = value.getDate();
      return `${year}/${month}/${date}`;
    };

    const templates = workoutTemplateFactory(now);
    const first = templates[0];
    const last = templates[29];

    expect(first.title).toEqual('Day 1');
    expect(formatDate(first.date.toDate())).toEqual('2019/10/1');
    expect(last.title).toEqual('Day 30');
    expect(formatDate(last.date.toDate())).toEqual('2019/10/30');
  });
});

timekeeper.reset();
