import { UpdateWorkoutParams } from '~/store/workout';
import firebase from '~/utils/firebase';

const updateWorkoutToFirestore = async (
  uid: string,
  challengeId: string,
  workout: UpdateWorkoutParams,
): Promise<void> => {
  const pathname = `/users/${uid}/challenges${challengeId}`;
  const collection = firebase.firestore().collection(pathname);
  const { id, isCompleted } = workout;
  return await collection.doc(id).update({ isCompleted });
};

export default updateWorkoutToFirestore;
