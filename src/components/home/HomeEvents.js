import React from "react"
import Button from "../material-kit-components/CustomButtons/Button.js";
import myEventsList from '../../assets/EventsData'
import { withStyles } from "@material-ui/core/styles";
import {EventCard, EventModal, CustomButton} from '../'
import TZ from "countries-and-timezones";
import firebase from "../../firebase";
import {getTimezoneName, convertUTCToLocal, convertDateToUTC, getOffset, getCurrentLocationForTimeZone, stdTimezoneOffset, dst, convertTimestampToDate} from "../../components/all/TimeFunctions"

const useStyles = () => ({
    button4: {
        boxShadow: 'none',
        borderRadius: 30,
        fontSize: '1.1rem',
        width: 150,
        border: '1px solid #F1945B',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        color: '#F1945B !important',
        "&:hover,&:focus": {
            backgroundColor: '#F1945B',
            color: 'white !important'
        },
    },
});


class Events extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            open:false,
            event:null,
            myEventsList: [],
            displayEvents: []
        };
        this.getEvents();
        this.closeDo = this.closeDo.bind(this);
    }

    convertEventsTime(event) {
        const tzString = event.timezone;
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
        var approvedEvents = await db.collection("events").where("approved", "==", true).get();
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
        console.log(approvedEventsMap);
        // console.log(approvedEventsMap);
        this.setState({ myEventsList: approvedEventsMap, displayEvents:this.makeDisplayEvents(approvedEventsMap) });
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
            <div>
                <div>
                    {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event}/>}
                    {this.state.displayEvents.map((ele, ind) => {
                        return(<EventCard key={ind} ele={ele} onClick={() => this.attendEvent(ele)}/>)
                    })}
                </div>
                {this.state.displayEvents.length>0 && <div style={{textAlign:"center", marginTop: 20}}>
                </div>}
            </div>
        )
    }
}
export default withStyles(useStyles)(Events);
