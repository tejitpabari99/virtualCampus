import React from "react"
import { Alert} from '@material-ui/lab';
import firebase from "../../firebase";
import { isMobile } from "react-device-detect";
import {
    convertDateToUTC,
    convertTimestampToDate,
    convertUTCToLocal, dst, getCurrentLocationForTimeZone,
    getOffset,
    getTimezoneName
} from "../";


class EventAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            open:false,
            event:null,
            isHome:false,
            myEventsList: []
        };
        this.getEvents();
        this.closeDo = this.closeDo.bind(this);
    }

    async getEvents() {
        var db = firebase.firestore();
        var approvedEvents = await db.collection("events")
            .where("approved", "==", true).get();
        let approvedEventsMap = [];
        if(approvedEvents){
            approvedEventsMap = approvedEvents.docs.map(doc => this.convertEventsTime(doc.data()));
        }
        this.setState({ myEventsList: approvedEventsMap });
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

    //const eventAlert = ({timeUntil = 30, styling = {}}) => {
    eventAlert() {

        //if true the alert will appear
        let displayAlert = false
        //if true the alert will say the event is now
        let displayNow = false

        //variables to calculate more recent event
        let today = new Date()
        const events = this.state.myEventsList
        let event = null
        let minDiff = this.props.timeUntil

        //iterate through events
        for (let i = 0; i < events.length; i++) {
            const e = events[i]
            if(e.agree) {
                //if event is happening now, save event and change flag to true
                if ((new Date(e.start_date)) < today && (new Date(e.end_date)) > today) {
                    event = e
                    displayNow = true
                    break
                }

                //otherwise check if any event is in the specified timeframe
                const eventdiff = parseInt(((new Date(e.start_date)).getTime() - today.getTime()) / 60000)
                if (eventdiff > 0 && eventdiff < minDiff) {
                    event = e
                    minDiff = eventdiff
                }
            }
        }

        //customize the alert
        //making it flexible for events that only have the website or zoom link, and events happening soon vs. now
        let alert = [];
        if (event != null) {
            displayAlert = true;
            if (isMobile) {
                if (displayNow) {
                    alert.push(<span style={{display: 'inline-block', paddingLeft: '2px'}}>Now:
                        <strong> {event.event}</strong></span>)
                } else {
                    alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>
                        In {parseInt(((new Date(event.start_date)).getTime() - today.getTime()) / 60000)} minutes:
                        <strong>{event.event}</strong>!</span>)
                }
            } else
            if (displayNow) {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '2px'}}><strong>{event.event}</strong>
                    is happening right now!</span>)
            } else {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}><strong>{event.event}</strong>
                    is starting in {parseInt(((new Date(event.start_date)).getTime() - today.getTime()) / 60000)}
                    minutes!</span>)
            }

            if (event.website !== '') {
                if (isMobile) {
                    alert.push(<span style={{display: 'inline-block', paddingLeft: '2px'}}> <a
                        href={event.event_link}>Website</a>. </span>)
                } else {
                    alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>For more information: <a
                        href={event.event_link}>Website</a>. </span>)
                }
            }

            if (event.invite_link.length > 0) {
                if (isMobile) {
                    alert.push(<span
                        style={{display: 'inline-block', paddingLeft: '5px'}}> <a
                        href={event.invite_link[0].link}>{event.invite_link[0].title}</a>.</span>)
                } else {
                    alert.push(<span
                        style={{display: 'inline-block', paddingLeft: '5px'}}> To join the event directly: <a
                        href={event.invite_link[0].link}>{event.invite_link[0].title}</a>.</span>)
                }
            }
        }

        return [alert, displayAlert]
    }

    closeDo() {
        this.setState({ open: false, count: 0 });
    }

    componentDidMount() {
        const isHomeVar = window.location.href.replace("//", "").split("/").length === 2
                            ? true : false
        this.setState({ isHome: isHomeVar});
    }

    render(){
        const { classes } = this.props;
        let note = this.eventAlert()
        let alert = note[0]
        let isHome = this.state.isHome
        let displayAlert = note[1] && isHome
        return (
            <div>
                {displayAlert ?
                    <Alert severity="info" style={this.props.styling}>
                        {alert}
                    </Alert>
                    : null}
            </div>
        )
    }
}

EventAlert.defaultProps = {
    timeUntil: 30,
    styling: {}
}

export default EventAlert;