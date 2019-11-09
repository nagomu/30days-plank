import { firebase } from '~/services/firebase';
import { timestamp } from '~/utils';

export const postError = async (error: Error): Promise<void> => {
  const params = {
    message: error.message,
    stack: error.stack,
    navigator: { ...window.navigator },
    timestamp: timestamp(new Date(Date.now())),
  };
  const ref = firebase.firestore().collection(`/errors`);
  await ref.add(params);
};
