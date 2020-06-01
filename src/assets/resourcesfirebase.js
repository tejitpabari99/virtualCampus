//import React from "react"
//import myResourcesList from '../assets/ResourcesData';
//const firebase = require("../firebase.js");
/*
class ResourcesFB extends React.Component {
 async componentDidMount() {
   var db = await firebase.firestore();
   var docs = await db.collection('resources').get();
   docs.forEach((doc) => {
     console.log(doc);
   })
   var resourcesData = [];
   docs.forEach((doc) => {
     var event = doc.data();
     resourcesData.push(event);
   });
   this.setState({myResourcesList:resourcesData})
 }
}
*/
const admin = require("firebase-admin");
const serviceAccount = require("../firebase/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://columbia-virtual-campus.firebaseio.com/"
});


let db = admin.firestore();

// All the categories within "resources"
let docs = db.collection('resources');
console.log(docs);

// All the resources within "basic needs"
let collection = docs.doc('basic needs');
console.log(collection);

// The collection of the resource "International Student"
let subcollection = collection.collection('International Student');
console.log(subcollection);

// The document of the resource "International Student"
let subdoc = subcollection.doc('International Student');
console.log(subdoc);

let getDoc = subdoc.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

/*docs.forEach((doc) => {
  console.log(doc);
});
let CampusData = [];
docs.forEach((doc) => {
  let category = doc.data();
  CampusData.push(category);
});

let IndexCampusData = [];
docs.forEach((doc) => {
  let collection = doc.data().getCollections();
    //iterate through collections to get resource
  /*  forEach((collection), i) => {
      var resource = collection[i].data();
      console.log(resource);
      IndexCampusData.push(resource);
    });
  });*/

//export default resourcesData;
/*module.exports = {
  CampusData: CampusData,
  IndexCampusData: IndexCampusData
};*/