import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../events/react-big-calendar-mobile.css";
import { Link, Element, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { EventCardFeatured, EventCard, EventModal, Template, CustomButton, Title, EventSearch }
  from "../";
import firebase from "../../firebase";
import Fuse from 'fuse.js';
import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
  getOffset, getCurrentLocationForTimeZone, dst, convertTimestampToDate}
  from "../all/TimeFunctions"
import CustomToolbar from "../events/CalendarToolBarMobile"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import EventSearchMobile from "../input/EventSearchMobile";
import Carousel from 'react-material-ui-carousel';
import {CircularProgress} from "@material-ui/core";
import {configureAnchors} from 'react-scrollable-anchor';
configureAnchors({offset: -120});

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
    marginLeft: "-4%",
    marginBottom: "20px"
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
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F3FFEE",
    padding: 0,
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  greenBoxSelected: {
    backgroundColor: "white",
    height: "82px",
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#1BAE0E",
    padding: 0,
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
  },
  greenText: {
    color:"#1BAE0E",
    textAlign: "left",
    marginTop: "25px",
    marginLeft: "5px",
    fontSize: "14px"
  },
  blueBox: {
    backgroundColor: "#F2F9FD",
    height: "82px",
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#F2F9FD",
    padding: 0,
    marginLeft: "5%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  blueBoxSelected: {
    backgroundColor: "white",
    height: "82px",
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#0072CE",
    padding: 0,
    marginLeft: "5%",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
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
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#FDEEE5",
    padding: 0,
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  orangeBoxSelected: {
    backgroundColor: "white",
    height: "82px",
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#FB750D",
    padding: 0,
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
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
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#BDBDBD",
    padding: 0,
    marginLeft: "5%",
    boxShadow: "2px 2px 48px rgba(0, 0, 0, 0.1)"
  },
  grayBoxSelected: {
    backgroundColor: "white",
    height: "82px",
    width: "200px",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "black",
    padding: 0,
    marginLeft: "5%",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
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
  },
  blueLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "lightblue"
  },
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
      calendarExpandText: "Show",
      tagList: [],
      organizationList:[],
      dateList:[{"date": "This Month Only"}, {"date": "Within a Week"}, {"date": "Within a Month"}, {"date": "Within 3 Months"}, {"date": "All"}],
      hiddenSearch: '',
      mainTagsClicked: {past: "", recurring: "", popular: "", now: ""},
      filterTagsClicked: {},
      clubFilter: "All",
      dateFilter: "All",
      loadingEvents: true,
    };
    this.getEvents();
    this.closeDo = this.closeDo.bind(this);
    this.handleMainTags = this.handleMainTags.bind(this);
    this.updateFilterTags = this.updateFilterTags.bind(this);
    this.updateOrganization = this.updateOrganization.bind(this);
    this.updateDateFilter = this.updateDateFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
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

    this.setState({ myEventsList: this.makeEventsList(approvedEventsMap), tagList: this.genTagsList(approvedEventsMap),
      organizationList: this.genOrganizationList(approvedEventsMap),
      permEventsList: approvedEventsMap,
      displayEvents:this.makeDisplayEvents(approvedEventsMap),
      loadingEvents: false });
  }

  searchFunc(val, changeDefaultSearchVal=true) {
    if(changeDefaultSearchVal){
      this.setState({defaultSearchInput:''});
    }
    if(!val || val.length===0) {
      return this.setState({eventSearchMobile: [], activityIndicator: false, eventSearchMobileError: '',
        myEventsList: this.makeEventsList(this.state.permEventsList)});
    }
    this.setState({activityIndicator:true, loadingEvents:true});
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
    this.setState({eventSearchMobile:eventSearchMobile, activityIndicator:false, eventSearchMobileError:'', loadingEvents:false,
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
    let nowStyle = {
      backgroundColor: "#F3FFEE"
    }
    let pastStyle = {
      backgroundColor: "#BDBDBD"
    }
    let popularStyle = {
      backgroundColor: "#F2F9FD"
    }
    let recurringStyle = {
      backgroundColor: "#FDEEE5"
    }

    if (event.displayNow) {
      return {style: nowStyle};
    }
    else if (event.displayPast) {
      return {style: pastStyle};
    }
    else if (event.displayPopular) {
      return {style: popularStyle};
    }
    else if (event.displayRecurring) {
      return {style: recurringStyle};
    }
    else {
      return {style: style};
    }
  }

  EventDisplay = ({ event }) => (
      <div style={{height:"1.2em"}}>
        <div style={{ fontSize: ".7em" }}>{event.event === undefined ? event.title : event.event}</div>
      </div>
  );

  handleMainTags(tag) {
    let newList = this.state.mainTagsClicked
    if (newList[tag] === "on") {
      newList[tag] = ""
    } else {
      newList[tag] = "on"
    }
    this.setState({mainTagsClicked: newList})
  }

  isEventShowable(ele) {
    ele.tagsForFilter = this.state.mainTagsClicked
    // Handle main tags filter
    let shouldDisplayRecurring = ele["tagsForFilter"].recurring === "on" ? true : false
    let shouldDisplayPopular = ele["tagsForFilter"].popular === "on" ? true : false
    let shouldDisplayPast = ele["tagsForFilter"].past === "on" ? true : false
    let shouldDisplayNow = ele["tagsForFilter"].now === "on" ? true : false

    ele.displayThisCard = true
    if (!ele.displayPopular && shouldDisplayPopular)
      ele.displayThisCard = false
    if (!ele.displayNow && shouldDisplayNow)
      ele.displayThisCard = false
    if (!ele.displayRecurring && shouldDisplayRecurring)
      ele.displayThisCard = false
    if (!ele.displayRecurring && shouldDisplayRecurring)
      ele.displayThisCard = false
    if (!ele.displayPast && shouldDisplayPast)
      ele.displayThisCard = false
    if (ele.displayThisCard && ele.displayPast && !shouldDisplayPast)
      ele.displayThisCard = false

    // Process regular tag filter
    let filterPass = true
    if (ele.displayThisCard === true) {
      Object.keys(this.state.filterTagsClicked).map(x => {
        let found = false
        console.log(x)
        if (this.state.filterTagsClicked[x] !== undefined) {
          ele.tags.map(y => {
            if (x.toLowerCase() === y.toLowerCase()) {
              found = true
            }
          })

          if (found === false) {
            filterPass = false
          }
        }
      })
    }

    if (filterPass === false) {
      ele.displayThisCard = false
    }

    // Handle Organization
    if (this.state.clubFilter !== "All") {
      if (this.state.clubFilter !== ele.name)
        ele.displayThisCard = false
    }

    // Handle date
    if (this.state.dateFilter !== "All") {
      let d = new Date()
      const daysApart = Math.abs((ele.start_date.getTime() - d.getTime()) / (3600*24*1000))
      console.log(daysApart)
      switch(this.state.dateFilter) {
        case "This Month Only":
          if (ele.start_date.getMonth() !== d.getMonth() || ele.start_date.getFullYear() !== d.getFullYear())
            ele.displayThisCard = false
        case "Within a Week":
          if (daysApart > 7)
            ele.displayThisCard = false
        case "Within a Month":
          if (daysApart > 30)
            ele.displayThisCard = false
        case "Within 3 Months":
          if (daysApart > 90)
            ele.displayThisCard = false
      }
    }
    return ele.displayThisCard
  }

  updateOrganization(club) {
    this.setState({clubFilter: club})
  }
  updateDateFilter(date) {
    this.setState({dateFilter: date})
  }
  resetFilter() {
    this.setState({
      eventSearchError: '',
      searchVal: "",
      defaultSearchInput: '',
      hiddenSearch: '',
      mainTagsClicked: {past: "", recurring: "", popular: "", now: ""},
      filterTagsClicked: {},
      clubFilter: "All",
      dateFilter: "All"
    });
    this.searchFunc('')
  }

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


  async componentDidMount() {
    await this.getEvents();
    let event = this.props.event
    // goToAnchor(event, true);
    if (event){
      console.log(event);
      scroller.scrollTo(event, {
        // duration: 1500,
        // delay: 100,
        smooth: true,
        // containerId: 'ContainerElementID',
        offset: -100, // Scrolls to element + 50 pixels down the page
      })
    }
  }

getCalendarText() {
  return this.state.calendarExpandText;
}

  genTagsList(eventsMap)
  {
    let tagsList = new Set()
    eventsMap.map(x => (x.tags.map(y =>
        tagsList.add(y.toUpperCase().trim())
    )))
    tagsList.delete("")
    return Array.from(tagsList).sort(function(a, b) {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    })
  }

  genOrganizationList(eventsMap)
  {
    let organizations = []
    eventsMap.map(x => {
      if (x.displayNameToggleOff === undefined)
        organizations.push({"name": x.name.trim()})
    })
    let sorted = organizations.sort(function(a, b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })
    let all = []
    all.push({"name": "All"})
    sorted.map(x => all.push(x))
    return all
  }

  updateFilterTags(tag) {
    let x = this.state.filterTagsClicked
    if (x[tag] === undefined) {
      x[tag] = tag
    } else {
      x[tag] = undefined
    }
    this.setState({filterTagsClicked: x})
  }

  render() {
    const { classes } = this.props;

    // Prepare featured events
    const MAX_EVENTS_DISPLAYED = 4
    let numEventsDisplayed = 0
    let featuredEvents = {}
    {this.state.displayEvents.map((ele) => {
      if (numEventsDisplayed < MAX_EVENTS_DISPLAYED) {
        numEventsDisplayed = numEventsDisplayed + 1
        if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
          ele.tags = ['none']
        }

        featuredEvents[ele.id] = ele
      }
    })}

    // See how many events we are displaying even with filter
    let sizeOfList = 0
    let noSearchResults = ""
    let eventsList = []
    this.state.myEventsList.map((ele, ind) => {
      if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
        ele.tags = ['none']
      }

      if (this.isEventShowable(ele)) {
        sizeOfList = sizeOfList + 1
        if (ele.displayNameToggleOff)
          ele.name = "Columbia Virtual Campus"
        if (ele.id === this.props.event)
          ele.openModal = true
        eventsList.push(ele)
      }
    });
    if (sizeOfList === 0) {
      noSearchResults = "No events found for that search"
    }
    console.log("Size: " + sizeOfList)

    let grayBox = this.state.mainTagsClicked.past === "on" ? classes.grayBoxSelected : classes.grayBox
    let blueBox = this.state.mainTagsClicked.popular === "on" ? classes.blueBoxSelected : classes.blueBox
    let orangeBox = this.state.mainTagsClicked.recurring === "on" ? classes.orangeBoxSelected : classes.orangeBox
    let greenBox = this.state.mainTagsClicked.now === "on" ? classes.greenBoxSelected : classes.greenBox

    return (
        <Template active={"schedule"} title={"Events"}>

          <div className={classes.mainBox}>
            <div className={classes.mainText} style={{paddingLeft: "20%", paddingRight: "20%"}}>
              <h2 style={{fontSize:26}}>Featured Events</h2>
              <p style={{fontSize: 14}}>Some of our most popular upcoming events, activities, and discussions, to keep on your radar.
                <br /> <br />
                Register ASAP. Limited seats available for some events.
              </p>
            </div>
            <div style={{align: "center"}}>
            <Carousel>
                {Object.keys(featuredEvents).map((ele) => {
                    return (
                        <a href={"#" + ele}
                           style={{overflow:'hidden', width: "100%"}}>
                          <EventCardFeatured ele={featuredEvents[ele]} key={ele}/> <br />
                      </a>
                    );
                })}
            </Carousel>
            </div>
          </div>

          <div style={{margin: "40px"}}/>
          <Element name= "startEvents" id={"startEvents"} />
          <div style={{flexDirection: "row", display: "flex"}}>
            <a href={"#startEvents"} className={greenBox}
               onClick={(tag) => { this.handleMainTags("now") }}
               style={{cursor: "pointer"}}>
              <div className={classes.greenText}>
                <h4>Happening<br />Now</h4>
              </div>
            </a>

            <a href={"#startEvents"} className={blueBox}
               onClick={(tag) => { this.handleMainTags("popular") }}
               style={{cursor: "pointer"}}>
              <div className={classes.blueText}>
                <h4>Popular</h4>
              </div>
            </a>
          </div>

          <div style={{margin: "20px"}}/>
          <div style={{flexDirection: "row", display: "flex"}}>
            <a href={"#startEvents"} className={orangeBox}
               onClick={(tag) => { this.handleMainTags("recurring") }}
               style={{cursor: "pointer"}}>
              <div className={classes.orangeText}>
                <h4>Recurring</h4>
              </div>
            </a>

            <a href={"#startEvents"} className={grayBox}
               onClick={(tag) => { this.handleMainTags("past") }}
               style={{cursor: "pointer"}}>
              <div className={classes.grayText}>
                <h4>Past</h4>
              </div>
            </a>
          </div>

          <div style={{margin: "40px"}}/>

          <EventSearchMobile placeholder="Search all virtual events."
             iconColor="#2984CE"
             data={this.state.data}
             ref={input => this.inputElement = input}
             tagList = {this.state.tagList}
             organizationList = {this.state.organizationList}
             dateList = {this.state.dateList}
             updateTags={(tag) => { this.updateFilterTags(tag) }}
             updateClub={(club) => { this.updateOrganization(club) }}
             updateDate={(date) => { this.updateDateFilter(date) }}
             resetFilter={() => { this.resetFilter() }}
             onClick={(val, hiddenSearch) => { this.searchFunc(val, hiddenSearch) }}
             onCancel={() => { this.searchFunc('') }}
          />
          <br />
          <div style={{margin: "20px"}}/>
          <ExpansionPanel style={{boxShadow: "none", border: "none", borderBottom: "solid 1px rgba(185, 217, 235, 0.5)",
           display: "inline-block", width: "100%", textAlign: "right"}}>
            <ExpansionPanelSummary
              //onClick={this.updateCalendarExpandText()}
              expandIcon={<ExpandMoreIcon style={{color: "#0072CE"}}/>}
            >
                <h5 style={{textAlign: "left", display: "inline", width: "53%", marginTop: "13px",
                  color: "#828282", fontSize: "14px", lineHeight: "21px"}}> {sizeOfList} events found</h5>
                <h5 style={{textAlign: "right", color: "#0072CE"}}>{this.getCalendarText()} Calendar</h5>

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
          <div style={{margin: "00px"}}/>

          <div style= {{flexDirection: "column", display: "flex",width: "100%", marginBottom:"3%"}}>
              {this.state.loadingEvents && <CircularProgress style={{ marginLeft: '50%' }} />}
              {!this.state.loadingEvents && eventsList.map((ele) => {
                    if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                      ele.tags = ['none']
                    }
                    return (
                        <Element name={ele.id} >
                          <div id={ele.id} style={{borderBottom: "solid 3px #E7E7E7"}}>
                              <EventCard ele={ele} key={ele.id}/>
                            </div>
                        </Element>

                    );
                  }
              )}
              <div>{!this.state.loadingEvents && noSearchResults}</div>
          </div>
          <footer className={classes.footerStyle}>
              <CustomButton href={"/socalize/add-new-event"} text={"Want to add an event?"}
                            style={{fontSize: "11px"}} color={"blueRound"} size={"large"}/>
          </footer>
        </Template>
    );
  }
}



export default withStyles(useStyles)(EventsPageMobile);
