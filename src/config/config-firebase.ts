import firebase from 'firebase';

class configFirbase {
    init(){
     return firebase.initializeApp({
        apiKey: "AIzaSyDm0_GJdHsBYf0W_7GOn7LR602Kl16ESes",
        authDomain: "newagent-9d822.firebaseapp.com",
        databaseURL: "https://newagent-9d822.firebaseio.com",
        projectId: "newagent-9d822",
        storageBucket: "newagent-9d822.appspot.com",
        messagingSenderId: "627711900183",
        appId: "1:627711900183:web:d878dded6d7f0fdbc23a52"
     });
    } 
}

const db = new configFirbase()
export default  db.init().firestore()
  