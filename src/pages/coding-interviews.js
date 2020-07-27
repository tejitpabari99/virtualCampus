import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Alert from '@material-ui/lab/Alert';
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "@material-ui/core/Button";
import { CircularProgress } from '@material-ui/core';

import { MockInterviewModal, Template, Title, Subtitle, } from "../components";
import TZ from "countries-and-timezones";
import firebase from "../firebase";
import interview from "../assets/images/technical/interview.png";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";


const localizer = momentLocalizer(moment);
const useStyles = () => ({
  addNewButton: {
    boxShadow: "none",
    fontSize: 20
  }

});


// Get a better timezone name
export function getTimezoneName(loc = getCurrentLocationForTimeZone(), dst = this.dst()) {
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

  if (dst)
    return str + " DST";
  return str;
}

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

export function convertTimestampToDate(timestamp){
  var Timestamp = firebase.firestore.Timestamp;
  return timestamp instanceof Timestamp
    ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
    : timestamp;
}


class Technical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      myEventsList: [],
      loadingEvents: true,
    };
    this.getEvents();
    this.closeDo = this.closeDo.bind(this);
  }

  convertEventsTime(event) {
    // const tzString = event.timezone;
    event.start_date_original = event.start_date;

    // Remove redudancy (AKA remove the evidence -.0)
    event.start_date = event.start_date.split("GMT")[0];
    event.end_date = event.end_date.split("GMT")[0];

    if (event.timezone !== undefined && event.timezone.includes("$")) {
      // Convert those consts above to user's local time
      event.start_date = convertUTCToLocal(event.start_date);
      event.end_date = convertUTCToLocal(event.end_date);
      // get timezone to display
      event.timeZoneGMT = getTimezoneName(getCurrentLocationForTimeZone(), dst());
    }
    return event;
  }

  maxWeeklyInterviewsCheck(events) {

    // create a interviewer email to events for this week map
    let interviewerEventsMap = new Map()
    events.forEach(event => {
      const startOfWeek = new Date(event.start_date);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // subtract to get earlier sunday
      startOfWeek.setHours(0,0,0,0); // set to midnight

      // { interviewer email : { first day of week : [events] } }
      if (interviewerEventsMap.has(event.host_email)){
        if (interviewerEventsMap.get(event.host_email).has(startOfWeek.toString())){
          interviewerEventsMap.get(event.host_email).get(startOfWeek.toString()).push(event);
        }
        else {
          interviewerEventsMap.get(event.host_email).set(startOfWeek.toString(), [event]);
        }
      } else {
        interviewerEventsMap.set(event.host_email, new Map([[startOfWeek.toString(), [event]]]));
      }
    });

    // for each interviewer
    interviewerEventsMap.forEach(interviewer => {
      // for each week
      interviewer.forEach(week => {
        // get number of taken sessions
        let count = 0;
        week.forEach(event => {
          if(!event.available){
            count++
          }
        });
  
        // if number is >= max interviewer given, mark all as unavailable
        // note this week not change value in database, but simply marks it in the UI
        if(count >= week[0].week_availability){
          week.forEach(event => {
            event.available = false;
          });   
        }
      });
    });
  }

  getEvents() {
    const db = firebase.firestore();
    db.collection("technical")
    .where("approved", "==", true)
    .get().then(approvedEvents => {
      let approvedEventsMap = [];
      if(approvedEvents){
          // TODO
          // MAY NEED TO CHANGE:
          // the function this.convertEventsTime takes in an event's data, and uses the event.timezone
          // and event.startTime or event.endTime (may need to change these names) to convert to user's local time
          // However, convertEventsTime should be run on every event, converting the time and timezone of the event
          // To the current user's local time!
          approvedEventsMap = approvedEvents.docs.map(doc => this.convertEventsTime(doc.data()));
      }
      this.maxWeeklyInterviewsCheck(approvedEventsMap);
      this.setState({ myEventsList: approvedEventsMap, loadingEvents: false });
    });
  }


  formatTime(hours, min) {
    let h = hours > 12 ? hours - 12 : hours;
    let m = min < 10 ? "0" + min.toString() : min.toString();
    let add = hours > 12 ? "PM" : "AM";
    return h + ":" + m + add;
  }

  attendEvent(ele) {
    this.setState({ open: true, event: ele });
  }

  closeDo() {
    this.setState({ open: false});
  }

  eventPropStyles(event, start, end, isSelected) {
    let style;
    if(event.available === true){
      style = {
        backgroundColor: "#2984ce"
      };
    }
    else{
      style = {
        backgroundColor: "#A9B2B7",
        pointerEvents: 'none',
        border: 'none'
      };
    }

    /*let style = {
      backgroundColor: "#A9B2B7"
    };*/
    return { style: style };
  }

  EventDisplay = ({ event }) => (
    <div>
      <div style={{ fontSize: 15, marginBottom: 3 }}>{event.host_name}</div>
    </div>
  );

  setSubmitStatus = (status) => {
    this.setState({submitStatus: status});
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Template active={"technical"} title={"Coding interviews"}>
        { this.state.submitStatus === 'success' &&
          <Alert severity="success">Signup form submitted successfully, please check your email to confirm attendance!</Alert>
        }
        { this.state.submitStatus === 'failure' &&
          <Alert severity="error">Signup form failed to submit, please try again!</Alert>
        }
        { this.state.submitStatus === 'notFound' &&
          <Alert severity="error">Interview session could not be found! Reloading sessions...</Alert>
        }
        { this.state.submitStatus === 'booked' &&
          <Alert severity="error">Interview session already booked! Reload sessions...</Alert>
        }
        { this.state.submitStatus === 'max' &&
          <Alert severity="error">Interviewer has already reached their limit for the week! Reload sessions...</Alert>
        }
        <Title color={"blue"} style={{  padding: '20px', marginTop: 0}}>Mock Coding Interviews</Title>
        <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "1.3em", fontWeight: 100 }}> August 3rd - August 24th, 2020</h3>
        <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3}}/>
        <GridContainer
            style={{marginTop:"2em", marginBottom:"2em", marginLeft: 0, marginRight: 0, textAlign:'center'}}>
                <GridItem xs={12} sm={12} md={5}>
                    <img src={interview} style={{width: "350px", height: "300px", marginLeft: "-20px"}}></img>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} style={{ marginTop:"1.2em", width:"50em"}}>
                    <p style={{fontSize: "1.4em", fontWeight: "bold", textAlign: "left", marginRight: "10px"}}>Are you preparing for tech internships or full time positons? 
                    Do you want to practice your coding interview skills?</p>
                    <p style={{fontSize : "1.1em", textAlign: "left",  marginRight: "10px"}}> Columbia Virtual Campus is offerring the opportunity for Columbia University students
                    to participate in one-on-one mock technical coding interviews
                     with fellow students and alumni who have interned at Microsoft, Facebook, Google and more.  
                    These 1 hour interview sessions will allow you to pratice real technical interview questions while connecting with a fellow Columbia student.</p>
                    <p style={{fontSize : "15px", textAlign: "left",  marginRight: "10px"}}><strong>Interested in giving mock interviews?</strong> Email us at 
                    <a style={{ color: "#0072CE", display: "inline-block", paddingLeft: "0.3%" }}
                 href={"mailto:columbiavirtualcampus@gmail.com"}> columbiavirtualcampus@gmail.com</a>!</p>
                </GridItem>
        </GridContainer>
        <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3}}/>
        <Title color={"blue"} style={{marginBottom:"2%", marginTop: "2%"}} >Sign up here!</Title>
        { this.state.loadingEvents ? 
          <CircularProgress/> :
          <Calendar
            views={["month", "week", "day"]}
            localizer={localizer}
            defaultDate={new Date('August 3, 2020 0:00:00')}
            events={this.state.myEventsList}
            defaultView={"week"}
            startAccessor="start_date"
            endAccessor="end_date"
            allDayAccessor="allDay"
            showMultiDayTimes
            style={{ height: 550 }}
            onSelectEvent={(event) => {
              this.setState({ open: true, event });
            }}
            eventPropGetter={this.eventPropStyles}
            components={{
              event: this.EventDisplay
            }}
            formats={{ eventTimeRangeFormat: () => null }}
          />
        }
        
        {this.state.open && 
          <MockInterviewModal open={this.state.open} closeDo={this.closeDo} event={this.state.event} setSubmitStatus={this.setSubmitStatus}/>}
      </Template>
    );
  }
}

export default withStyles(useStyles)(Technical);
