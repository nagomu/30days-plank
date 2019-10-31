import { AddArchiveParams } from '~/store/archive';
import firebase, { DocumentReference } from '~/utils/firebase';

const addArchiveToFirestore = async (
  uid: string,
  params: AddArchiveParams,
): Promise<DocumentReference> => {
  const pathname = `/users/${uid}/archives`;
  const collection = firebase.firestore().collection(pathname);
  return await collection.add(params);
};

export default addArchiveToFirestore;
