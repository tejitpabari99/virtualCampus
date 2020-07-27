import React from "react";
import { isEdge, isIE, isMobile, isTablet } from "react-device-detect";
import { EventsPageDesktop, EventsPageMobile } from '../components';
import queryString from 'query-string';
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: -1, goToEvent: "" };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        let query = queryString.parse(this.props.location.search);
        const {event} = query;
        this.setState({goToEvent: event})
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    // TODO: Remove duplicate code in HomeDesktop.js and HomeMobile.js
    render() {
        if (this.state.height === -1) {
            return (
                <div>
                    <EventsPageDesktop/>
                </div>
            );
        }
        {/* For mobile's screen orientation update */}
        const isLandscape = this.state.width > this.state.height ? true : false;
        {/* If Tablet:
            If in portrait, do mobile component
            else render desktop
            */}
        if (isTablet) {
            if (isLandscape) {
                return (
                    <div>
                        <EventsPageDesktop width={this.state.width} event={this.state.goToEvent}/>
                    </div>
                );
            } else {
                return (
                    <div>
                        <EventsPageMobile isLandscape={isLandscape} width={this.state.width} event={this.state.goToEvent}/>
                    </div>
                );
            }
            {/* For mobile component : IE or Edge must go to mobile since they do not support all css */}
        } else if (isMobile || (isLandscape === false && this.state.height > 700) || isIE || isEdge) {
            return (
                <div>
                    <EventsPageMobile isLandscape={isLandscape} width={this.state.width} event={this.state.goToEvent}/>
                </div>
            );
            {/* Else: desktop: isBrowser
            If screen is full size and not weirdly shape: render desktop version
            Else render mobile version (see above)
            */}
        } else {
            return (
                <div>
                    <EventsPageDesktop width={this.state.width} event={this.state.goToEvent}/>
                </div>
            );
        }
    }
}
export default Events;
/*=======
    this.setState({activityIndicator:true});
    const options = {
      threshold:0.2,
      distance:1000,
      keys: ['tags', 'name', "event"]
    };
    const fuse = new Fuse(this.state.permEventsList, options);
    const output = fuse.search(val);
    const eventSearch = output;
    if(!eventSearch || eventSearch.length<=0){
      return this.setState({eventSearch:[], activityIndicator:false, eventSearchError:'No Results found',
                                myEventsList: []});
    }
    let itemOn = 0
    const approvedEventsMap = eventSearch.map(doc => (eventSearch[itemOn++]['item']));
    // Update events. Note: we don't have to update time again b/c time is already updated
    this.setState({eventSearch:eventSearch, activityIndicator:false, eventSearchError:'',
                         myEventsList: approvedEventsMap});
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
      <div style={{ fontSize: ".7em" }}>{event.event}</div>
    </div>
  );
  getMonthName() {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[d.getMonth()];
  }
  render() {
    const { classes } = this.props;
    const date = new Date();
    return (
      <Template active={"schedule"} title={"Events"}>
        <Title color={"blue"}>All Events</Title>
        <div style={{ textAlign: "center" }}>
          <CustomButton href={"/events/add-new-event"} text={"ADD NEW EVENT"}
                        style={{ marginTop: 20, marginBottom: 25 }} color={"orange"} size={"large"}/>
        </div>
        {Object.keys(this.state.displayEvents).length > 0 &&
        <div style={{ marginBottom: "5%" }}>
          <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "20px", fontWeight: 100 }}> {this.getMonthName()} {date.getFullYear()}</h3>
          <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3 }}/>
          {Object.keys(this.state.displayEvents).map((k, ind) => {
              return (
                <ScrollableAnchor id={k}>
                  <EventCard ele={this.state.displayEvents[k]} key={k}/>
                </ScrollableAnchor>
                );
          })}
        </div>}
        <Search placeholder="Search Events by Name and/or Tags"
                iconColor="#2984CE"
                data={this.state.data}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}
        /><br />
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
          style={{ height: 550, marginTop: 50 }}
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
      </Template>
    );
  }
}
export default withStyles(useStyles)(Events);
>>>>>>> master*/