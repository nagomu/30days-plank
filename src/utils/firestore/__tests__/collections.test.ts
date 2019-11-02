import {
  archives,
  challenges,
  users,
  workouts,
} from '~/utils/firestore/collections';

// NOTE: Avoid using mock (~/utils/firestore/__mocks__/collections.mock.ts)
jest.unmock('~/utils/firestore/collections');

describe('utils: firestore', () => {
  it('sets correct archives collectionPath', () => {
    expect(archives('uid').path).toEqual('users/uid/archives');
  });

  it('sets correct challenges collectionPath', () => {
    expect(challenges('uid').path).toEqual('users/uid/challenges');
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
