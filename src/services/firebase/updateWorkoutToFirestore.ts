import { UpdateWorkoutParams } from '~/store/workout';
import firebase, { timestampFromDate } from '~/utils/firebase';

const updateWorkoutToFirestore = async (
  uid: string,
  challengeId: string,
  workout: UpdateWorkoutParams,
): Promise<void> => {
  const pathname = `/users/${uid}/challenges/${challengeId}/workouts`;
  const collection = firebase.firestore().collection(pathname);
  const { id, isCompleted } = workout;
  const params = {
    isCompleted,
    updatedAt: timestampFromDate(new Date()),
  };
  return await collection.doc(id).update(params);
};

export default updateWorkoutToFirestore;
