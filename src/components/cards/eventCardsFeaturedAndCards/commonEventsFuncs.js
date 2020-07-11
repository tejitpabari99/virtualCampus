import firebase from "../../../firebase";

export function handleEventClick(ele, inc) {
    console.log(ele)
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(inc);
    const storyRef = db.collection('events').doc(ele.id);
    storyRef.update({ popularity: increment });
}