import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button2 from "../material-kit-components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import React, { useState } from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme, AddCalendar, CustomButton, EmailEvent} from "../";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
};

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const useStyles = makeStyles ({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        length: "200px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textMuted: {
        color: "#6c757d"
    },
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
        marginLeft: "-3px",
        marginRight: "7px",
        marginBottom: "7px",
        paddingTop: 2,
        paddingBottom: 1,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: "5px",
    },
    horizontalLine: {
        borderTop: "5px solid #D9D9D9",
        width: "15%",
        textAlign: "center",
        marginTop: "20px",
        borderRadius: "25px",
        marginLeft: "42%"
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
      height: "130px",
      marginTop: "10px",
      marginBottom: "10px"
    },
    blueLine: {
      width: "100%",
      height: "1px",
      backgroundColor: "lightblue"
    },
    websiteButton: {
      position: "absolute",
      bottom: 0,
      width: "165px",
      height: "35px"
    },
    joinButton: {
      width: "165px",
      height: "35px",
      marginTop: "6px",
      marginLeft: "-12px"
    },
    list: {
    width: 250,
    },
    fullList: {
      width: 'auto',
    }
});

export default function EventModalMobile({open, closeDo, event}) {
    const classes = useStyles();

    const [state, setState] = React.useState({
      bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open});
    };

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'bottom',
        })}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
      >
          <div className={classes.horizontalLine} />
          <GridContainer style={{ width: "100%", margin: '0', marginTop: "10px", marginBottom: "10px" }}>
              <GridItem xs={3} sm={3} md={3}>
                  <div className={classes.dateBox}>
                      <span className={classes.weekText}>{days[event.start_date.getDay()]}</span>
                      <span className={classes.dateText}>{event.start_date.getDate()} {months[event.start_date.getMonth()]}</span>

                      <br/>
                      <div className={classes.timeInfo}>
                          {formatTime(event.start_date.getHours(), event.start_date.getMinutes())} -
                          {formatTime(event.end_date.getHours(), event.end_date.getMinutes())} {event.timeZoneGMT}
                      </div>
                  </div>
              </GridItem>

              <GridItem xs={1} sm={1} md={1}>
                  <div className={classes.verticalLine}/>
              </GridItem>

              <GridItem xs={7} sm={7} md={7}>
                  <div className={classes.tagInfo}>
                      {event.displayNow && <div className={classes.happeningBlock}>Happening Now!</div>}
                      {event.displayPast && <div className={classes.pastBlock}>Past</div>}
                      {event.displayRecurring && <div className={classes.recurringBlock}>Recurring</div>}
                      {event.displayPopular && <div className={classes.popularBlock}>Popular</div>}

                      {event.tags.map((ta, ind) => {
                          if (ta !== "") {
                              return (
                                  <div className={classes.tagBlock}>{ta}</div>
                              );
                          }
                      })}

                    <div className={classes.nameHeader}> {event.event} </div>
                    <div className={classes.orgHeader}>{event.name}</div>
                  </div>
              </GridItem>
            </GridContainer>
          <GridContainer style={{ width: "100%", marginLeft:0, marginRight:0, marginTop:0 }}>
              <GridItem xs={12} sm={12} md={12} style={{paddingBottom: 10,}}>
                  <div className={classes.blueLine}></div>
              </GridItem>

              <GridItem xs={3} sm={3} md={3}>
                  <img className={classes.image} src={event.image_link} alt={event.event}/>
                  <div style={{marginTop: "10px"}} />
                  <div style={{ color: "#4284C8", marginBottom: 5}}>
                    <strong> <AddCalendar info={event}/></strong>
                  </div>
              </GridItem>

              <GridItem xs={9} sm={9} md={9}>
                  <div style={{color: "black",fontSize: "14px", marginBottom: "10px"}}>
                    {event.desc}
                  </div>
              </GridItem>

              <GridItem xs={6} sm={6} md={6} style={{marginTop: "35px"}}>
                {event.event_link && <CustomButton href={event.event_link} text={"LEARN MORE"} newTab color={"blue"} size={"xlarge"} className={classes.websiteButton} />}
              </GridItem>

              <GridItem xs={6} sm={6} md={6}>
                {event.invite_link && <CustomButton text={'JOIN EVENT'} newTab color={"blue"} size={"xlarge"} className={classes.joinButton}/>}
              </GridItem>
          </GridContainer>
      </div>
    );


    return(

      <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={open}
            onClose={closeDo}
            //open={state[anchor]}
            //onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}

          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    );
}
