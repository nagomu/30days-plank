import timekeeper from 'timekeeper';

import { firebase } from '~/services/firebase';
import {
  formatDayNumeric,
  formatShortMonth,
  formatUS,
  isToday,
  timestamp,
} from '~/utils';

describe('utils: datetime', () => {
  afterEach(() => {
    timekeeper.reset();
  });

  describe('isToday', () => {
    it('returns true correctly if a given timestamp is today', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestamp(today);
      expect(isToday(ts)).toEqual(true);
    });
  });

  describe('formatShortMonth', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestamp(today);
      expect(formatShortMonth(ts)).toEqual('Jan');
    });
  });

  describe('formatDayNumeric', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestamp(today);
      expect(formatDayNumeric(ts)).toEqual('1');
    });
  });

  describe('formatDayNumeric', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestamp(today);
      expect(formatDayNumeric(ts)).toEqual('1');
    });
  });

  describe('formatUS', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestamp(today);
      expect(formatUS(ts)).toEqual('Jan 1, 2019');
    });
  });

  describe('timestamp', () => {
    it('returns Timestamp correctly', () => {
      const today = new Date(Date.UTC(2018, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const expected = firebase.firestore.Timestamp.fromDate(today);
      expect(timestamp(today)).toEqual(expected);
    });
  });
});
