import React from "react"
import Button from "../material-kit-components/CustomButtons/Button.js";
import myResourcesList from '../../assets/ResourcesData'
import { withStyles } from "@material-ui/core/styles";
import {EventCardHighlight, EventModal, CustomButton} from '../'
import firebase from "../../firebase";


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
                        return(<EventCardHighlight key={ind} ele={ele} onClick={() => this.attendEvent(ele)}/>)
                    })}
                </div>
                {this.state.displayEvents.length>0 && <div style={{textAlign:"center", marginTop: 20}}>
                    <CustomButton text={'SEE ALL EVENTS'} href={'/events'} size={"small"} color={"orange"} rounded/>
                </div>}
            </div>
        )
    }
}
