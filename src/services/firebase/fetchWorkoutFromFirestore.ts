import firebase, { DocumentSnapshot } from '~/utils/firebase';

const fetchWorkoutFromFirestore = async (
  uid: string,
  challengeId: string,
  workoutId: string,
): Promise<DocumentSnapshot> => {
  const pathname = `/users/${uid}/challenges/${challengeId}/workouts`;
  const collection = firebase.firestore().collection(pathname);
  return await collection.doc(workoutId).get();
};

export default fetchWorkoutFromFirestore;
