import firebase, {
  DocumentReference,
  timestampFromDate,
} from '~/utils/firebase';

export interface AppError {
  message: string;
  fileName?: string;
  functionName?: string;
  stack?: string;
}

const addErrorToFirestore = async (
  error: AppError,
): Promise<DocumentReference> => {
  const collection = firebase.firestore().collection('/errors');

  const params = {
    ...error,
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
