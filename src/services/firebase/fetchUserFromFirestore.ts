import firebase, { DocumentSnapshot } from '~/utils/firebase';

const fetchUserFromFirestore = async (
  id: string,
): Promise<DocumentSnapshot> => {
  const collection = firebase.firestore().collection('/users');
  return await collection.doc(id).get();
};

export default fetchUserFromFirestore;
