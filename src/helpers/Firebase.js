import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { firebaseConfig } from '../constants/defaultValues';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export { auth, database, twitterAuthProvider };
