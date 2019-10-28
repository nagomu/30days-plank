import firebase, { QuerySnapshot } from '~/utils/firebase';

const fetchAllWorkoutsFromFirestore = async (
  uid: string,
  challengeId: string,
): Promise<QuerySnapshot> => {
  const pathname = `/users/${uid}/challenges/${challengeId}/workouts`;
  const collection = firebase.firestore().collection(pathname);
  return await collection.orderBy('scheduledDate', 'asc').get();
};

export default fetchAllWorkoutsFromFirestore;
