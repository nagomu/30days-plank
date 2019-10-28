import { default as templates } from '~/config/workouts';
import firebase, { timestampFromDate } from '~/utils/firebase';

const addWorkoutsToFirestore = async (
  uid: string,
  challengeId: string,
): Promise<void> => {
  const pathname = `/users/${uid}/challenges/${challengeId}/workouts`;
  const collection = firebase.firestore().collection(pathname);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const workouts = templates.map((template, i) => ({
    ...template,
    scheduledDate: timestampFromDate(new Date(year, month, date + i)),
  }));
  workouts.forEach(async params => await collection.add(params));

  return;
};

export default addWorkoutsToFirestore;
