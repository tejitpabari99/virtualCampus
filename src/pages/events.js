import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import myEventsList from "../assets/EventsData";
import { MetaData, EventCard, EventModal, Template, CustomButton, Title } from "../components";
import AddIcon from "@material-ui/icons/Add";


// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from "../firebase";


// import firebase from '../components/all/firebase';


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
      if (ele.display) {
        arr.push(ele);
      }
      if (arr.length === 5) {
        break;
      }
    }
    this.state.displayEvents = arr;
  }

  // async componentDidMount() {
  //   var db = await firebase.firestore();
  //   var docs = await db.collection('eventsData').get();
  //   docs.forEach((doc) => {
  //     console.log(doc);
  //   })
  //   var eventsData = [];
  //   docs.forEach((doc) => {
  //     var event = doc.data();
  //     event.startTime = event.startTime.toDate();
  //     event.endTime = event.endTime.toDate();
  //     eventsData.push(event);
  //   });
  //   this.setState({myEventsList:eventsData})
  // }

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
      <div style={{ fontSize: 15, marginBottom: 3 }}>{event.title}</div>
      <div style={{ fontSize: 13 }}>{this.formatTime(event.startTime.getHours(), event.startTime.getMinutes())} -
        {this.formatTime(event.endTime.getHours(), event.endTime.getMinutes())}</div>
    </div>
  );

  render() {
    const { classes } = this.props;
    return (
      <Template active={"schedule"}>
        <MetaData title={"Events"}/>
        <div style={{paddingLeft:'5%', paddingRight: '5%'}}>
        <Title color={"blue"}>All Events</Title>
        <div style={{ textAlign: "center" }}>
          <CustomButton href={"https://forms.gle/fzKvSZqkAVNN6cHY6"} text={"ADD NEW EVENT"}
                        style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
        </div>
        {this.state.displayEvents.length > 0 &&
        <div style={{ marginBottom: "5%" }}>
          <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "20px", fontWeight: 100 }}> MAY 2020</h3>
          <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3 }}/>
          {this.state.displayEvents.map((ele) => {
            if (ele.display) {
              return (<EventCard ele={ele} onClick={() => this.attendEvent(ele)}/>);
            }
            return null;
          })}
        </div>}
        <Calendar
          views={["week", "day"]}
          localizer={localizer}
          scrollToTime={new Date()}
          events={this.state.myEventsList}
          defaultView={"week"}
          startAccessor="startTime"
          endAccessor="endTime"
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
        {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event}/>}
        </div>
      </Template>
    );
  }
}

export default withStyles(useStyles)(Events);
