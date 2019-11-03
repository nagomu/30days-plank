import timekeeper from 'timekeeper';

import { timestampFromDate } from '~/services/firestore';
import { mergeArchives } from '~/store/archive/utils/mergeArchives';

const mockToday = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
timekeeper.freeze(mockToday);

describe('mergeArchives', () => {
  it('correctly', () => {
    const state = [
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
      {
        achievementRate: 79,
        challengeId: '3',
        createdAt: timestampFromDate(mockToday),
        id: '3',
        title: 'title3',
      },
    ];

    const store = [
      {
        achievementRate: 79,
        challengeId: '4',
        createdAt: timestampFromDate(mockToday),
        id: '4',
        title: 'title4',
      },
      {
        achievementRate: 79,
        challengeId: '5',
        createdAt: timestampFromDate(mockToday),
        id: '5',
        title: 'title5',
      },
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
    ];

    const expected = [
      {
        achievementRate: 80,
        challengeId: '1',
        createdAt: timestampFromDate(mockToday),
        id: '1',
        title: 'title1',
      },
      {
        achievementRate: 100,
        challengeId: '2',
        createdAt: timestampFromDate(mockToday),
        id: '2',
        title: 'title2',
      },
      {
        achievementRate: 79,
        challengeId: '3',
        createdAt: timestampFromDate(mockToday),
        id: '3',
        title: 'title3',
      },
      {
        achievementRate: 79,
        challengeId: '4',
        createdAt: timestampFromDate(mockToday),
        id: '4',
        title: 'title4',
      },
      {
        achievementRate: 79,
        challengeId: '5',
        createdAt: timestampFromDate(mockToday),
        id: '5',
        title: 'title5',
      },
    ];

    expect(mergeArchives(state, store)).toEqual(expected);
  });
});

timekeeper.reset();
