import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwqEBajXYMRNNJShvXipuaZG1VCzKaE2w",  
    authDomain: "codecrisp.firebaseapp.com",
    projectId: "codecrisp",
    storageBucket: "codecrisp.appspot.com", 
    messagingSenderId: "681402889814",
    appId: "1:681402889814:web:76a5a666118f3385b96df7"
  
  };
  
  
  firebase.initializeApp(firebaseConfig);
  
  const auth  =firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth , provider };
