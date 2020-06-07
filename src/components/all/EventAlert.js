import React from "react"
import myEventsList from '../../assets/EventsData';
import { Alert} from '@material-ui/lab';

//default has no styling and the time will be set to 30 minutes before
const eventAlert = ({timeUntil = 30, styling = {}}) => {
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
            if (e.startTime < today && e.endTime > today) {
                event = e
                displayNow = true
                break
            }

            //otherwise check if any event is in the specified timeframe
            const eventdiff = parseInt((e.startTime.getTime() - today.getTime())/60000)
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
        }
        else {
            alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}><strong>{event.title}</strong> is starting in {parseInt((event.startTime.getTime() - today.getTime())/60000)} minutes!</span>)
        }

        if (event.website !== '') {
            alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>For more information: <a href={event.website}>Website</a>. </span>)
        }

        if (event.eventLink.length > 0) {
            alert.push(<span style={{display: 'inline-block', paddingLeft: '5px'}}>To join the event directly: <a href={event.eventLink[0].link}>{event.eventLink[0].title}</a>.</span>)
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