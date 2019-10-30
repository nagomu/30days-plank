import firebase, { QuerySnapshot } from '~/utils/firebase';

const fetchArchivesFromFirestore = async (
  uid: string,
): Promise<QuerySnapshot> => {
  const pathname = `/users/${uid}/archives`;
  const collection = firebase.firestore().collection(pathname);
  return await collection
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();
};

export default fetchArchivesFromFirestore;
