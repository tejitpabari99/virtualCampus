
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
import EventModal from "./../EventModal";
//import EventModalMobile from "./../EventModalMobile";
//import EventEmailModal from "./../EventEmailModal";

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
  },
  orgHeader: {
    fontSize: '10px',
    lineHeight: "15px",
    color: '#0072CE',
    marginLeft: "-5px",
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
  },
  tagBlock: {
    display: 'inline-block',
    fontSize: '10px',
    backgroundColor: '#F2F2F2',
    marginLeft: "-5px",
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
    marginLeft: "3px",
    marginTop: "15px",
    marginRight: "15px"
  },
  dateText: {
    color: "#0072CE",
    fontSize: "14px",
    fontWeight: "light",
    marginLeft: "5px",
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
    height: "70px",
  },
  blueLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "lightblue"
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

  const [open, setOpen] = useState(false);

  const openModalHandler = () => {
    setOpen(true)
  }

  const closeDo = () => {
    setOpen(false);
  }
  return (

    <div style={{ width: "100%" }}>
        <GridContainer onClick={openModalHandler} style={{ width: "100%", marginLeft: '0', marginRight: '0', marginTop: '0' }}>
            <GridItem xs={3} sm={3} md={3}>
                <div className={classes.dateBox}>
                    <span className={classes.weekText}>{days[ele.start_date.getDay()]}</span>
                    <span className={classes.dateText}>{ele.start_date.getDate()} {months[ele.start_date.getMonth()]}</span>
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

            <GridItem xs={7} sm={7} md={7}>
                <div className={classes.tagInfo}>
                  <div className={classes.happeningBlock}>Happening Now</div>
                  {ele.tags.map((ta, ind) => {
                    return (
                      <div className={classes.tagBlock}>{ta}</div>
                    );
                  })}

                  <div className={classes.nameHeader}> {ele.event} </div>
                  <div className={classes.orgHeader}>{ele.name}</div>
                </div>
            </GridItem>
          </GridContainer>
          {open && <EventModal open={open} closeDo={closeDo} event={ele}/>}
        <GridContainer style={{ width: "100%", marginLeft:0, marginRight:0, marginTop:0 }}>
            <GridItem xs={12} sm={12} md={12} style={{paddingBottom: 10, paddingLeft:25, paddingRight:25}}>
                <div className={classes.blueLine}></div>
            </GridItem>

            <GridItem xs={3} sm={3} md={3}>
                <img className={classes.image} src={ele.image_link} alt={ele.event}/>
                <div style={{marginTop: "10px"}} />
                <div style={{ color: "#4284C8", marginBottom: 5}}>
                  <strong> <AddCalendar info={ele}/></strong>
                </div>
            </GridItem>

            <GridItem xs={9} sm={9} md={9}>
                <div style={{color: "black",fontSize: "14px", marginBottom: "10px"}}>
                  {ele.desc}
                </div>
            </GridItem>

            <GridItem xs={6} sm={6} md={6} style={{marginTop: "35px"}}>
              {ele.event_link && <CustomButton href={ele.event_link} text={"LEARN MORE"} newTab color={"blue"} size={"large"} className={classes.websiteButton} />}
            </GridItem>

            <GridItem xs={6} sm={6} md={6}>
              {ele.invite_link && <CustomButton onClick={openModalHandler} text={'JOIN EVENT'} newTab color={"blue"} size={"large"} className={classes.joinButton}/>}
            
            </GridItem>
        </GridContainer>

    </div>
  );
}
