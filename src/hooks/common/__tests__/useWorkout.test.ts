import { useWorkout } from '~/hooks/common/useWorkout';
import { timestampFromDate } from '~/utils/firebase';
import { mockWorkouts } from '~/utils/mocks/mockWorkouts';
import { mockStore, withHook } from '~/utils/testHelpers';

type useParams = {
  id: string;
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): useParams => ({ id: '1' }),
}));
jest.mock('~/services/firebase/fetchAllWorkoutsFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);
jest.mock('~/services/firebase/updateWorkoutToFirestore', () =>
  jest.fn().mockReturnValue(''),
);

describe('useWorkout', () => {
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
      workout: {
        isLoading: undefined,
      },
    };
    const store = mockStore(state);
    const hook = withHook(useWorkout, store);

    expect(hook.workout).toEqual(undefined);
    expect(hook.isLoading).toEqual(true);
    expect(hook.onUpdate).toThrowError();
  });

  it('returns correct values if loading finished', () => {
    const state = {
      auth: {
        user: undefined,
        isLoading: false,
      },
      challenge: {
        challenge: undefined,
        isLoading: false,
      },
      workout: {
        isLoading: false,
      },
    };
    const store = mockStore(state);
    const hook = withHook(useWorkout, store);

    expect(hook.isLoading).toEqual(false);
  });

  it('returns correct values if onFetchChallenge succeeds', () => {
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
      workout: {
        isLoading: false,
      },
    };

    const store = mockStore(state);
    const hook = withHook(useWorkout, store);
    const expected = state.challenge.challenge.workouts[0];
    expect(hook.workout).toEqual(expected);
    expect(hook.onUpdate).not.toThrowError();
  });
});