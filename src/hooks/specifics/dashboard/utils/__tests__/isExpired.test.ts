import timekeeper from 'timekeeper';

import { isExpired } from '~/hooks/specifics/dashboard/utils/isExpired';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';

describe('isExpired', () => {
  it('returns "false" correctly if `workouts` is undefined', () => {
    const mockToday = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    expect(isExpired(undefined)).toEqual(false);

    timekeeper.reset();
  });

  it('returns "expired" correctly', () => {
    const mockToday = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const workouts = mockWorkouts();
    expect(isExpired(workouts)).toEqual(true);

    timekeeper.reset();
  });

  it('returns "that today is before the due date" correctly', () => {
    const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const workouts = mockWorkouts();
    expect(isExpired(workouts)).toEqual(false);

    timekeeper.reset();
  });
});
