import firebase from "../../../firebase";

export function handleEventClick(ele, inc) {
    if (ele.id === undefined)
        return
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(inc);
    const storyRef = db.collection('events').doc(ele.id);
    storyRef.update({ popularity: increment });
}