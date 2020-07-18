import CardBody from "../material-kit-components/Card/CardBody";
import classNames from "classnames";
import Card from "../material-kit-components/Card/Card";
import React, { useState } from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton, AddCalendar, CustomTheme } from "../";
import Heading1 from "../text/Heading1";
import Heading2 from "../text/Heading2";
import Circle from "react-simple-shapes";
import EventEmailModal from "./EventEmailModal"

const theme = CustomTheme;

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

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
  heading1: {
    // lineHeight: '3vw',
    fontSize: 'min(2.2vw, 28px)',
    color: '#000000 !important',
    textAlign:'left',
    margin: 0,
    display:'inline-block'
  },
  heading2: {
    // lineHeight: '3vw',
    fontSize: 'min(1.5vw, 20px)',
    color: '#0072CE !important',
    margin: 0,
    textAlign:'left',
    display:'inline-block',
    // marginLeft:'1vw'
  },
  cardTitle,
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
    // position: "absolute",
    // marginLeft: "4.32px",
    // marginRight: "9.61px",
    // marginTop: "4.68px",
    // marginBottom: "9.82px",
    flexDirection: "row",
    display:'inline-block'
  },
  middleDot: {
    height: "5px",
    width: "5px",
    marginLeft: "10px",
    marginBottom:'2px',
    backgroundColor: "gray",
    borderRadius: "50%",
    display: "inline-block",
    // flexDirection: "row"
  },
  tagInfo: {
    color: "gray",
    // position: "absolute",
    // marginLeft: "10px",
    display: "inline-block",
    // marginTop: "3px",
    // flexDirection: "row"
  },
  cardbody: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  flexBox: {
    flexDirection: "column"
  },
  flexBox2: {
    flexDirection: "column"
  },
  imageBox: {
    position: "absolute",
    top: "3vw",
    left: "2%",
    backgroundColor: "#F2F9FD",
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
    borderRadius: "5.51px",
    height: "5vw",
    width: "5%"
  },
  dateText: {
    color: "#0072CE",
    fontSize: "2.1vw",
    textAlign: "center",
    margin: 0,
    marginTop: '0.3vw',
    lineHeight: '2.5vw'
  },
  monthText: {
    color: "#0072CE",
    fontSize: "1.1vw",
    textAlign: "center",
    margin: 0,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "11px",
    paddingTop:0,
    paddingBottom: 0,
    // marginTop: "5%",
    display: "block",
    objectFit: "cover"
  },
  img: {
    // height: "min(12vw, 250px)",
    height:'100%',
    width: "min(12vw, 250px)",
  }
}));

export default function EventCardDesktop({ ele }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openModalHandler = () => {
    setOpen(true)
  }

  const closeDo = () => {
    setOpen(false);
  }
  const default_img = "https://i.imgur.com/GP66BiO.png"
  return (

    <div style={{ width: "100%" }}>

      <Card className={classes.card}>
        <div className={classes.flexBox}>
          <div className={classes.img}>
            <img className={classes.image} src={ele.image_link === "" ? default_img : ele.image_link } alt={ele.event}/>
          </div>
          <div className={classes.imageBox}>
            <p className={classes.dateText}>{ele.start_date.getDate()}</p>
            <p className={classes.monthText}>{months[ele.start_date.getMonth()]}</p>
          </div>
        </div>
        <div className={classes.flexBox} style={{width:'100%', paddingLeft: '2vw'}}>
          <div className={classes.flexBox} style={{padding:0}}>
            <h1 className={classes.heading1}> {ele.event} </h1>

          </div>
          <div className={classes.flexBox} style={{padding:0}}>
            <h1 className={classes.heading2}>{ele.name}</h1>

          </div>

          <CardBody style={{padding:0, display:'flex', flexDirection:'row'}}>
            <div style={{paddingRight: '1.5vw'}}>
              <div className={classes.timeInfo}>
                {formatTime(ele.start_date.getHours(), ele.start_date.getMinutes())} -
                {formatTime(ele.end_date.getHours(), ele.end_date.getMinutes())} {ele.timeZoneGMT}
              </div>
              <div className={classes.tagInfo}>
                {ele.tags.map((ta, ind) => {
                  return (
                    <div style={{display:'inline-block'}}><span className={classes.middleDot}/> {ta}</div>
                  );
                })}
              </div>
              <p style={{
                color: "black",
                // minHeight: 55,
                marginBottom: 5,
                // height:"min(9vw, 105px)",
              }}>{ele.desc}</p>
              <div style={{ color: "#4284C8", marginBottom: 5, marginTop: 'auto' }}>
                <strong> <AddCalendar info={ele}/></strong>
              </div>
            </div>
            <div className={classes.flexBox} style={{marginBottom: 5, marginTop: 'auto', marginLeft:'auto'}}>
              {ele.invite_link !== '' && ele.event_link !== '' ?
                <div>
                <div style={{textAlign:'left'}}>
                    <CustomButton href={ele.event_link} text={"WEBSITE"} newTab color={"blue"} size={"medium"}
                                  style={{ position: "relative", marginBottom: "5%", width: "90%", height: "10%" }} />
                </div>
                <div style={{textAlign:'left'}}>
                    <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                                style={{ position: "relative", width: "90%", height: "10%" }} color={"blue"} size={"medium"}/>
                </div>
                </div>
                : ele.invite_link === '' && ele.event_link !== '' ?
                  <div style={{textAlign:'left'}}>
                  <CustomButton href={ele.event_link} text={"WEBSITE"} newTab color={"blue"} size={"medium"}
                                style={{ position: "relative", width: "90%", height: "10%" }} />
                                <div style={{height:"15px"}} />
                  </div>
                  : ele.invite_link !== '' ?
                    <div style={{textAlign:'left'}}>
                      <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                                  style={{ position: "relative", width: "90%", height: "10%" }} color={"blue"} size={"small"}/>
                      <div style={{height:"15px"}} />
                    </div>
                    : null}
                    {/* Uncomment the button below for testing */}
                    {/* <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                                  style={{ position: "relative", width: "90%", height: "10%" }} color={"blue"} size={"small"}/> */}
                    {open && <EventEmailModal open={open} closeDo={closeDo} event={ele}/>} 

            </div>
          </CardBody>

        </div>
      </Card>
      <div style={{ color: "#4284C8", backgroundColor: "#4284C8", height: 1 }}/>
    </div>
  );
}
