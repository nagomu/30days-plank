import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

import { firebaseConfig } from '~/config';

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

export { firebase };
