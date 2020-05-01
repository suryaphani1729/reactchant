import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBfYEAxzFCKYraFtjCQX1BTq0CsiK-T2lw",
    authDomain: "firestorecrud-1a301.firebaseapp.com",
    databaseURL: "https://firestorecrud-1a301.firebaseio.com",
    projectId: "firestorecrud-1a301",
    storageBucket: "firestorecrud-1a301.appspot.com",
    messagingSenderId: "950737070687",
    appId: "1:950737070687:web:b0fdd80c5ac7efe3"
  };

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos")
