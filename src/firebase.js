import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyBfYEAxzFCKYraFtjCQX1BTq0CsiK-T2lw",
  authDomain: "firestorecrud-1a301.firebaseapp.com",
  databaseURL: "https://firestorecrud-1a301.firebaseio.com",
  projectId: "firestorecrud-1a301",
  storageBucket: "firestorecrud-1a301.appspot.com",
  messagingSenderId: "950737070687",
  appId: "1:950737070687:web:b0fdd80c5ac7efe3",
};
//firebase
firebase.initializeApp(config);
// for messaging
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BNqXbuaTezYo4V2cfB6UG3ck03FKJzV-eHxZF_fAtsQiHNO_yVz1H6Cu5OTTPJWpUCPY82FSnUn1bxlYSK7A3Zc"
);
messaging.onMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  navigator.serviceWorker.ready.then(function (registration) {
    return registration.showNotification("Vibration Sample", {
      body: "Buzz! Buzz!",
      icon: "../images/touch/chrome-touch-icon-192x192.png",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: "vibration-sample",
    });
  });
});
export default messaging;
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
// firebase end

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

//signup
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({ displayName, email, photoURL, ...additionalData });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

// save based on date
export const saveUserTodayCount = async (user, countDate, todayCount) => {
  if (!user) return;
  const d = new Date(countDate);
  const year = d.getFullYear();
  const month = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth();
  const date = d.getDate();
  const dayKey = year + "" + month + "" + date;
  const userRef = firestore.doc(`users/${user.uid}/counts/${dayKey}`);

  try {
    await userRef.set({ dayKey: todayCount });
  } catch (error) {
    console.error("Error creating user document", error);
  }
};
export const getUserCounts = async (uid) => {
  if (!uid) return null;
  try {
    const collection = await firestore.collection(`users/${uid}/counts`).get();
    const data = collection.docs.map((doc) => {
      return { data: doc.data(), id: doc.id };
    });
    return data;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
