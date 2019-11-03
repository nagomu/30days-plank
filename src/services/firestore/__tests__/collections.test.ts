import {
  archives,
  batchChallenges,
  challenges,
  users,
  workouts,
} from '~/services/firestore/collections';

// NOTE: Avoid using mock (~/services/firestore/__mocks__/collections.mock.ts)
jest.unmock('~/services/firestore/collections');

describe('services/firestore/collections', () => {
  it('sets correct archives collectionPath', () => {
    expect(archives('uid').path).toEqual('users/uid/archives');
  });

  it('sets correct challenges collectionPath', () => {
    expect(challenges('uid').path).toEqual('users/uid/challenges');
  });

  it('sets correct challenges collectionPath (batchChallenges)', () => {
    expect(batchChallenges('uid').ref.path).toEqual('users/uid/challenges');
  });

  it('sets correct users collectionPath', () => {
    expect(users().path).toEqual('users');
  });

  it('sets correct workouts collectionPath', () => {
    expect(workouts('uid', 'cid').path).toEqual(
      'users/uid/challenges/cid/workouts',
    );
  });
});
