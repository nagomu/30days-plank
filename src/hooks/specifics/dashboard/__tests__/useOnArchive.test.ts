import timekeeper from 'timekeeper';

import { useOnArchive } from '~/hooks/specifics/dashboard/useOnArchive';
import { timestampFromDate } from '~/utils/firebase';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore, withHook } from '~/utils/testHelpers';

// TODO: Add more better mock
jest.mock('~/services/firebase/fetchChallengeFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);
jest.mock('~/services/firebase/updateChallengeToFirestore');
jest.mock('~/services/firebase/addArchiveToFirestore', () =>
  jest.fn().mockReturnValue(Promise.resolve()),
);
// TODO: Add more better mock
jest.mock('~/services/firebase/fetchArchivesFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);

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
          workouts: mockWorkouts(),
          createdAt: timestampFromDate(new Date()),
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
