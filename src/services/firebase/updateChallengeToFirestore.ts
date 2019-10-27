import { UpdateChallengeParams } from '~/store/challenge';
import firebase from '~/utils/firebase';

const updateChallengeToFirestore = async (
  uid: string,
  challenge: UpdateChallengeParams,
): Promise<void> => {
  const pathname = `/users/${uid}/challenges`;
  const collection = firebase.firestore().collection(pathname);
  const { id, ...params } = challenge;
  return await collection.doc(id).update(params);
};

export default updateChallengeToFirestore;
