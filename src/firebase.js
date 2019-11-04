import firebase from "firebase";
import config from './config/firebaseConfig';

const initializeFirebase = () => firebase.initializeApp(config);

export default initializeFirebase;
