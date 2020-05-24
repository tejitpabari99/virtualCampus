import CardBody from "../material-kit-components/Card/CardBody";
import classNames from "classnames";
import Card from "../material-kit-components/Card/Card";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton, AddCalendar, CustomTheme } from "../";
import Heading1 from "../text/Heading1";
import Heading2 from "../text/Heading2";
import Circle from "react-simple-shapes";

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
    lineHeight: '3vw',
    fontSize: 'min(2.2vw, 28px)',
    color: '#000000 !important',
    textAlign:'left',
    margin: 0,
    display:'inline-block'
  },
  heading2: {
    lineHeight: '3vw',
    fontSize: 'min(1.5vw, 20px)',
    color: '#0072CE !important',
    margin: 0,
    textAlign:'left',
    display:'inline-block',
    marginLeft:'1vw'
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
    position: "absolute",
    // marginLeft: "4.32px",
    marginRight: "9.61px",
    // marginTop: "4.68px",
    marginBottom: "9.82px",
    flexDirection: "row"
  },
  middleDot: {
    height: "5px",
    width: "5px",
    marginLeft: "145px",
    backgroundColor: "gray",
    borderRadius: "50%",
    display: "inline-block",
    flexDirection: "row"
  },
  tagInfo: {
    color: "gray",
    position: "absolute",
    marginLeft: "10px",
    // marginTop: "3px",
    flexDirection: "row"
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
    paddingLeft: "1%",
    paddingRight: "1%",
    borderRadius: "5.51px",
    height: "6vw",
    width: "7.2%"
  },
  dateText: {
    color: "#0072CE",
    fontSize: "2.1vw",
    textAlign: "center",
    margin: 0
  },
  monthText: {
    color: "#0072CE",
    fontSize: "1.3vw",
    textAlign: "center"
  },
  image: {
    borderRadius: "11px",
    height: "min(18vw, 200px)",
    width: "min(23vw, 300px)",
    paddginTop:0,
    paddingBottom: 0,
    // marginTop: "5%",
    display: "block",
    objectFit: "cover"
  }
}));

export default function EventCardDesktop({ ele, onClick }) {
  const classes = useStyles();
  return (

    <div style={{ width: "100%" }}>

      <Card className={classes.card}>
        <div className={classes.flexBox}>
          <img className={classes.image} src={ele.imgLink} alt={ele.title}/>
          <div className={classes.imageBox}>
            <p className={classes.dateText}>{ele.startTime.getDate()}</p>
            <p className={classes.monthText}>{months[ele.startTime.getMonth()]}</p>
          </div>
        </div>
        <div className={classes.flexBox} style={{width:'100%'}}>
          <div className={classes.flexBox} style={{padding:0, paddingLeft: '2vw'}}>
            <h1 className={classes.heading1}> {ele.title} </h1>
            <h1 className={classes.heading2}>{ele.hostedBy}</h1>
          </div>
          <CardBody style={{padding:0, paddingLeft: '2vw', display:'flex', flexDirection:'row', height: '80%'}}>
            <div style={{paddingRight: '1.5vw'}}>
              <div className={classes.timeInfo}>
                {formatTime(ele.startTime.getHours(), ele.startTime.getMinutes())} -
                {formatTime(ele.endTime.getHours(), ele.endTime.getMinutes())} EST
              </div>
              <span className={classes.middleDot}/>
              <span className={classes.tagInfo}>
                          {ele.tags.map((ta, ind) => {
                            return (
                              <div>
                                {ta}
                              </div>
                            );
                          })}
                      </span>
              <p style={{
                color: "black",
                minHeight: 55,
                marginBottom: 0,
                height:"min(9vw, 105px)",
              }}>{ele.description}</p>
              <div style={{ color: "#4284C8", marginBottom: 5, marginTop: 'auto' }}>
                <strong> <AddCalendar info={ele}/></strong>
              </div>
            </div>
            <div className={classes.flexBox} style={{marginBottom: 5, marginTop: 'auto', marginLeft:'auto'}}>
              {ele.eventLink.length > 0 && ele.website !== '' ?
                <div>
                <div style={{textAlign:'left'}}>
                    <CustomButton href={ele.website} text={"WEBSITE"} newTab color={"blue"} size={"medium"}
                                  style={{ position: "relative", marginBottom: "5%", width: "90%", height: "10%" }} />
                </div>
                <div style={{textAlign:'left'}}>
                    <CustomButton href={ele.eventLink[0].link} text={ele.eventLink[0].title} newTab
                                  style={{ position: "relative", width: "90%", height: "10%" }} color={"blue"} size={"medium"}/>
                </div>
                </div>
                : ele.eventLink.length === 0 && ele.website !== '' ?
                  <div style={{textAlign:'left'}}>
                  <CustomButton href={ele.website} text={"WEBSITE"} newTab color={"blue"} size={"medium"}
                                style={{ position: "relative", width: "90%", height: "10%" }} />
                  </div>
                  : ele.eventLink.length > 0 ?
                    <div style={{textAlign:'left'}}>
                    <CustomButton href={ele.eventLink[0].link} text={ele.eventLink[0].title} newTab
                                  style={{ position: "relative", width: "90%", height: "10%" }} color={"blue"} size={"medium"}/>
                    </div>
                    : null}

            </div>
          </CardBody>

            <div style={{ marginBottom: "-20px" }}/>
        </div>
      </Card>
      <div style={{ color: "#4284C8", backgroundColor: "#4284C8", height: 1 }}/>
    </div>
  );
}
