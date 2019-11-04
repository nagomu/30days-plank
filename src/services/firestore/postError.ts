import { errors, timestampFromDate } from '~/services/firestore';

export const postError = async (error: Error): Promise<void> => {
  const params = {
    message: error.message,
    stack: error.stack,
    navigator: {
      cookieEnabled: window.navigator.cookieEnabled,
      onLine: window.navigator.onLine,
      ua: window.navigator.userAgent,
    },
    timestamp: timestampFromDate(new Date(Date.now())),
  };
  await errors().add(params);
};
