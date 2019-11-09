import timekeeper from 'timekeeper';

import { workoutsFactory } from '~/factories/workoutFactory';
import {
  isExpired,
  useOnArchive,
} from '~/hooks/specifics/dashboard/useOnArchive';
import { mockStore, timestamp, withHook } from '~/utils';

describe('useOnArchive', () => {
  it('returns correct values if initial state', () => {
    const state = {
      auth: {
        user: undefined,
        isLoading: undefined,
      },
      challenge: {
        challenge: undefined,
        isLoading: undefined,
      },
    };
    const store = mockStore(state);
    const hook = withHook(useOnArchive, store);

    expect(hook.isExpired).toEqual(false);
    expect(hook.onArchive).toThrowError();
  });

  it('returns correct values if valid state', () => {
    const mockToday = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const state = {
      auth: {
        user: {
          uid: 'xxx',
        },
        isLoading: false,
      },
      challenge: {
        challenge: {
          id: 'xxx',
          isActive: true,
          workouts: workoutsFactory(),
          createdAt: timestamp(new Date()),
        },
        isLoading: false,
      },
    };

    const store = mockStore(state);
    const hook = withHook(useOnArchive, store);
    expect(hook.isExpired).toEqual(true);
    expect(hook.onArchive).not.toThrowError();

    timekeeper.reset();
  });
});

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

    const workouts = workoutsFactory();
    expect(isExpired(workouts)).toEqual(true);

    timekeeper.reset();
  });

  it('returns "that today is before the due date" correctly', () => {
    const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);

    const workouts = workoutsFactory();
    expect(isExpired(workouts)).toEqual(false);

    timekeeper.reset();
  });
});
