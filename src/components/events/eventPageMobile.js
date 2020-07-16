import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../events/react-big-calendar-mobile.css";
import { EventCardFeatured, EventCard, EventModal, Template, CustomButton, Title, EventSearch }
  from "../";
import firebase from "../../firebase";
import Fuse from 'fuse.js';
import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
  getOffset, getCurrentLocationForTimeZone, dst, convertTimestampToDate}
  from "../all/TimeFunctions"
import CustomToolbar from "../events/CalendarToolBarMobile"
import ArrowForward from '@material-ui/icons/ArrowForwardIosOutlined';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Carousel from 'react-material-ui-carousel';
import ScrollableAnchor from 'react-scrollable-anchor';
import {goToAnchor, configureAnchors} from 'react-scrollable-anchor';
import queryString from 'query-string';

//configureAnchors({offset: -2500});

const localizer = momentLocalizer(moment);
const useStyles = () => ({
  addNewButton: {
    boxShadow: "none",
    fontSize: 20
  },
  mainBox: {
    backgroundColor: "#3B5998",
    width: "108%",
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    paddingTop: "30px",
    marginLeft: "-4%"
  },
  mainText: {
    marginLeft: "10px",
    color:"white",
    textAlign: "left",
    fontSize: "14px"
  },
  greenBox: {
    backgroundColor: "#F3FFEE",
    height: "82px",
    width: "137px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F3FFEE",
    padding: 0,
    marginLeft: "30%",
    marginRight: "25%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  greenText: {
    color:"#1BAE0E",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "5px",
    fontSize: "14px"
  },
  blueBox: {
    backgroundColor: "#F2F9FD",
    height: "82px",
    width: "137px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F2F9FD",
    padding: 0,
    marginLeft: "30%",
    marginRight: "25%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  blueText: {
    color:"#0072CE",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "5px",
    fontSize: "14px"
  },
  orangeBox: {
    backgroundColor: "#FDEEE5",
    height: "82px",
    width: "137px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#FDEEE5",
    padding: 0,
    marginLeft: "30%",
    marginRight: "25%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  orangeText: {
    color:"#FB750D",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "5px",
    fontSize: "14px"
  },
  grayBox: {
    backgroundColor: "#BDBDBD",
    height: "82px",
    width: "137px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#BDBDBD",
    padding: 0,
    marginLeft: "30%",
    marginRight: "25%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  grayText: {
    color:"black",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "5px"
  },
  footerStyle: {
    fontSize: "20px",
    color: "white",
    textAlign: "right",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  }
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

class EventsPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      count: 0,
      myEventsList: [],
      permEventsList: [],
      displayEvents: [],
      eventSearchMobile: [],
      eventSearchMobileError: '',
      searchVal: "",
      defaultSearchInput:'',
      calendarExpandText: "Show"
    };
    this.getEvents();
    this.closeDo = this.closeDo.bind(this);
  }

//scrollToEvent(el) {
    //goToAnchor(el, true);
//}

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

  makeDisplayEvents(events) {
    let arr = [];
    for (let i = 0; i < events.length; i += 1) {
      let ele = events[i];

      ele.title = ele.event === undefined ? ele.title : ele.event
      ele.event = ele.title

      if (ele.end_date > new Date()) {
        arr.push(ele);
      }
      if (arr.length === 5) {
        break;
      }
    }
    return arr;
  }

  makeEventsList(events) {
    return events;
  }


  async getEvents() {
    var db = firebase.firestore();
    var approvedEvents = await db.collection("events")
        .where("approved", "==", true)
        .orderBy("start_date", 'asc')
        .get();
    let approvedEventsMap = [];
    if(approvedEvents){
      approvedEventsMap = approvedEvents.docs.map(doc => {
        let doc_data = this.convertEventsTime(doc.data());
        doc_data['id'] = doc.id;
        return (doc_data);
      });
    }
    this.setState({ myEventsList: this.makeEventsList(approvedEventsMap), permEventsList: approvedEventsMap,
      displayEvents:this.makeDisplayEvents(approvedEventsMap) });
  }

  searchFunc(val, changeDefaultSearchVal=true) {
    if(changeDefaultSearchVal){
      this.setState({defaultSearchInput:''});
    }
    if(!val || val.length===0) {
      return this.setState({eventSearchMobile: [], activityIndicator: false, eventSearchMobileError: '',
        myEventsList: this.makeEventsList(this.state.permEventsList)});
    }
    this.setState({activityIndicator:true});
    const options = {
      threshold:0.2,
      distance:1000,
      keys: ['tags', 'name', "event"]
    };
    const fuse = new Fuse(this.state.permEventsList, options);
    const output = fuse.search(val);
    const eventSearchMobile = output;

    if(!eventSearchMobile || eventSearchMobile.length<=0){
      return this.setState({eventSearchMobile:[], activityIndicator:false, eventSearchMobileError:'No Results found',
        myEventsList: []});
    }
    let itemOn = 0
    const approvedEventsMap = eventSearchMobile.map(doc => (eventSearchMobile[itemOn++]['item']));

    // Update events. Note: we don't have to update time again b/c time is already updated
    this.setState({eventSearchMobile:eventSearchMobile, activityIndicator:false, eventSearchMobileError:'',
      myEventsList: this.makeEventsList(approvedEventsMap)});
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
      <div style={{height:"1.2em"}}>
        <div style={{ fontSize: ".7em" }}>{event.event === undefined ? event.title : event.event}</div>
      </div>
  );

