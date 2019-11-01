import { archives, challenges } from '~/utils/firestore/collections';

// NOTE: Avoid using mock (~/utils/firestore/__mocks__/collections.mock.ts)
jest.unmock('~/utils/firestore/collections');

describe('utils: firestore', () => {
  it('sets correct archives collectionPath', () => {
    expect(archives('uid').path).toEqual('users/uid/archives');
  });

  it('sets correct challenges collectionPath', () => {
    expect(challenges('uid').path).toEqual('users/uid/challenges');
  });
});
