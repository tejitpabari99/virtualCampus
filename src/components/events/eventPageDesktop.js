import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../events/react-big-calendar.css";
import { Link, Element, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { EventCardFeatured, EventCard, EventModal, Template, CustomButton, Title, EventSearch }
  from "../";
import firebase from "../../firebase";
import Fuse from 'fuse.js';
import {getTimezoneName, convertUTCToLocal, convertDateToUTC,
  getOffset, getCurrentLocationForTimeZone, dst, convertTimestampToDate}
  from "../all/TimeFunctions"
import CustomToolbar from "../events/CalendarToolBar"
import {CircularProgress} from "@material-ui/core";
import ScrollableAnchor from 'react-scrollable-anchor';
import {configureAnchors} from 'react-scrollable-anchor';
configureAnchors({offset: -100});

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
  greenBoxSelected: {
    backgroundColor: "white",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#1BAE0E",
    marginRight: "20px",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
  },
  greenText: {
    color:"#1BAE0E",
    textAlign: "left",
    marginTop: "60px",
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
  blueBoxSelected: {
    backgroundColor: "white",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#0072CE",
    marginRight: "20px",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
  },
  blueText: {
    color:"#0072CE",
    textAlign: "left",
    marginTop: "60px",
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
  orangeBoxSelected: {
    backgroundColor: "white",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#FB750D",
    marginRight: "20px",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
  },
  orangeText: {
    color:"#FB750D",
    textAlign: "left",
    marginTop: "60px",
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
  grayBoxSelected: {
    backgroundColor: "white",
    height: "100px",
    width: "25%",
    borderStyle: "solid",
    borderRadius: "10px",
    borderColor: "#515151",
    marginRight: "0px",
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.1)"
  },
  grayText: {
    textAlign: "left",
    marginTop: "60px",
    color: "#515151",
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
      organizationList:[],
      dateList:[{"date": "This Month Only"}, {"date": "Within a Week"}, {"date": "Within a Month"}, {"date": "Within 3 Months"}, {"date": "All"}],
      hiddenSearch: '',
      mainTagsClicked: {past: "", recurring: "", popular: "", now: ""},
      filterTagsClicked: {},
      clubFilter: "All",
      dateFilter: "This Month Only",
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
    this.setState({activityIndicator:true, loadingEvents:true});
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
    this.setState({eventSearch:eventSearch, activityIndicator:false, eventSearchError:'', loadingEvents: false,
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
      dateFilter: "This Month Only"
    });
    this.searchFunc('')
  }

  render() {
    const { classes } = this.props;
    let numEventsDisplayed = 0
    const MAX_EVENTS_DISPLAYED = (this.props.width - 200) / 490
    let sizeOfList = 0
    let noSearchResults = ""
    let eventsList = []
    console.log(this.state.filterTagsClicked)
    this.state.myEventsList.map((ele, ind) => {
      if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
        ele.tags = ['none']
      }

      if (this.isEventShowable(ele)) {
        sizeOfList = sizeOfList + 1
        if (ele.displayNameToggleOff)
          ele.name = "Columbia Virtual Campus"
        eventsList.push(ele)
      }
    });
    if (sizeOfList === 0) {
      noSearchResults = "No events found for that search"
    }

    let grayBox = this.state.mainTagsClicked.past === "on" ? classes.grayBoxSelected : classes.grayBox
    let blueBox = this.state.mainTagsClicked.popular === "on" ? classes.blueBoxSelected : classes.blueBox
    let orangeBox = this.state.mainTagsClicked.recurring === "on" ? classes.orangeBoxSelected : classes.orangeBox
    let greenBox = this.state.mainTagsClicked.now === "on" ? classes.greenBoxSelected : classes.greenBox

    return (
      <Template active={"schedule"} title={"Events"}>

        <div className={classes.mainBox} style={{paddingLeft:"10%", paddingRight:"10%"}}>
          <div className={classes.mainText} style={{paddingLeft: "4%", width:500}}>
            <h2 style={{fontSize:40}}>Featured Events</h2>
            <p style={{fontSize: 20}}>Some of our most popular upcoming events, activities, and discussions, to keep on your radar.
              <br /> <br />
              Register ASAP. Limited seats available for some events.
            </p>
          </div>
          <div style= {{flexDirection: "row", display: "flex", marginLeft: "40px"}}>
            {this.state.displayEvents.map((ele, ind) => {
              if (numEventsDisplayed < MAX_EVENTS_DISPLAYED) {

                if ((ele.tags !== undefined && ele.tags[0] !== undefined) === false) {
                  ele.tags = ['none']
                }
                numEventsDisplayed = numEventsDisplayed + 1
                return (<a href={"#" + ele.id} >
                  <EventCardFeatured ele={ele} key={ind} />
                </a>);
              }
            })}
          </div>
        </div>

      <Element name= "startEvents" id={"startEvents"} />

      <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: "1500px"}}>
        <div style={{margin: "40px"}}/>

        <div style={{flexDirection: "row", display: "flex"}}>
          <a href={"#startEvents"} className={greenBox}
               onClick={(tag) => { this.handleMainTags("now") }}
               style={{cursor: "pointer"}}>
            <div className={classes.greenText}>
              <h4>Happening Now</h4>
            </div>
          </a>

          <a href={"#startEvents"} className={blueBox}
               onClick={(tag) => { this.handleMainTags("popular") }}
               style={{cursor: "pointer"}}>
            <div className={classes.blueText}>
              <h4>Popular</h4>
            </div>
          </a>

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

        <EventSearch placeholder="Search all virtual events."
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


            <Title color={"blue"} style={{textAlign:"left", fontSize:"2rem"}}>Looking for people who share <strong>your</strong> interests?</Title>
            <h5>1. Submit a topic and time using our form.</h5>
            <h5>2. Let us host and share the event on our website.</h5>
            <h5>3. Share your interest with your friends, meet new people, and have fun!</h5>
            <div style={{ textAlign: "left" }}>
              <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                            style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
            </div>
          </div>
          <div style= {{flexDirection: "column", display: "flex", paddingTop:"1%", paddingLeft: "3%", width: "75%",
            marginBottom:"3%"}}>
            <div style={{paddingBottom: "1%", color: "#828282", fontSize: "18px"}}> {sizeOfList} Events Found </div>
            {this.state.loadingEvents && <CircularProgress style={{ marginLeft: '50%' }} />}
            {!this.state.loadingEvents && eventsList.map((ele) => {

                return (
                    <ScrollableAnchor >
                      <Element name={ele.id}>
                        <div id={ele.id} style={{paddingBottom: "30px"}}>
                            <EventCard ele={ele} key={ele.id}/>
                        </div>
                      </Element>
                    </ScrollableAnchor>
                );

            }
            )}
            <div>{!this.state.loadingEvents && noSearchResults}</div>
          </div>
        </div>
      </div>
      </Template>
    );
  }
}



export default withStyles(useStyles)(EventsPageDesktop);
