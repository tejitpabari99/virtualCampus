import TZ from "countries-and-timezones";
import firebase from "../../firebase";


const defaultTimezone = "America/New_York";

// Converts the output of this.convertDateToUTC to the current user's local time zone!
export function convertUTCToLocal(time) {
  const converted = new Date(time.toLocaleString() + " UTC (Coordinated Universal Time)");
  return converted;
}


// Converts the event date from any time zone (specified through the offset)
// The offset is any minute from -600 (+10 UTC) to 600 (-10 UTC).
// For example EST is -5 UTC so it's offset is 5 * 60 = 300 OR 4 * 60 = 240 (day light savings etc.)
// Best is to use this.getOffset(location) to get the correct offset.
// Can get the user's location through this.getCurrentLocationForTimeZone; however, this should only
// be called on the user's timezone who created the event!
// SIDE_NOTE: Could be used to convert start time and end time that is being entered in the firebase DB
// so that way the DB will be in a unified time: UTC and the fields isDST and timezone in the
// DB would be unnecessary
export function convertDateToUTC(time, offset = null) {
  const eventTime = new Date(time); // Event time in the time zone of offset
  if (offset == null) {
    offset = eventTime.getTimezoneOffset();
  }
  const eventInUTC = new Date(eventTime.setTime(eventTime.getTime() + offset * 60 * 1000));
  return eventInUTC;
}

// Give a timezone location such as America/New_York and get its offset that can be
// Directly plugged into this.convertDateToUTC!
// Use this function only on the timezone of the event!
export function getOffset(timeZone = null, isDst = false) {
  const tz = TZ.getTimezone(timeZone);

  if (tz == null) { // fail safe
    if (isDst) {
      return -1 * TZ.getTimezone(getCurrentLocationForTimeZone()).dstOffset;
    } else {
      return -1 * TZ.getTimezone(getCurrentLocationForTimeZone()).utcOffset;
    }
  }

  if (isDst) {
    return -1 * tz.dstOffset;
  } else {
    return -1 * tz.utcOffset;
  }
}

export function getCurrentLocationForTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// used for dst, uses user's local time
export function stdTimezoneOffset() {
  const date = new Date();
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
// boolean: is it day light savings time?
// Use only for the event's timezone and a date d!
// Meaning of above means to call this function when a user submits
// a form to create an event and store the value that it outputs
// in the metadata of the event!
// User can select local time OR EST time on form.
export function dst(loc = getCurrentLocationForTimeZone()) {

  // If user selects EST time:
  if (loc === "America/New_York") {
    const today = new Date();
    var DSTDateStart;
    var DSTDateEnd;
    switch (today.getFullYear()) {
      case 2020:
        DSTDateStart = new Date(Date.UTC(2020, 2, 8, 7));
        DSTDateEnd = new Date(Date.UTC(2020, 10, 1, 6));
        break;
      case 2021:
        DSTDateStart = new Date(Date.UTC(2021, 2, 14, 7));
        DSTDateEnd = new Date(Date.UTC(2021, 10, 7, 6));
        break;
      case 2022:
        DSTDateStart = new Date(Date.UTC(2022, 2, 13, 7));
        DSTDateEnd = new Date(Date.UTC(2022, 10, 6, 6));
        break;
    }
    if (today.getTime() >= DSTDateStart.getTime() && today.getTime() < DSTDateEnd.getTime()) {
      return true;
    }
    return false;
  }

  // If user selects local time:
  if (TZ.getTimezone(loc).utcOffset === TZ.getTimezone(loc).dstOffset) {
    return false;
  }
  const date = new Date();
  return date.getTimezoneOffset() < stdTimezoneOffset();
}

// Get a better timezone name
export function getTimezoneName(loc = getCurrentLocationForTimeZone(), isDst = dst()) {
  const gmt = TZ.getTimezone(loc).utcOffsetStr;
  var str = "GMT" + gmt;

  if (gmt === "-01:00")
    return "CAT";
  if (gmt === "-02:00")
    return "BET";
  if (gmt === "-03:30")
    return "CNT";
  if (gmt === "-04:00")
    return "PRT";
  if (gmt === "-05:00")
    return dst ? "EDT" : "EST";
  if (gmt === "-06:00")
    return dst ? "CDT" : "CST";
  if (gmt === "-07:00")
    return dst ? "MDT" : "MST";
  if (gmt === "-08:00")
    return dst ? "PDT" : "PST";
  if (gmt === "-09:00")
    return dst ? "ADT" : "AST";
  if (gmt === "-10:00")
    return dst ? "HDT" : "HST";
  if (gmt === "-11:00")
    return "MIT";
  if (gmt === "+12:00")
    return dst ? "NDT" : "NST";
  if (gmt === "+11:00")
    return dst ? "SDT" : "SST";
  if (gmt === "+10:00")
    return "AET";
  if (gmt === "+09:30")
    return dst ? "ACDT" : "ACST";
  if (gmt === "+09:00")
    return dst ? "JDT" : "JST";
  if (gmt === "+08:00")
    return "CTT";
  if (gmt === "+07:00")
    return dst ? "VDT" : "VST";
  if (gmt === "+06:00")
    return dst ? "BDT" : "BST";
  if (gmt === "+05:30")
    return dst ? "IDT" : "IST";
  if (gmt === "+05:00")
    return "PLT";
  if (gmt === "+04:00")
    return "NET";
  if (gmt === "+03:30")
    return "MET";
  if (gmt === "+03:00")
    return "EAT";
  if (gmt === "+02:00")
    return "EET";
  if (gmt === "+01:00")
    return "ECT";

  if (isDst)
    return str + " DST";
  return str;
}

export function convertTimestampToDate(timestamp){
  var Timestamp = firebase.firestore.Timestamp;
  return timestamp instanceof Timestamp
    ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
    : timestamp;
}

export function convertEventsTime(event) {
  const tzString = event.timezone;

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

export function getTimezoneOptions() {
  if (getCurrentLocationForTimeZone() !== defaultTimezone) {
    return [
      {
        value: getCurrentLocationForTimeZone()
          + "$" + dst(),
        label: "Mine: "
          + getTimezoneName()
      },
      {
        value: defaultTimezone
          + "$" + dst(defaultTimezone),
        label: "Default: "
          + getTimezoneName(defaultTimezone
            , dst(defaultTimezone))
      }
    ];
  } else {
    return [
      {
        value: defaultTimezone
          + "$" + dst(defaultTimezone),
        label: "Mine: "
          + getTimezoneName(defaultTimezone
            , dst(defaultTimezone))
      }
    ];
  }
}
  