updateCalendarExpandText() {
  if (this.state.calendarExpandText == "Show") {
    this.setState({calendarExpandText: "Hide"});
    console.log("made hide");
  }
  else {
    this.setState({calendarExpandText: "Show"});
    console.log("made show");
  }
}

getCalendarText() {
  return this.state.calendarExpandText;
}

  render() {
    const { classes } = this.props;
    let numEventsDisplayed = 0
    const MAX_EVENTS_DISPLAYED = 2
    let sizeOfList = 0
    let noSearchResults = ""
    this.state.myEventsList.map((ele, ind) => {
      sizeOfList = sizeOfList + 1
    });
    if (sizeOfList === 0) {
      noSearchResults = "No events found for that search"
    }
    console.log("Size: " + sizeOfList)
    return (
        <Template active={"schedule"} title={"Events"}>

          <div className={classes.mainBox}>
            <div className={classes.mainText} style={{paddingLeft: "15%"}}>
              <h2 style={{fontSize: "24px"}}>All Events</h2>
              <p style={{fontSize: "14px", marginRight: "35px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div style={{align: "center"}}>
            <Carousel>
                {this.state.displayEvents.map((ele, ind) => {
                  if (numEventsDisplayed < MAX_EVENTS_DISPLAYED) {

                    if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                      ele.tags = ['none']
                    }

                    numEventsDisplayed = numEventsDisplayed + 1
                    return (
                      <div style={{overflow:'hidden'}}>
                          <EventCardFeatured /*onClick={this.scrollToEvent(ele.id)}*/ ele={ele} key={ind}/> <br />
                      </div>
                    );
                  }
                })}

            </Carousel>
            </div>
          </div>

          <div style={{margin: "40px"}}/>

          <Carousel>
                <div className={classes.greenBox}>
                  <div className={classes.greenText}>
                    <h4 style = {{fontSize: "14px"}}>Happening Now</h4>
                  </div>
                </div>

                <div className={classes.blueBox}>
                  <div className={classes.blueText}>
                    <h4 style = {{fontSize: "14px"}}>Popular</h4>
                  </div>
                </div>

                <div className={classes.orangeBox}>
                  <div className={classes.orangeText}>
                    <h4 style = {{fontSize: "14px"}}>Recurring</h4>
                  </div>
                </div>

                <div className={classes.grayBox}>
                  <div className={classes.grayText}>
                    <h4 style = {{fontSize: "14px"}}>Past</h4>
                  </div>
                </div>
          </Carousel>

          <div style={{margin: "40px"}}/>

          <EventSearch placeholder="Search all virtual events."
                       iconColor="#2984CE"
                       data={this.state.data}
                       ref={input => this.inputElement = input}
                       onClick={(val) => { this.searchFunc(val) }}
                       onCancel={() => { this.searchFunc('') }}
          />
          <br />
          <div style={{margin: "40px"}}/>
          <ExpansionPanel>
            <ExpansionPanelSummary
              //onClick={this.updateCalendarExpandText()}
              expandIcon={<ExpandMoreIcon style={{color: "#0072CE"}}/>}
            >
              <h5 style={{color: "#0072CE"}}>{this.getCalendarText()} Calendar</h5>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails style={{ width: "100%", paddingLeft:0, paddingRight:0 }}>
              <div style={{width: "100%"}}>
                <div style={{width: "100%", float:"left", marginBottom:"3%"}}>
                  <Calendar
                      views={["month"]}
                      localizer={localizer}
                      scrollToTime={new Date()}
                      events={this.state.myEventsList}
                      defaultView={"month"}
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
                        event: this.EventDisplay,
                        toolbar: CustomToolbar
                      }}
                      formats={{ eventTimeRangeFormat: () => null }}
                  />
                  {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event}/>}

                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div style={{margin: "40px"}}/>
          <div style= {{flexDirection: "column", display: "flex",width: "100%", marginBottom:"3%"}}>
              {this.state.myEventsList.map((ele, ind) => {
                    if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                      ele.tags = ['none']
                    }
                    //console.log(ele.id);
                    return (
                      //<ScrollableAnchor id={ele.id}>
                        <EventCard ele={ele} key={ind}/>
                      //</ScrollableAnchor>
                    );
                  }
              )}
              <div>{noSearchResults}</div>
          </div>
          <div>
            <Title color={"blue"} style={{textAlign:"left", fontSize:"2rem"}}>Want to do more?</Title>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
            <div style={{ textAlign: "left" }}>
              <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                            style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
            </div>
          </div>
          <footer className={classes.footerStyle}>
              <CustomButton href={"/events/add-new-event"} text={"Want to do more?"}
                            style={{fontSize: "13px"}} color={"blueRound"} size={"large"}/>
          </footer>
        </Template>
    );
  }
}



export default withStyles(useStyles)(EventsPageMobile);
