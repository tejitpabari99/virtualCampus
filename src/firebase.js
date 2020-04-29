import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

// Firebase web config
const config = {
    "apiKey": "AIzaSyBgUeKy2UCuQ2QRwuLxOR6SQQSohLcwN2I",
    "authDomain": "columbia-virtual-campus.firebaseapp.com",
    "databaseURL": "https://columbia-virtual-campus.firebaseio.com",
    "projectId": "columbia-virtual-campus",
    "storageBucket": "columbia-virtual-campus.appspot.com",
    "messagingSenderId": "1009798395114",
    "appId": "1:1009798395114:web:637a7a702f089a34771393",
    "measurementId": "G-7ERZ40CVT3"
};

firebase.initializeApp(config);

export default firebase;