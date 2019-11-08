import {
  currentUser,
  onAuthStateChanged,
  signIn,
  signOut,
} from '~/services/firebase/auth';

const mockAuth = jest.fn();

/* eslint-disable */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      auth: () => mockAuth(),
    },
  }),
);
/* eslint-enable */

describe('currentUser', () => {
  it('returns uid if authenticated', () => {
    mockAuth.mockReturnValue({ currentUser: { uid: 'uid' } });
    const expected = 'uid';
    expect(currentUser()).toEqual(expected);
  });

  it('returns uid if unauthenticated', () => {
    mockAuth.mockReturnValue({ currentUser: null });
    const expected = null;
    expect(currentUser()).toEqual(expected);
  });
});

describe('onAuthStateChanged', () => {
  it('returns user if authenticated', async () => {
    mockAuth.mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAuthStateChanged: (nextOrObserver: any) => {
        nextOrObserver({ uid: 'uid' });
      },
    });
    const expected = { uid: 'uid' };
    expect(await onAuthStateChanged()).toEqual(expected);
  });

  it('returns uid if unauthenticated', async () => {
    mockAuth.mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAuthStateChanged: (nextOrObserver: any) => {
        nextOrObserver(null);
      },
    });
    const expected = null;
    expect(await onAuthStateChanged()).toEqual(expected);
  });
});

describe('signIn', () => {
  it('calls signInWithRedirect', async () => {
    const mockSignInWithRedirect = jest.fn();
    mockAuth.mockReturnValue({
      signInWithRedirect: mockSignInWithRedirect,
    });

    await signIn();
    expect(mockSignInWithRedirect).toBeCalled();
  });
});

describe('signOut', () => {
  it('calls signOut', async () => {
    const mockSignOut = jest.fn();
    mockAuth.mockReturnValue({
      signOut: mockSignOut,
    });

    await signOut();
    expect(mockSignOut).toBeCalled();
  });
});
