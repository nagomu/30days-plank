import timekeeper from 'timekeeper';

import { workoutFactory } from '~/factories/workoutFactory';
import { generateTitle } from '~/utils';

describe('generateTitle', () => {
  const mockToday = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
  timekeeper.freeze(mockToday);

  it('returns title correctly', () => {
    expect(generateTitle(workoutFactory(mockToday))).toEqual(
      'Oct 1, 2019 - Oct 30, 2019',
    );
  });

  timekeeper.reset();
});
