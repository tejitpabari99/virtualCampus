import firebase from "../../../firebase";



var Categories = {};
var db = firebase.firestore();
var docRef = db.collection("resource_reference_docs").doc("Resource Tags by Categories");

docRef.get().then(function(doc) {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        Object.keys(doc.data()).forEach(key =>{
            
            Categories[key] = doc.data()[key];

        });
        // Categories["data"]=doc.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



export default Categories;
