import { users } from '~/services/firestore/collections/users';

jest.unmock('~/services/firestore/collections');

describe('services/firestore/collections/users', () => {
  it('sets correct collectionPath', () => {
    expect(users().path).toEqual('users');
  });
});
