import {
  archives,
  batchChallenges,
  challenges,
  errors,
  workouts,
} from '~/services/firestore/collections';

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

  it('sets correct workouts collectionPath', () => {
    expect(workouts('cid').path).toEqual('users/uid/challenges/cid/workouts');
  });

  it('sets correct errors collectionPath', () => {
    expect(errors().path).toEqual('errors');
  });
});
