import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
    getOffset, getCurrentLocationForTimeZone, dst, convertTimestampToDate}
    from "../all/TimeFunctions"
import firebase from "../../firebase";

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
export function handleSignupForEvent(ele, email) {
    if (ele.id === undefined)
        return
    const db = firebase.firestore();
    const addition = firebase.firestore.FieldValue.arrayUnion(email)
    const storyRef = db.collection('events').doc(ele.id);
    storyRef.update({ emailsSignedUp: addition })
    handleEventClick(ele, 5)
}

export function formatTime(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};


export function eventPropStylesShared(event, start, end, isSelected) {
    let style = {
        backgroundColor: "#2984CE"
    };
    let nowStyle = {
        backgroundColor: "#1BAE0E"
    }
    let pastStyle = {
        backgroundColor: "#BDBDBD"
    }
    let popularStyle = {
        backgroundColor: "#2984CE"
    }
    let recurringStyle = {
        backgroundColor: "#FB750D"
    }

    if (event.displayNow) {
        return {style: nowStyle};
    }
    else if (event.displayPast) {
        return {style: pastStyle};
    }
    else if (event.displayPopular) {
        return {style: popularStyle};
    }
    else if (event.displayRecurring) {
        return {style: recurringStyle};
    }
    else {
        return {style: style};
    }
}

export function convertEventsTime(event) {
    const tzString = event.timezone;

    // Remove redudancy (AKA remove the evidence -.0)
    event.start_date = event.start_date.split("GMT")[0];
    event.end_date = event.end_date.split("GMT")[0];

    if (event.timezone !== undefined && event.timezone.includes("$")) {
      // $ splits time and timezone in the event.timezone field in firebase!
      const tz = tzString.split("$")[0];
      const daylightSavings = tzString.split("$")[1] === "true" ? true : false;
      const offset = getOffset(tz, daylightSavings);

      // First convert the event's time to UTC, assuming the event is in EST time (America/New_York)
      // America/New_York should be changed to the user's time zone who created the event, if they
      // Choose to use their time zone rather than EST.
      const UTCStart = convertDateToUTC(convertTimestampToDate(event.start_date), offset);
      const UTCEnd = convertDateToUTC(convertTimestampToDate(event.end_date), offset);

      // Second, convert those consts above to user's local time
      event.start_date = convertUTCToLocal(UTCStart);
      event.end_date = convertUTCToLocal(UTCEnd);
      // get timezone to display
      event.timeZoneGMT = getTimezoneName(getCurrentLocationForTimeZone(), dst());
    }
    return event;
  }

export function makeDisplayEvents(events) {
    let arr = [];
    for (let i = 0; i < events.length; i += 1) {
      let ele = events[i];

      ele.title = ele.event === undefined ? ele.title : ele.event
      ele.event = ele.title

      if (ele.end_date > new Date()) {
        arr.push(ele);
      }
      if (arr.length === 5) {
        break;
      }
    }
    return arr;
  }

 export function isEventShowable(ele, mainTagsClicked, filterTagsClicked, clubFilter, dateFilter) {
    ele.tagsForFilter = mainTagsClicked
    // Handle main tags filter
    let shouldDisplayRecurring = ele["tagsForFilter"].recurring === "on" ? true : false
    let shouldDisplayPopular = ele["tagsForFilter"].popular === "on" ? true : false
    let shouldDisplayPast = ele["tagsForFilter"].past === "on" ? true : false
    let shouldDisplayNow = ele["tagsForFilter"].now === "on" ? true : false

    ele.displayThisCard = true
    if (!ele.displayPopular && shouldDisplayPopular)
      ele.displayThisCard = false
    if (!ele.displayNow && shouldDisplayNow)
      ele.displayThisCard = false
    if (!ele.displayRecurring && shouldDisplayRecurring)
      ele.displayThisCard = false
    if (!ele.displayRecurring && shouldDisplayRecurring)
      ele.displayThisCard = false
    if (!ele.displayPast && shouldDisplayPast)
      ele.displayThisCard = false
    if (ele.displayThisCard && ele.displayPast && !shouldDisplayPast)
      ele.displayThisCard = false

    // Process regular tag filter
    let filterPass = true
    if (ele.displayThisCard === true) {
      Object.keys(filterTagsClicked).map(x => {
        let found = false
        if (filterTagsClicked[x] !== undefined) {
          ele.tags.map(y => {
            if (x.toLowerCase() === y.toLowerCase()) {
              found = true
            }
          })

          if (found === false) {
            filterPass = false
          }
        }
      })
    }

    if (filterPass === false) {
      ele.displayThisCard = false
    }

    // Handle Organization
    if (clubFilter !== "All") {
      if (clubFilter !== ele.name)
        ele.displayThisCard = false
    }

    // Handle date
    if (dateFilter !== "All") {
      let d = new Date()
      const daysApart = Math.abs((ele.start_date.getTime() - d.getTime()) / (3600*24*1000))
      switch(dateFilter) {
        case "This Month Only":
          if (ele.start_date.getMonth() !== d.getMonth() || ele.start_date.getFullYear() !== d.getFullYear())
            ele.displayThisCard = false
        case "Within a Week":
          if (daysApart > 7)
            ele.displayThisCard = false
        case "Within a Month":
          if (daysApart > 30)
            ele.displayThisCard = false
        case "Within 3 Months":
          if (daysApart > 90)
            ele.displayThisCard = false
      }
    }
    return ele.displayThisCard
  }
