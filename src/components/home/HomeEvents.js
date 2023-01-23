import React from "react"
import Button from "../material-kit-components/CustomButtons/Button.js";
import myEventsList from '../../assets/EventsData'
import { withStyles } from "@material-ui/core/styles";
import {EventCardHighlight, EventModal, CustomButton, EventCard,
        getTimezoneName, convertUTCToLocal, convertDateToUTC, getOffset, getCurrentLocationForTimeZone, stdTimezoneOffset, dst, convertTimestampToDate} from '../'
import TZ from "countries-and-timezones";
import firebase from "../../firebase";
import {} from "../../components/all/TimeFunctions";
import {CircularProgress} from "@material-ui/core";

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
            displayEvents: [],
            loadingEvents: true,
            width: 0, height: 0
        };
        this.getEvents();
        this.closeDo = this.closeDo.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    getMonthName() {
        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[d.getMonth()];
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
        let divisor = 500
        if (this.state.width > 1750)
            divisor = 350
        let MAX = Math.min(Math.floor(.8 * this.state.width/divisor), 5)
        for (let i = 0; i < events.length; i += 1) {
            let ele = events[i];
            if (ele.end_date > new Date()) {
                arr.push(ele);
            }
            if (arr.length >= MAX) {
                break;
            }
        }
        return arr;
    }

    async getEvents() {
        var db = firebase.firestore();
        var approvedEvents = await db.collection("events")
            .where("approved", "==", true)
            //.limit(8)
            .orderBy("start_date", 'asc')
            .get();
        let approvedEventsMap = [];
        if(approvedEvents){
            approvedEventsMap = approvedEvents.docs.map(doc => {

                    let event = this.convertEventsTime(doc.data())
                    event["id"] = doc.id
                    let today = new Date()
                    if ((new Date(event.start_date)) < today && (new Date(event.end_date)) > today) {
                        event["displayNow"] = true
                    } else
                    if ((new Date(event.end_date)) < today) {
                        event["displayPast"] = true
                    }
                    if (event.recurring !== "") {
                        event["displayRecurring"] = true
                    }
                    if (event.popularity > 50) {
                        event["displayPopular"] = true
                    }
                    return event

                }
            );
        }
        approvedEventsMap.sort(function(a,b) {
            var dateA = a.start_date
            var dateB = b.start_date
            return ((dateA < dateB) ? -1 : 1)
        })

        this.setState({ myEventsList: approvedEventsMap,
                        displayEvents: this.makeDisplayEvents(approvedEventsMap),
                        loadingEvents: false, });
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
    }s

    render() {
        const { classes } = this.props;
        const date = new Date();
        return (
            <div style={{width: "90%", maxHeight:"70vh", maxWidth:"100vw", overflowY:"auto", overflowX:"hidden"}}>
            {this.state.loadingEvents && <CircularProgress style={{ marginLeft: '50%' }} />}
            {this.state.displayEvents.length > 0 &&
                    <div style={{ marginBottom: "5%" }} >
                        {this.state.displayEvents.map((ele, ind) => {
                            return (<EventCard ele={ele} key={ind}/>);
                        })}
                    </div>}
            </div>
        )
    }
}
export default withStyles(useStyles)(Events);
