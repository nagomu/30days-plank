import firebase, { QuerySnapshot } from '~/utils/firebase';

const fetchChallengeFromFirestore = async (
  uid: string,
): Promise<QuerySnapshot> => {
  const pathname = `/users/${uid}/challenges`;
  const collection = firebase.firestore().collection(pathname);
  return await collection
    .where('isActive', '==', true)
    .limit(1)
    .get();
};

export default fetchChallengeFromFirestore;
