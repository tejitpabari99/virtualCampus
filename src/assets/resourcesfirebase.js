//import React from "react"
//import myResourcesList from '../assets/ResourcesData';
//const firebase = require("../firebase.js");

const admin = require("firebase-admin");
const serviceAccount = require("../firebase/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://columbia-virtual-campus.firebaseio.com/"
});


let db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

// All the categories within "resources"
let docs = db.collection('resources');
//console.log(docs);

//get multiple documents from a collection
let collection = docs.where("reviewed", "==", true);
console.log(collection);

console.log(500000);
/*
let collection = docs.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(docs) {
        // doc.data() is never undefined for query doc snapshots
        console.log(docs.id, " => ", docs.data());
    });
});;
*/
//console.log(collection);

// All the resources within "basic needs"
//collection = docs.doc('basic needs');
//console.log(collection);

//iterate through each document
collection.forEach((doc) => {

});
let subcollection =
console.log(subcollection);

/*docs.forEach((doc) => {
  console.log(doc);
});
// The collection of the resource "International Student"
//let subcollection = collection.collection('International Student');
//console.log(subcollection);

// The document of the resource "International Student"
//let subdoc = subcollection.doc('International Student');
//console.log(subdoc);
let CampusData = [[]];
/*
let CampusData = {key1: "title", key2: "pageURL", key3: "data"};
CampusData.key3 = ["title", "description", "img", "links", "reviewed", "category"];
CampusData.key3.links = ["website", "facebook"];
CampusData.key3.category = ["category", "tags"];
*/
/*
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
*/
//add all collections under resource into Collection
/*
let Collection = [];
docs.forEach((docs) => {
  let collection = docs.data();
  Collection.push(collection);
});

//add all subcollections into SubCollection
let SubCollection = [];
for (var i = 0; i < Collection.length; i++) {
  Collection[i].
  //add subdocs
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
}
*/


/*docs.forEach((doc) => {
  console.log(doc);
});
let CampusData = [];
docs.forEach((doc) => {
  let category = doc.data();
  CampusData.push(category);
});
*/

//export default resourcesData;
module.exports = {
  CampusData: CampusData,
};
