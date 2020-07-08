import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../events/react-big-calendar.css";
import { EventCardFeatured, EventCard, EventModal, Template, CustomButton, Title, EventSearch }
  from "../";
import firebase from "../../firebase";
import Fuse from 'fuse.js';
import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
  getOffset, getCurrentLocationForTimeZone, dst, convertTimestampToDate}
  from "../all/TimeFunctions"
import CustomToolbar from "../events/CalendarToolBar"
import ArrowForward from '@material-ui/icons/ArrowForwardIosOutlined';


const localizer = momentLocalizer(moment);
const useStyles = () => ({
  addNewButton: {
    boxShadow: "none",
    fontSize: 20
  },
  mainBox: {
    backgroundColor: "#3B5998",
    height: "345px",
    width: "107.2%",
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    paddingTop: "30px",
    marginLeft: "-4%"
  },
  mainText: {
    marginLeft: "10px",
    color:"white",
    textAlign: "left"
  },
  greenBox: {
    backgroundColor: "#F3FFEE",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F3FFEE",
    marginRight: "20px",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)"
  },
  greenText: {
    color:"#1BAE0E",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "10px"
  },
  blueBox: {
    backgroundColor: "#F2F9FD",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F2F9FD",
    marginRight: "20px",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)"
  },
  blueText: {
    color:"#0072CE",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "10px"
  },
  orangeBox: {
    backgroundColor: "#FDEEE5",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#FDEEE5",
    marginRight: "20px",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)"
  },
  orangeText: {
    color:"#FB750D",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "10px"
  },
  grayBox: {
    backgroundColor: "#BDBDBD",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#BDBDBD",
    marginRight: "0px",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)"
  },
  grayText: {
    color:"black",
    textAlign: "left",
    marginTop: "50px",
    marginLeft: "10px"
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
      eventSearch: [],
      eventSearchError: '',
      searchVal: "",
      defaultSearchInput:'',
      tagList: [],
      hiddenSearch: ''
    };
    this.getEvents();
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

  // TODO(claire): These are the new functions to use the Google Calendar API instead.
  // TODO (claire): The new event attributes: https://developers.google.com/calendar/v3/reference/events#resource
  // makeDisplayEvents(events) {
  //   let arr = [];
  //   for (let i = 0; i < events.length; i += 1) {
  //     let ele = events[i];
  //     if (ele.end > new Date().toISOString()) {
  //       arr.push(ele);
  //     }
  //     if (arr.length === 5) {
  //       break;
  //     }
  //   }
  //   return arr;
  // }

  // async getEvents() {
  //   getCalendarEvents((events) => {
  //     this.setState({ myEventsList: events, displayEvents: this.makeDisplayEvents(events) });
  //   })
  // }

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
      approvedEventsMap = approvedEvents.docs.map(doc => this.convertEventsTime(doc.data()));
    }
    approvedEventsMap.sort(function(a,b) {
      var dateA = a.start_date
      var dateB = b.start_date
      return ((dateA < dateB) ? -1 : 1)
    })
    this.setState({ myEventsList: this.makeEventsList(approvedEventsMap), tagList: this.genTagsList(approvedEventsMap), permEventsList: approvedEventsMap,
      displayEvents:this.makeDisplayEvents(approvedEventsMap) });
  }

  async addActiveTag(n)
  {
    if(this.state.activeTagList.includes(n))
    {
      await this.setState({activeTagList: this.state.activeTagList.filter(arrayItem => arrayItem !== n)})
    }
    else
    {
      await this.setState({activeTagList: this.state.activeTagList.concat(n)})
    }

    await this.setState({hiddenSearch : this.state.activeTagList.join(" ")})
    console.log(this.state.activeTagList)
    console.log( this.state.activeTagList.join(" "))
    this.props.onClick(this.state.searchVal, this.state.hiddenSearch)
  }

  searchFunc(val, hiddenSearchVal = '', changeDefaultSearchVal=true) {
    if(changeDefaultSearchVal){
      this.setState({defaultSearchInput:''});
    }
    if((!val || val.length===0) && (!hiddenSearchVal || hiddenSearchVal.length===0)) {
      return this.setState({eventSearch: [], activityIndicator: false, eventSearchError: '',
        myEventsList: this.makeEventsList(this.state.permEventsList)});
    }
    this.setState({activityIndicator:true});
    const options = {
      threshold:0.2,
      distance:10000,
      ignoreLocation: true,
      ignoreFieldNorm: true,
      findAllMatches: true,
      keys: ['name', 'tags', 'desc','event']

    };

    let searchList = this.state.permEventsList
    
    const fuse = new Fuse(searchList, options);
    let output = fuse.search(val)

    const eventSearch = output


    if(!eventSearch || eventSearch.length<=0){
      return this.setState({eventSearch:[], activityIndicator:false, eventSearchError:'No Results found',
        myEventsList: []});
    }
    let itemOn = 0
    const approvedEventsMap = eventSearch.map(doc => (eventSearch[itemOn++]['item']));
 
    // Update events. Note: we don't have to update time again b/c time is already updated
    this.setState({eventSearch:eventSearch, activityIndicator:false, eventSearchError:'',
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


  render() {
    const { classes } = this.props;
    let numEventsDisplayed = 0
    const MAX_EVENTS_DISPLAYED = (this.props.width - 200) / 490
    let sizeOfList = 0
    let noSearchResults = ""
    this.state.myEventsList.map((ele, ind) => {
      sizeOfList = sizeOfList + 1
    });
    if (sizeOfList === 0) {
      noSearchResults = "No events found for that search"
    }

    return (
      <Template active={"schedule"} title={"Events"}>

        <div className={classes.mainBox}>
            <div className={classes.mainText} style={{paddingLeft: "4%"}}>
              <h2 style={{fontSize: "2.5vw"}}>All Events</h2>
              <p style={{fontSize: "1.5vw"}}>Check out our virtual events!</p>
              <CustomButton href={"/events"} text={"SEE FEATURED"} endIcon={<ArrowForward/>}
                  style={{ marginTop: 10, marginBottom: 25, marginLeft: "-10px" }} color={"blue2"} size={"large"}/>
            </div>
            <div style= {{flexDirection: "row", display: "flex", marginLeft: "40px"}}>
              {this.state.displayEvents.map((ele, ind) => {
                  if (numEventsDisplayed < MAX_EVENTS_DISPLAYED) {

                    if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                      ele.tags = ['none']
                    }

                    numEventsDisplayed = numEventsDisplayed + 1
                    return (<EventCardFeatured ele={ele} key={ind}/>);
                  }
              })}
            </div>
        </div>

        <div style={{margin: "40px"}}/>

        <div style={{flexDirection: "row", display: "flex"}}>
          <div className={classes.greenBox}>
            <div className={classes.greenText}>
              <h4>Happening Now</h4>
            </div>
          </div>

          <div className={classes.blueBox}>
            <div className={classes.blueText}>
              <h4>Popular</h4>
            </div>
          </div>

          <div className={classes.orangeBox}>
            <div className={classes.orangeText}>
              <h4>Recurring</h4>
            </div>
          </div>

          <div className={classes.grayBox}>
            <div className={classes.grayText}>
              <h4>Past</h4>
            </div>
          </div>
        </div>

        <div style={{margin: "40px"}}/>

        <EventSearch placeholder="Search all virtual events."
                iconColor="#2984CE"
                data={this.state.data}
                ref={input => this.inputElement = input}
                tagList = {this.state.tagList}
                onClick={(val, hiddenSearch) => { this.searchFunc(val, hiddenSearch) }}
                onCancel={() => { this.searchFunc('') }}
        />
        
        <br />
        <div style={{margin: "40px"}}/>
        <div style={{width: "100%"}}>
          <div style={{width: "25%", float:"left", marginBottom:"3%"}}>
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


            <Title color={"blue"} style={{textAlign:"left", fontSize:"2rem"}}>Want to do more?</Title>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
            <div style={{ textAlign: "left" }}>
              <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                            style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
            </div>
          </div>
          <div style= {{flexDirection: "column", display: "flex", paddingTop:"3%", paddingLeft: "3%", width: "75%",
            marginBottom:"3%"}}>
            {this.state.myEventsList.map((ele, ind) => {
              if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                ele.tags = ['none']
              }
              return (<EventCard ele={ele} key={ind}/>);
            }
            )}
            <div>{noSearchResults}</div>
          </div>
        </div>

      </Template>
    );
  }
}



export default withStyles(useStyles)(EventsPageDesktop);
