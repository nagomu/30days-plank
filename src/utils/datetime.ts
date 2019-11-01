import { Timestamp } from '~/utils/firebase';

export const isToday = (ts: Timestamp): boolean => {
  const format = (value: Date): string => {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const date = `${value.getDate()}`.padStart(2, '0');
    return `${year}${month}${date}`;
  };

  const today = format(new Date(Date.now()));
  return format(ts.toDate()) === today;
};

export const formatShortMonth = (ts: Timestamp): string => {
  const date = ts.toDate();
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
};

export const formatDayNumeric = (ts: Timestamp): string =>
  `${ts.toDate().getDate()}`;

export const formatUS = (ts: Timestamp): string => {
  const date = ts.toDate();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
