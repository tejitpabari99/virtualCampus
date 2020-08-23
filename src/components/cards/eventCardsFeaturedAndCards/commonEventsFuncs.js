import firebase from "../../../firebase";

export const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}

export const days = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
};

export function handleEventClick(ele, inc) {
    if (ele.id === undefined)
        return
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(inc);
    const storyRef = db.collection('events').doc(ele.id);
    storyRef.update({ popularity: increment });
}

export function formatTime(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};
