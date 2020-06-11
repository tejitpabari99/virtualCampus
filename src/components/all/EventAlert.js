import React from "react"
import myEventsList from '../../assets/EventsData';
import { Alert} from '@material-ui/lab';
import firebase from "../../firebase";
import {
    convertDateToUTC,
    convertTimestampToDate,
    convertUTCToLocal, dst, getCurrentLocationForTimeZone,
    getOffset,
    getTimezoneName
} from "../../pages/events";

//default has no styling and the time will be set to 30 minutes before
    function convertEventsTime(event) {
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

    // TODO: Need to get events from database
    // TODO: Sorry for not doing it fully, hit some obstacles, and it got late
    // TODO: But the base is here!
    // TODO: What is left uncommented is the original code base
    const eventAlert = ({timeUntil = 30, styling = {}}) => {

        /*var db = firebase.firestore();
        var approvedEvents = db.collection("events")
            .where("approved", "==", false)
            .orderBy("start_date", 'asc')
            .get();
        let approvedEventsMap = [];
        if(approvedEvents){
            approvedEventsMap = approvedEvents.docs.map(doc => this.convertEventsTime(doc.data()));
        }
        const events = approvedEventsMap;*/

        //if true the alert will appear
        let displayAlert = false
        //if true the alert will say the event is now
        let displayNow = false

        //variables to calculate more recent event
        let today = new Date()
        const events = myEventsList
        let event = null
        let minDiff = timeUntil


        //iterate through events
        for (let i = 0; i < events.length; i++) {
            const e = events[i]
            if (e.display) {
                //if event is happening now, save event and change flag to true
                //if (e.start_date < today && e.end_date > today) {
                if (e.startTime < today && e.endTime > today) {
                    event = e
                    displayNow = true
                    break
                }

                //otherwise check if any event is in the specified timeframe
                //const eventdiff = parseInt((e.start_date.getTime() - today.getTime()) / 60000)
                const eventdiff = parseInt((e.startTime.getTime() - today.getTime()) / 60000)
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
            if (displayNow) {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}><strong>{event.title}</strong> is happening right now!</span>)
            } else {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}><strong>{event.title}</strong> is starting in {parseInt((event.startTime.getTime() - today.getTime()) / 60000)} minutes!</span>)
            }

            if (event.website !== '') {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>For more information: <a
                    href={event.website}>Website</a>. </span>)
            }

            if (event.eventLink.length > 0) {
                alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>To join the event directly: <a
                    href={event.eventLink[0].link}>{event.eventLink[0].title}</a>.</span>)
            }

        }

        return (
            <div>
                {displayAlert ?
                    <Alert severity="info" style={styling}>
                        {alert}
                    </Alert>
                    : null}
            </div>

        )
    };

export default eventAlert;