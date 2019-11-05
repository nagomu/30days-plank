import { firebase } from '~/services/firebase';

export const asyncSignOut = (): Promise<void> => firebase.auth().signOut();
