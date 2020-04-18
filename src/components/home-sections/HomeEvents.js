import React from "react"
import Template from "../template";
import classNames from "classnames";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";
import Button from "../material-kit-components/CustomButtons/Button.js";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react.js";

import myEventsList from '../../assets/events'
import { Link } from "gatsby";

const styles = {
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
};

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

const breakpointValues = {
  xs: 0,
  sm: 200,
  md: 770,
  lg: 1200,
  xl: 1900,
};
const useStyles = makeStyles(styles);
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

const manualSt = makeStyles(() => ({
  card: {
    transition: 'all 0.3s',
    "&:hover": {
      boxShadow: '0 6px 6px 0 rgba(0, 0, 0, 0.14), 0 9px 3px -6px rgba(0, 0, 0, 0.2), 0 3px 15px 0 rgba(0, 0, 0, 0.12)'
    },
    [theme.breakpoints.up('xs')]:{
      display:'block',
      flexDirection: 'none'
    },
    [theme.breakpoints.up('sm')]:{
      display:'block',
      flexDirection: 'none'
    },
    [theme.breakpoints.up('md')]:{
      display:"flex", flexDirection:"row",
    },
    [theme.breakpoints.up('lg')]:{
      display:"flex", flexDirection:"row",
    }
  },
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  button:{
    boxShadow:"none",
  },
  button2:{
    boxShadow:"none",
    height:"50px",
    margin:"0px",
    float:"right",
    right:0,
    top:0,
    position:"absolute",
    borderBottomLeftRadius:"15px"
  },
  cardbody:{
    position:"relatives",
  },
  button3:{
    boxShadow:"none",
    backgroundColor:"#BFD8E950",
    margin:"15px",
    marginLeft:"0px"
  },
  button4: {
    boxShadow: 'none',
    borderRadius: 30,
    fontSize: '1.1rem',
    width: 150,
    border: '1px solid #F1945B',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    // color: '#F1945B',
    "&:hover,&:focus": {
      backgroundColor: '#F1945B',
      color: 'white'
    },
  },
  image:{
    borderTopLeftRadius: 6, borderBottomLeftRadius: 6,width:"200px",
    height: "200px",
    [theme.breakpoints.up('xs')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('sm')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('md')]:{
      width:"200px",
      height: "200px",
    },
    [theme.breakpoints.up('lg')]:{
      width:"200px",
      height: "200px",
    }
  }

}));

const formatTime = function(hours, min) {
  let h = hours>12?hours-12:hours;
  let m = min<10?'0'+min.toString():min.toString();
  let add = hours>12?'PM':'AM';
  return h + ':' + m + add
}

export default function Events() {
    const classes = useStyles();
    const manual = manualSt();
    return (
      <div style={{marginTop:"100px"}}>
      <h3 style={{textAlign:"center", color:"#4284C8", fontSize:"30px"}} className={manual.toAll}> UPCOMING EVENTS </h3>
        <div>
        {myEventsList.map((ele) => {
          return(
            <a href={ele.location} target={'_blank'} rel="noopener noreferrer">
            <Card className={manual.card}>

              <img className={manual.image} src={ele.imgLink} />

              <CardBody className={manual.cardbody}>

                <h4 style={{color:"#4284C8"}} className={classNames(classes.cardTitle, manual.toAll)}>{ele.title}</h4>
                <Button
                  className={classNames(classes.navLink, manual.button3)}
                  size="sm"
                  round
                  disabled
                >
                  {months[ele.startTime.getMonth()].toUpperCase()} {ele.startTime.getDate()}, {ele.startTime.getFullYear()}
                </Button>
                <Button
                  className={classNames(classes.navLink, manual.button3)}
                  size="sm"
                  round
                  disabled
                >
                  {formatTime(ele.startTime.getHours(),ele.startTime.getMinutes())} EST
                </Button>
                {ele.tags.map((ta) => {
                  return (
                    <Button
                      color="vcColor"
                      className={classNames(classes.navLink, manual.button)}
                      size="sm"
                      round
                      disabled
                      active={true}
                    >
                      {ta}
                    </Button>
                  )
                })}
                <p style={{color:"#4284C8"}} className={manual.toAll}>{ele.description}</p>

              </CardBody>
              <Button color="vcColor" size="sm" className={manual.button2} active={true}
                      href={ele.location}
                      target={'_blank'} rel="noopener noreferrer"> Attend </Button>
            </Card>
            </a>
          )
        })}
        </div>

      <div style={{textAlign:"center"}}>
        <Button round className={manual.button4} href={'/events'}
              style={{color:'#F1945B'}}> See More </Button>
      </div>
      </div>
    );
}
