jest.mock('~/services/firebase/addChallengeToFirestore', () =>
  jest.fn().mockReturnValue({
    exists: true,
    get: () => jest.fn().mockReturnValue({ exists: true }),
  }),
);

// TODO: Add more better mock
jest.mock('~/services/firebase/fetchChallengeFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);

jest.mock('~/services/firebase/updateChallengeToFirestore');

jest.mock('~/services/firebase/setUserToFirestore');

jest.mock('~/services/firebase/fetchUserFromFirestore', () =>
  jest
    .fn()
    .mockReturnValueOnce({
      exists: true,
      data: () => ({ uid: 'xxx' }),
    })
    .mockReturnValueOnce({
      exists: false,
      data: () => undefined,
    }),
);

jest.mock('~/services/firebase/addWorkoutsToFirestore', () =>
  jest.fn().mockReturnValue(Promise.resolve()),
);

jest.mock('~/services/firebase/fetchWorkoutFromFirestore', () =>
  jest.fn().mockReturnValue({ data: jest.fn() }),
);

jest.mock('~/services/firebase/fetchAllWorkoutsFromFirestore', () =>
  jest.fn().mockReturnValue({ empty: true }),
);

jest.mock('~/services/firebase/updateWorkoutToFirestore', () =>
  jest.fn().mockReturnValue(''),
);
