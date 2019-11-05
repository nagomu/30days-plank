import timekeeper from 'timekeeper';

import { timestampFromDate } from '~/services/firestore';
import { formatDayNumeric, formatShortMonth, formatUS, isToday } from '~/utils';

describe('utils: datetime', () => {
  afterEach(() => {
    timekeeper.reset();
  });

  describe('isToday', () => {
    it('returns true correctly if a given timestamp is today', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestampFromDate(today);
      expect(isToday(ts)).toEqual(true);
    });
  });

  describe('formatShortMonth', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestampFromDate(today);

      expect(formatShortMonth(ts)).toEqual('Jan');
    });
  });

  describe('formatDayNumeric', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestampFromDate(today);
      expect(formatDayNumeric(ts)).toEqual('1');
    });
  });

  describe('formatDayNumeric', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestampFromDate(today);
      expect(formatDayNumeric(ts)).toEqual('1');
    });
  });

  describe('formatUS', () => {
    it('returns expected string correctly', () => {
      const today = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
      timekeeper.freeze(today);
      const ts = timestampFromDate(today);
      expect(formatUS(ts)).toEqual('Jan 1, 2019');
    });
  });
});
