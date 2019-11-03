import {
  archives,
  batchChallenges,
  challenges,
  users,
  workouts,
} from '~/services/firestore/collections';

// NOTE: Avoid using mock (~/services/firestore/__mocks__/collections.mock.ts)
jest.unmock('~/services/firestore/collections');

jest.mock('../../firebase/currentUser', () => ({
  currentUser: jest.fn().mockReturnValue('uid'),
}));

describe('services/firestore/collections', () => {
  it('sets correct archives collectionPath', () => {
    expect(archives().path).toEqual('users/uid/archives');
  });

  it('sets correct challenges collectionPath', () => {
    expect(challenges().path).toEqual('users/uid/challenges');
  });

  it('sets correct challenges collectionPath (batchChallenges)', () => {
    expect(batchChallenges().ref.path).toEqual('users/uid/challenges');
  });

  it('sets correct users collectionPath', () => {
    expect(users().path).toEqual('users');
  });

  it('sets correct workouts collectionPath', () => {
    expect(workouts('cid').path).toEqual('users/uid/challenges/cid/workouts');
  });
});
