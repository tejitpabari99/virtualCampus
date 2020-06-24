import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MetaData, EventCard, EventModal, Template, CustomButton, Title, Search } from "../components";
import TZ from "countries-and-timezones";
import AddIcon from "@material-ui/icons/Add";
import firebase from "../firebase";
import Fuse from 'fuse.js';
import Subtitle from "../components/text/Subtitle";
import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
  getOffset, getCurrentLocationForTimeZone, stdTimezoneOffset, dst, convertTimestampToDate}
  from "../components/all/TimeFunctions"

const localizer = momentLocalizer(moment);
const useStyles = () => ({
  addNewButton: {
    boxShadow: "none",
    fontSize: 20
  }

});


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      count: 0,
      myEventsList: [],
      permEventsList: [],
      displayEvents: [],
      eventSearch: [],
      eventSearchError: '',
      searchVal: "",
      defaultSearchInput:''
    };
    this.getEvents();
    this.closeDo = this.closeDo.bind(this);
  }

  convertEventsTime(event) {
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

  // TODO(claire): These are the new functions to use the Google Calendar API instead.
  // TODO (claire): The new event attributes: https://developers.google.com/calendar/v3/reference/events#resource
  // makeDisplayEvents(events) {
  //   let arr = [];
  //   for (let i = 0; i < events.length; i += 1) {
  //     let ele = events[i];
  //     if (ele.end > new Date().toISOString()) {
  //       arr.push(ele);
  //     }
  //     if (arr.length === 5) {
  //       break;
  //     }
  //   }
  //   return arr;
  // }

  // async getEvents() {
  //   getCalendarEvents((events) => {
  //     this.setState({ myEventsList: events, displayEvents: this.makeDisplayEvents(events) });
  //   })
  // }

  makeDisplayEvents(events) {
    let arr = [];
    for (let i = 0; i < events.length; i += 1) {
      let ele = events[i];
      if (ele.end_date > new Date()) {
        arr.push(ele);
      }
      if (arr.length === 5) {
        break;
      }
    }
    return arr;
  }


  async getEvents() {
    var db = firebase.firestore();
    var approvedEvents = await db.collection("events")
      .where("approved", "==", true)
      .orderBy("start_date", 'asc')
      .get();
    let approvedEventsMap = [];
    if(approvedEvents){
      approvedEventsMap = approvedEvents.docs.map(doc => this.convertEventsTime(doc.data()));
    }
    this.setState({ myEventsList: approvedEventsMap, permEventsList: approvedEventsMap,
                         displayEvents:this.makeDisplayEvents(approvedEventsMap) });
  }

  searchFunc(val, changeDefaultSearchVal=true) {
    if(changeDefaultSearchVal){
      this.setState({defaultSearchInput:''});
    }
    if(!val || val.length===0) {
      return this.setState({eventSearch: [], activityIndicator: false, eventSearchError: '',
                                 myEventsList: this.state.permEventsList});
    }
    this.setState({activityIndicator:true});
    const options = {
      threshold:0.2,
      distance:1000,
      keys: ['tags', 'name', "event"]
    };
    const fuse = new Fuse(this.state.permEventsList, options);
    const output = fuse.search(val);
    const eventSearch = output;

    if(!eventSearch || eventSearch.length<=0){
      return this.setState({eventSearch:[], activityIndicator:false, eventSearchError:'No Results found',
                                myEventsList: []});
    }
    let itemOn = 0
    const approvedEventsMap = eventSearch.map(doc => (eventSearch[itemOn++]['item']));

    // Update events. Note: we don't have to update time again b/c time is already updated
    this.setState({eventSearch:eventSearch, activityIndicator:false, eventSearchError:'',
                         myEventsList: approvedEventsMap});
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
    this.setState({ open: false, count: 0 });
  }

  eventPropStyles(event, start, end, isSelected) {
    let style = {
      backgroundColor: "#2984ce"
    };
    return { style: style };
  }

  EventDisplay = ({ event }) => (
    <div>
      <div style={{ fontSize: 15, marginBottom: 3 }}>{event.event}</div>
      <div style={{ fontSize: 13 }}>{this.formatTime(event.start_date.getHours(), event.start_date.getMinutes())} -
        {this.formatTime(event.end_date.getHours(), event.end_date.getMinutes())}</div>
    </div>
  );

  render() {
    const { classes } = this.props;
    return (
      <Template active={"schedule"} title={"Events"}>
        <Title color={"blue"}>All Events</Title>
        <div style={{ textAlign: "center" }}>
          <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                        style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
        </div>
        {this.state.displayEvents.length > 0 &&
        <div style={{ marginBottom: "5%" }}>
          <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "20px", fontWeight: 100 }}> June 2020</h3>
          <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3 }}/>
          {this.state.displayEvents.map((ele, ind) => {
              return (<EventCard ele={ele} key={ind}/>);
          })}
        </div>}
        <Search placeholder="Search Events by Name and/or Tags"
                iconColor="#2984CE"
                data={this.state.data}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}

        /><br />
        <Calendar
          views={["month", "week", "day"]}
          localizer={localizer}
          scrollToTime={new Date()}
          events={this.state.myEventsList}
          defaultView={"month"}
          startAccessor="start_date"
          endAccessor="end_date"
          allDayAccessor="allDay"
          showMultiDayTimes
          style={{ height: 550, marginTop: 50 }}
          onSelectEvent={(event) => {
            this.setState({ open: true, event });
          }}
          eventPropGetter={this.eventPropStyles}
          components={{
            event: this.EventDisplay
          }}
          formats={{ eventTimeRangeFormat: () => null }}
        />
        {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event}/>}
      </Template>
    );
  }
}

export default withStyles(useStyles)(Events);
