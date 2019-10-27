import { User } from '~/store/auth';
import firebase from '~/utils/firebase';

const setUserToFirestore = async (user: User): Promise<void> => {
  const collection = firebase.firestore().collection('/users');
  return await collection.doc(user.uid).set(user);
};

export default setUserToFirestore;
