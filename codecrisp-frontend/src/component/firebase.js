import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/storage';  


const firebaseConfig = {

    apiKey: "AIzaSyDwqEBajXYMRNNJShvXipuaZG1VCzKaE2w",
    authDomain: "codecrisp.firebaseapp.com",
    projectId: "codecrisp",
    storageBucket: "codecrisp.appspot.com",
    messagingSenderId: "681402889814",
    appId: "1:681402889814:web:76a5a666118f3385b96df7"
 
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth  =firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// const storage = firebase.storage().ref();

export {auth , provider };
// export default db;