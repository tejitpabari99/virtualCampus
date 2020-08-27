
import React, { useState } from "react";
import classNames from "classnames";
import { cardTitle } from "../../../assets/material-kit-assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton, AddCalendar, CustomTheme } from "../../";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import GridItem from "../../material-kit-components/Grid/GridItem.js";
import GridContainer from "../../material-kit-components/Grid/GridContainer.js";
//import EventModal from "./../EventModal";
import EventModalMobile from "./../EventModalMobile";
//import EventEmailModal from "./../EventEmailModal";
import {handleEventClick} from "../../events/SharedEvents"

const theme = CustomTheme;

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

const days = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT"
}

const formatTime = function(hours, min) {
  let h = hours > 12 ? hours - 12 : hours;
  let m = min < 10 ? "0" + min.toString() : min.toString();
  let add = hours > 12 ? "PM" : "AM";
  return h + ":" + m + add;
};

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "none",
    // marginTop: "0px",
    // marginBottom: "5px",
    paddingTop: '15px',
    paddingBottom:'15px',
    margin:0
  },
  nameHeader: {
    fontSize: '14px',
    lineHeight: "21px",
    position: "relative",
    color: "black",
    marginLeft: "-5px",
    marginRight: "-30px"
  },
  orgHeader: {
    fontSize: '10px',
    lineHeight: "15px",
    color: '#0072CE',
    marginLeft: "-5px",
    paddingBottom: "5px"
  },
  eventTitle: {
    color: "black",
    position: "relative",
    fontSize: 25
  },
  eventHost: {
    color: "#0072CE",
    position: "relative",
    fontSize: 20,
    display: "inline"
  },
  timeInfo: {
    color: "gray",
    marginTop: "1px",
    fontSize: "10px"
  },
  tagInfo: {
    marginTop: "8px",
    marginLeft: "-5px",
    paddingTop: "2px"
  },
  tagBlock: {
    display: 'inline-block',
    fontSize: '10px',
    backgroundColor: '#F2F2F2',
    marginLeft: "-3px",
    marginRight: "7px",
    marginBottom: "7px",
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
  },
  happeningBlock: {
    display: 'inline-block',
    fontSize: '10px',
    backgroundColor: '#F3FFEE',
    marginLeft: "-5px",
    marginRight: "7px",
    marginBottom: "7px",
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
    color: "#1BAE0E",
    position: "relative"
  },
  pastBlock: {
    display: 'inline-block',
    fontSize: '10px',
    backgroundColor: '#BDBDBD',
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
    marginRight: "10px",
  },
  popularBlock: {
    display: 'inline-block',
    fontSize: '10px',
    backgroundColor: '#F2F9FD',
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
    color: "#0072CE",
    marginRight: "10px",
  },
  recurringBlock: {
    display: 'inline-block',
    fontSize: '10px',
    marginLeft: '10px',
    backgroundColor: '#FDEEE5',
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
    color: "#1BAE0E",
    position: "relative"
  },
  cardbody: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  flexBox: {
    flexDirection: "column",
    marginLeft: "10px",
    marginTop: "3px",
    marginBottom: "3px",
  },
  flexBox2: {
    flexDirection: "column"
  },
  imageBox: {
    top: "3vw",
    backgroundColor: "#F2F9FD",
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
    borderRadius: "5.51px",
    height: "5vw",
    width: "5%"
  },
  dateBox: {
    marginLeft: "1px",
    marginTop: "15px",
    marginRight: "15px",
    width: "100%"
  },
  dateText: {
    color: "#0072CE",
    fontSize: "14px",
    fontWeight: "light",
    marginLeft: "2px",
  },
  weekText: {
    fontWeight: 700,
    color: "#0072CE",
    fontSize: "14px",
  },
  monthText: {
    color: "#0072CE",
    fontSize: "1.3vw",
    textAlign: "center",
    margin: 0,
  },
  image: {
    borderRadius: "5px",
    height: "70px",
    width: "70px",
    display: "inline-block",
    objectFit: "cover"
  },
  verticalLine: {
    borderLeft: "1px solid rgba(185, 217, 235, 0.5)",
    height: "90px",
    marginTop: "10px",
    marginBottom: "10px"
  },
  blueLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(185, 217, 235, 0.5)",
    marginTop: "10px"
  },
  websiteButton: {
    position: "absolute",
    bottom: 0,
    width: "150px",
    height: "35px"
  },
  joinButton: {
    width: "150px",
    height: "35px",
    marginTop: "6px"
  }
}));

export default function EventCardDesktopBottom({ ele }) {

  const classes = useStyles();

  const [open, setOpen] = useState(ele.openModal);

  const openModalHandler = () => {
    setOpen(true)
  }

  const handlePopularity = () => {
    //handleEventClick(ele, 1)
  }

  const closeDo = () => {
    setOpen(false);
  }

  return (

    <div style={{ width: "100%" }}>
        <GridContainer onClick={openModalHandler}
                       style={{ width: "100%", marginLeft: '0', marginRight: '0', marginTop: '0', marginBottom: '0'}}>
            <GridItem xs={3} sm={3} md={3} style={{paddingRight:"0px", paddingLeft: "3px"}}>
                <div className={classes.dateBox}>
                  <div style={{display: "inline"}}>
                    <div className={classes.weekText} style={{display: "inline"}}>{days[ele.start_date.getDay()]} </div>
                    <div className={classes.dateText} style={{display: "inline"}}>{ele.start_date.getDate()} {months[ele.start_date.getMonth()]}</div>
                  </div>
                    {/* <p className={classes.monthText}></p> */}
                    <br/>
                    <div className={classes.timeInfo}>
                        {formatTime(ele.start_date.getHours(), ele.start_date.getMinutes())} -
                        {formatTime(ele.end_date.getHours(), ele.end_date.getMinutes())} {ele.timeZoneGMT}
                    </div>
                </div>
            </GridItem>

            <GridItem xs={1} sm={1} md={1}>
                <div className={classes.verticalLine}/>
            </GridItem>

            <GridItem xs={7} sm={7} md={7} style={{paddingRight: "0px"}}>
                <div className={classes.tagInfo}>
                  {ele.displayNow && <div className={classes.happeningBlock}>Happening Now!</div>}
                  {ele.displayPast && <div className={classes.pastBlock}>Past</div>}
                  {ele.displayRecurring && <div className={classes.recurringBlock}>Recurring</div>}
                  {ele.displayPopular && <div className={classes.popularBlock}>Popular</div>}

                  {ele.tags.map((ta, ind) => {
                    if (ta !== "") {
                      return (
                          <div className={classes.tagBlock}>{ta}</div>
                      );
                    }
                  })}

                  <div className={classes.nameHeader}> {ele.event} </div>
                  <div className={classes.orgHeader}>{ele.name}</div>
                </div>
            </GridItem>
          </GridContainer>
          {open && <EventModalMobile open={open} closeDo={closeDo} event={ele}/>}
    </div>
  );
}
