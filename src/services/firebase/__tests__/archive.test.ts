import firebase from 'firebase/app';
import timekeeper from 'timekeeper';

import {
  addArchive,
  fetchArchive,
  fetchArchives,
} from '~/services/firebase/archive';
import { Archive, Timestamp } from '~/types';
import { archives } from '~/utils/fixtures/archives';

jest.mock('~/utils/datetime');

const now = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
timekeeper.freeze(now);

const mockCurrentUser = jest.fn();
const mockGet = jest.fn();
const mockAdd = jest.fn();
const mockStartAt = jest.fn();
const mockStartAfter = jest.fn();

/* eslint-disable @typescript-eslint/explicit-function-return-type */
jest.mock(
  '~/services/firebase',
  jest.fn().mockReturnValue({
    firebase: {
      auth: () => mockCurrentUser(),
      firestore: () => ({
        collection: () => ({
          add: mockAdd,
          doc: (id?: string) => ({ get: mockGet(id || 'new-id') }),
          orderBy: () => ({
            limit: (limit: number) => ({
              get: mockStartAt(limit),
              startAfter: (next?: Timestamp) => ({
                get: mockStartAfter(next),
              }),
            }),
          }),
        }),
      }),
    },
  }),
);
/* eslint-enable */

jest.mock(
  '~/services/firebase/user',
  jest.fn().mockReturnValue({
    updateUser: () => jest.fn().mockResolvedValue(undefined),
  }),
);

describe('archive', () => {
  const ts = {
    seconds: 1569855600,
    nanoseconds: 0,
  } as firebase.firestore.Timestamp;

  let fixture: Archive[] = [];
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixture = archives().splice(0, 3) as any[];
    mockCurrentUser.mockImplementation(() => ({ currentUser: { uid: 'uid' } }));
  });

  mockGet.mockImplementation((id: string) => {
    const result = fixture.find(a => a.id === id);
    return jest.fn().mockResolvedValue({ data: () => result });
  });

  const mockDocs = [
    { data: (): Archive => fixture[0] },
    { data: (): Archive => fixture[1] },
    { data: (): Archive => fixture[2] },
  ];

  mockStartAt.mockImplementation(limit =>
    jest.fn().mockResolvedValue({
      docs: mockDocs,
      forEach: (cb: Function) => {
        fixture.forEach((f, i) => {
          if (i > limit) return;
          cb({ data: () => f, id: f.id });
        });
      },
    }),
  );

  mockStartAfter.mockImplementation(next =>
    jest.fn().mockResolvedValue({
      docs: mockDocs.filter(d => d.data().createdAt.seconds < next.seconds),
      forEach: (cb: Function) => {
        fixture
          .filter(f => f.createdAt.seconds < next.seconds)
          .forEach(f => cb({ data: () => f, id: f.id }));
      },
    }),
  );

  mockAdd.mockImplementation(archive => {
    fixture.push({
      id: 'new-id',
      challenge: archive.challenge,
      title: archive.title,
      rate: archive.rate,
      createdAt: ts,
      updatedAt: ts,
    });
    return jest.fn().mockResolvedValue(undefined);
  });

  describe('fetchArchive', () => {
    it('returns correct Archive if it exists', async () => {
      const expected = fixture[0];
      expect(await fetchArchive('100')).toEqual(expected);
    });

    it('returns undefined if it does not exist', async () => {
      const expected = undefined;
      expect(await fetchArchive('id')).toEqual(expected);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      expect(await fetchArchive('100')).toEqual(expected);
    });
  });

  describe('fetchArchives', () => {
    it('returns Archive[] correctly if length < limit', async () => {
      const expected = fixture;
      const result = await fetchArchives(undefined, 5);
      expect(result && result.archives).toEqual(expected);
      expect(result && result.next).toEqual(undefined);
    });

    it('returns Archive[] correctly if length === limit', async () => {
      const expected = fixture;
      const result = await fetchArchives(undefined, 3);
      expect(result && result.archives).toEqual(expected);
      expect(result && result.next).toEqual(undefined);
    });

    it('returns Archive[] correctly if length > limit', async () => {
      const expected = [...fixture];
      expected.splice(-1, 1);
      const last = expected[1].createdAt;
      const next = {
        seconds: last.seconds,
        nanoseconds: last.nanoseconds,
      };
      const result = await fetchArchives(undefined, 2);
      expect(result && result.archives).toEqual(expected);
      expect(result && result.next).toEqual(next);
    });

    it('returns Archive[] correctly if has next', async () => {
      const expected = [fixture[2]];
      const next = { seconds: 1523232000, nanoseconds: 0 };
      const result = await fetchArchives(next, 3);
      expect(result && result.archives).toEqual(expected);
      expect(result && result.next).toEqual(undefined);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      const result = await fetchArchives(undefined, 5);
      expect(result).toEqual(expected);
    });
  });

  describe('addArchive', () => {
    const params = {
      challenge: 'new-cid',
      title: 'new archive',
      rate: 10,
    };

    it('add Archive correctly', async () => {
      const expected = {
        ...params,
        id: 'new-id',
        challenge: 'new-cid',
        title: 'new archive',
        rate: 10,
        createdAt: ts,
        updatedAt: ts,
      };

      expect(await addArchive(params)).toEqual(expected);
    });

    it('returns undefined if unauthenticated', async () => {
      mockCurrentUser.mockImplementation(() => ({ currentUser: null }));
      const expected = undefined;
      expect(await addArchive(params)).toEqual(expected);
    });
  });
});

timekeeper.reset();
