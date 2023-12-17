import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import {FireBaseContext,AuthContext} from '../store/Context'
const firebaseConfig = {
  apiKey: "AIzaSyB668iClZeiu1X8igC2Dwk_R50I1kYUSmc",
  authDomain: "login-and-sign-up-7118e.firebaseapp.com",
  projectId: "login-and-sign-up-7118e",
  storageBucket: "login-and-sign-up-7118e.appspot.com",
  messagingSenderId: "601676067001",
  appId: "1:601676067001:web:2f9ab335dc602589fd2b68",
  measurementId: "G-0L95YJJCXT"
};

export default firebase.initializeApp(firebaseConfig);