
import React, { useState } from "react";
import classNames from "classnames";
import { cardTitle } from "../../../assets/material-kit-assets/jss/material-kit-react";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton, AddCalendar, CustomTheme } from "../../";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

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
    position: "absolute",
    color: "black",
    whiteSpace: "nowrap",
    marginLeft: "10px",
  },
  orgHeader: {
    fontSize: '10px',
    lineHeight: "15px",
    color: '#0072CE',
    marginLeft:'10px',
    marginTop: "20px",

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
    marginLeft: "5px",
  },
  tagBlock: {
    display: 'inline-block',
    fontSize: '10px',
    marginLeft: '10px',
    backgroundColor: '#F2F2F2',
    paddingTop: 2,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: "5px",
  },
  happeningBlock: {
    display: 'inline-block',
    fontSize: '10px',
    marginLeft: '10px',
    backgroundColor: '#F3FFEE',
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
    height: "70px"
  },
  horizontalLine: {
    borderTop: "1px solid rgba(185, 217, 235, 0.5)",
    height: "100%"
  }
}));

export default function EventCardDesktopBottom({ ele }) {
  console.log(ele);
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
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1bh-content"
      >
        {/* put outer stuff here */}

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

        <div className={classes.verticalLine} />

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
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ width: "100%"}}>
        {/* put inner stuff here */}

        <div className={classes.flexBox}>
          <img className={classes.image} src={ele.image_link} alt={ele.event}/>
          <div style={{marginTop: "10px"}} />
          <div style={{ color: "#4284C8", marginBottom: 5}}>
            <strong> <AddCalendar info={ele}/></strong>
          </div>
        </div>

        <div style={{color: "black", marginLeft: 10, marginRight: 35,
          width: "70%", marginBottom: 10,fontSize: "14px"}}>
          {ele.desc}
        </div>
        <br/>

      </ExpansionPanelDetails>
    </ExpansionPanel>

    </div>
  );
}
