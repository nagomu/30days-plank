import firebase from '~/utils/firebase';

const fetchUserFromFirestore = async (
  id: string,
): Promise<firebase.firestore.DocumentSnapshot> => {
  const collection = firebase.firestore().collection('/users');
  return await collection.doc(id).get();
};

export default fetchUserFromFirestore;
