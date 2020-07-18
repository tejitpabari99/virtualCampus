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
import ScrollableAnchor, {goToAnchor} from "react-scrollable-anchor";


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
    marginRight: "10px",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  greenText: {
    color:"#1BAE0E",
    textAlign: "left",
    marginTop: "30px",
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
    marginRight: "10px",
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
    marginRight: "10px",
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
    marginRight: "0px",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  grayText: {
    color:"black",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "5px"
  },

});
class EventsPageDesktop extends React.Component {
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
      defaultSearchInput:''
    };
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

  genTagsList(eventsMap)
  {
    let tagsList = new Set()
    eventsMap.map(x => (x.tags.map(y => tagsList.add(y))))
    tagsList.delete("")
    return Array.from(tagsList);
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
        let event = this.convertEventsTime(doc.data())
        event["id"] = doc.id
        return event
      });
    }
    approvedEventsMap.sort(function(a,b) {
      var dateA = a.start_date
      var dateB = b.start_date
      return ((dateA < dateB) ? -1 : 1)
    })

    this.setState({ myEventsList: this.makeEventsList(approvedEventsMap), tagList: this.genTagsList(approvedEventsMap), permEventsList: approvedEventsMap,
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


  async componentDidMount() {
    await this.getEvents();
    goToAnchor(this.props.event, true);
  }

  clickFeaturedEvent(eventId) {
    goToAnchor(eventId, true);
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
              <p style={{fontSize: "14px"}}>Check out our virtual events!</p>
              <CustomButton href={"/events"} text={"SEE FEATURED"} endIcon={<ArrowForward/>}
                            style={{ fontSize: "14px", marginTop: 10, marginLeft: "-2.5px" }} color={"blue2"} size={"large"}/>
            </div>
            <div style= {{flexDirection: "column", display: "flex", marginLeft: "15%", marginRight:"15%"}}>
              {this.state.displayEvents.map((ele, ind) => {
                if (numEventsDisplayed < MAX_EVENTS_DISPLAYED) {

                  if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                    ele.tags = ['none']
                  }

                  numEventsDisplayed = numEventsDisplayed + 1
                  return (<EventCardFeatured ele={ele} onClick={this.clickFeaturedEvent(ele.id)} style={{cursor:"pointer"}}/>);
                }
              })}
            </div>
          </div>

          <div style={{margin: "40px"}}/>

          <div style={{flexDirection: "row", display: "flex"}}>
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
          </div>

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
              expandIcon={<ExpandMoreIcon style={{color: "#0072CE"}}/>}
            >
              <h5 style={{color: "#0072CE"}}>Show Calendar</h5>
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
                    return (<ScrollableAnchor id={ele.id}>
                              <EventCard ele={ele} key={ele.id}/>
                            </ScrollableAnchor>
                    );
                  }
              )}
              <div>{noSearchResults}</div>
          </div>

          <Title color={"blue"} style={{textAlign:"left", fontSize:"2rem"}}>Want to do more?</Title>
          <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
          <div style={{ textAlign: "left" }}>
            <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                          style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
          </div>


        </Template>
    );
  }
}



export default withStyles(useStyles)(EventsPageDesktop);
