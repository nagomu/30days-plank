import { UpdateChallengeParams } from '~/store/challenge';
import firebase, { timestampFromDate } from '~/utils/firebase';

const updateChallengeToFirestore = async (
  uid: string,
  challenge: UpdateChallengeParams,
): Promise<void> => {
  const pathname = `/users/${uid}/challenges`;
  const collection = firebase.firestore().collection(pathname);
  const { id, description, isActive } = challenge;
  const params = {
    description,
    isActive,
    updatedAt: timestampFromDate(new Date()),
  };
  return await collection.doc(id).update(params);
};

export default updateChallengeToFirestore;
