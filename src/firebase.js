import firebase from "firebase";

var config = {
   apiKey: "AIzaSyD1AXm_SWBl_V35cUIK8zXiSJthdBqgIEw",
   authDomain: "interview-guide-007.firebaseapp.com",
   databaseURL: "https://interview-guide-007.firebaseio.com",
   projectId: "interview-guide-007",
   storageBucket: "interview-guide-007.appspot.com",
   messagingSenderId: "994127905512",
   appId: "1:994127905512:web:b42a71d501f2c4f2b4ff5d"
 };

const initializeFirebase = () => firebase.initializeApp(config);

export default initializeFirebase;
