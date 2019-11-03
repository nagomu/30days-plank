import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

import { firebaseConfig } from '~/config';

firebase.initializeApp(firebaseConfig);

export * from './types';

export default firebase;
