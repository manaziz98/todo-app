import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxx",
  authDomain: "todo-app-2-cd4fe.firebaseapp.com",
  databaseURL: "https://todo-app-2-cd4fe.firebaseio.com",
  projectId: "todo-app-2-cd4fe",
  storageBucket: "todo-app-2-cd4fe.appspot.com",
  messagingSenderId: "452941452410",
  appId: "1:452941452410:web:4e01da501db525140717c3",
  measurementId: "G-VY8X1CD64S",
});

const db = firebaseApp.firestore();

export default db;
