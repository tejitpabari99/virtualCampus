import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import myEventsList from '../assets/EventsData';
import { EventCard, EventModal, MetaData } from '../components';
import Template from "../components/all/Template";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from '../firebase';




// import firebase from '../components/all/firebase';


const localizer = momentLocalizer(moment);
const useStyles = () => ({
  addNewButton: {
    boxShadow: "none",
    fontSize: 20,
  }

});


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      count: 0,
      myEventsList: myEventsList,
      displayEvents: null
    };
    this.makeDisplayEvents(myEventsList);
    this.closeDo = this.closeDo.bind(this);
  }

  makeDisplayEvents(events) {
    let arr = [];
    for (let i = 0; i < events.length; i += 1) {
      let ele = events[i];
      if (ele.display) { arr.push(ele) }
      if (arr.length === 5) { break }
    }
    this.state.displayEvents = arr;
  }

  async componentDidMount() {
    var db = firebase.firestore();
    var approvedEvents = await db.collection('approvedEvents').get();

    var approvedEventsMap = approvedEvents.docs.map(doc => doc.data()['id'])
    var eventsData = [];

    for (const eventId of approvedEventsMap) {
      console.log(eventId);

      await db.collection('events').doc(eventId)
        .get().then(function (doc) {
          if (doc.exists) {
            var eventData = doc.data();
            console.log(eventData.toString());

            eventsData.push(eventData);
          } else {
            console.log("Error: No such document!")
          }
        }).catch(function (error) {
          console.log("Error getting document:", error)
        });

    };
    this.setState({ eventsData: eventsData })
  }

  formatTime(hours, min) {
    let h = hours > 12 ? hours - 12 : hours;
    let m = min < 10 ? '0' + min.toString() : min.toString();
    let add = hours > 12 ? 'PM' : 'AM';
    return h + ':' + m + add
  }

  attendEvent(ele) {
    this.setState({ open: true, event: ele })
  }

  closeDo() {
    this.setState({ open: false, count: 0 })
  }

  eventPropStyles(event, start, end, isSelected) {
    let style = {
      backgroundColor: '#2984ce'
    };
    return { style: style }
  }

  EventDisplay = ({ event }) => (
    <div>
      <div style={{ fontSize: 15, marginBottom: 3 }}>{event.title}</div>
      <div style={{ fontSize: 13 }}>{this.formatTime(event.startTime.getHours(), event.startTime.getMinutes())} -
        {this.formatTime(event.endTime.getHours(), event.endTime.getMinutes())}</div>
    </div>
  );

  render() {
    const { classes } = this.props;
    return (
      <Template active={'schedule'}>
        <MetaData title={'Events'} />
        <div>
          <p>{JSON.stringify(this.state.eventsData)}</p>
        </div>
        <div style={{ marginTop: "0px" }}>
          <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}> ALL EVENTS (IN EST) </h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button color="vcColor" size="sm" className={classes.addNewButton}
            style={{ marginTop: 20, marginBottom: 15 }}
            active={true} target={'_blank'} rel="noopener noreferrer"
            href={'https://forms.gle/fzKvSZqkAVNN6cHY6'}> <AddIcon /> Add New Event
        </Button>
        </div>
        <Calendar
          views={['week', 'day']}
          localizer={localizer}
          scrollToTime={new Date()}
          events={this.state.myEventsList}
          defaultView={'week'}
          startAccessor="startTime"
          endAccessor="endTime"
          allDayAccessor="allDay"
          showMultiDayTimes
          style={{ height: 550 }}
          onSelectEvent={(event) => { this.setState({ open: true, event }) }}
          eventPropGetter={this.eventPropStyles}
          components={{
            event: this.EventDisplay,
          }}
          formats={{ eventTimeRangeFormat: () => null }}
        />
        {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event} />}
        <Toolbar />
        {this.state.displayEvents.length > 0 && <div>
          <h3 style={{ textAlign: "left", color: '#F1945B', fontSize: "20px", fontWeight: 100 }} > MAY 2020</h3>
          <div style={{ color: '#F1945B', backgroundColor: '#F1945B', height: 3 }} />
          {this.state.displayEvents.map((ele) => {
            if (ele.display) {
              return (<EventCard ele={ele} onClick={() => this.attendEvent(ele)} />)
            }
            return null
          })}
        </div>}
      </Template>
    )
  }
}

export default withStyles(useStyles)(Events);
