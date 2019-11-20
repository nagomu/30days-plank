import timekeeper from 'timekeeper';

import { workoutFactory } from '~/factories/workoutFactory';
import {
  isExpired,
  useOnArchive,
} from '~/hooks/specifics/dashboard/useOnArchive';
import { mockStore, withHook } from '~/utils/testHelpers';

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

    hook.onArchive();
  });

  it('returns correct values if valid state', () => {
    const today = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(today);
    const factory = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));

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
          workouts: workoutFactory(factory),
        },
        isLoading: false,
      },
    };

    const store = mockStore(state);
    const hook = withHook(useOnArchive, store);
    expect(hook.isExpired).toEqual(true);

    timekeeper.reset();
  });
});

describe('isExpired', () => {
  it('returns "false" correctly if `workouts` is undefined', () => {
    const today = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(today);

    expect(isExpired(undefined)).toEqual(false);

    timekeeper.reset();
  });

  it('returns "expired" correctly', () => {
    const today = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
    timekeeper.freeze(today);
    const factory = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));
    expect(isExpired(workoutFactory(factory))).toEqual(true);

    timekeeper.reset();
  });

  it('returns "that today is before the due date" correctly', () => {
    const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
    timekeeper.freeze(mockToday);
    expect(isExpired(workoutFactory())).toEqual(false);

    timekeeper.reset();
  });
});
