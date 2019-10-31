import firebase, {
  DocumentReference,
  timestampFromDate,
} from '~/utils/firebase';

const addErrorToFirestore = async (
  error: Error,
): Promise<DocumentReference> => {
  const collection = firebase.firestore().collection('/errors');

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
  return await collection.add(params);
};

export default addErrorToFirestore;
