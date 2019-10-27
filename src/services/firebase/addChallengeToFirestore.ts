import { AddChallengeParams } from '~/store/challenge';
import firebase, { DocumentReference } from '~/utils/firebase';

const addChallengeToFirestore = async (
  uid: string,
  params: AddChallengeParams,
): Promise<DocumentReference> => {
  const pathname = `/users/${uid}/challenges`;
  const collection = firebase.firestore().collection(pathname);
  return await collection.add(params);
};

export default addChallengeToFirestore;
