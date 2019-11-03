import timekeeper from 'timekeeper';

import { timestampFromDate } from '~/services/firestore';

describe('services/firestore/timestampFromDate', () => {
  const date = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
  timekeeper.freeze(date);

  it('returns firestore.Timestamp correctly', () => {
    const ts = timestampFromDate(date);
    expect(ts).toEqual({ seconds: 1577836800, nanoseconds: 0 });
    expect(ts.toDate().getDate()).toEqual(date.getDate());
  });

  timekeeper.reset();
});
