import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";
import {getMessaging, getToken, onMessage} from 'firebase/messaging'
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBJotertv6S3zDqAZGHypKzCFFkwCsUjsw",
  authDomain: "gestwork-bad1b.firebaseapp.com",
  projectId: "gestwork-bad1b",
  storageBucket: "gestwork-bad1b.appspot.com",
  messagingSenderId: "810323040534",
  appId: "1:810323040534:web:d24b14d5ba12b34b1e1837"
};

const app = initializeApp(firebaseConfig);
const google =  new GoogleAuthProvider();
const db = getFirestore();
const messaging = getMessaging(app);

export const getToke = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: 'BFtXP57FDW7qr5OtU9zUQpJEHNaI_Ux2_iNZkkVrtI3yejNCLC7FJa-Xhs_loztGLaVSTjxuMwLiERDc55SoQGg'
  }).then((currentToken) => {
    if(currentToken) {
      console.log('current token for client:', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.')
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
  });
}

export const onMessageListener = () =>
new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    resolve(payload);
  });
});



export{
    app,
    google,
    messaging,
    db
}

