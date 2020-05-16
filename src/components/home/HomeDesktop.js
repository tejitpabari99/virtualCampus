import React from "react"
import classNames from "classnames";
import HomeEvents from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/graphic.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import Button from "./../material-kit-components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";
import {MetaData, CustomTheme, CustomHeader} from "./../../components"
import {isEdge} from "react-device-detect";

const theme = CustomTheme;

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'min(3.1rem, 5vw)',
    fontSize: 'min(3.6rem, 3.9vw)',
    color:'#0072CE',
  },
  toAllSubHeading: {
    fontSize: 'min(.95rem, 1.35vw)',
    maxWidth: '58%',
    marginTop: "min(.7rem, 1.3vw)",
    marginBottom: "min(1.5rem, 2vw)",
    lineHeight: 'min(1.4rem, 1.9vw)',
    color:'#000000',
  },
  toAllSubHeadingUpEvents: {
    fontSize: 'min(1.5em, 1.7vw)',
    marginTop: ".5rem",
    marginBottom: "1.25rem",
    maxWidth: 'min(60rem, 72vw)',
    lineHeight: "min(2em, 2.1vw)",
    margin: "auto",
    color:'#000000',
  },
  toAllPrimary: {
    color: "#0072CE",
    fontSize: 'min(3.6rem, 3.9vw)',
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    marginBottom: '0px',
  },
  buttonSpan:{
    marginLeft: '1vw',
    marginRight: '1vw',
    color: '#FB750D',
  },
  landingText:{
    margin: 0,
    float: 'left',
    marginLeft: 'min(9%, 15vw)',
    marginTop: "min(9%, 15vh)",
    textAlign: 'left',
  },
  landing: {
    background: `url(${landingImage})`,
    backgroundSize: 'max(min(90vw, 160vh), 250px) max(76vh, 100px)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right max(100%, 75px)',
    height: "max(84vh, 25vw)",
    width: "100%",
  },
  button:{
    background: "#FFFFFF",
    border: "1px solid #FB750D",
    boxSizing: "border-box",
    borderRadius: "10px",
  },
  eventsSection: {
    position:'relative',
    left:'0px',
    background:'transparent',
  },

}));


const manualDepreciated = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '4rem',
    fontSize: '3rem',
    color:'#0072CE',
  },
  toAllSubHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '.75rem',
    maxWidth: '58%',
    marginTop: ".2rem",
    marginBottom: "1.5rem",
    lineHeight: '21px',
    color:'#000000',
  },
  toAllSubHeadingUpEvents: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: ".75rem",
    marginBottom: "1.5rem",
    maxWidth: '75%',
    lineHeight: "30px",
    margin: "auto",
    color:'#000000',
  },
  toAllPrimary: {
    color: "#0072CE",
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
    top: '-10px'
  },
  toAllSecondary: {
    color: "#BFD8E9",
    marginBottom: '0px',
  },
  buttonSpan:{
    width: "120px",
    color: '#FB750D',
  },
  landingText:{
    margin: 0,
    float: 'left',
    marginLeft: '12%',
    marginTop: "8%",
    textAlign: 'left',
  },
  landing: {
    background: `url(${landingImage})`,
    backgroundSize: '60% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 34%',
  },
  addNewButton:{
    boxShadow:"none",
    fontSize: 20,
  },
  buttonExplore:{
    background: "#FFFFFF",
    border: "1px solid #FB750D",
    boxSizing: "border-box",
    borderRadius: "10px",
  },

  eventsSection: {
    position:'relative',
    left:'0px',
    backgroundColor:'transparent',
    top: '-8rem',
  },

}));


export default function HomeDesktop() {
  const classes = useStyles();
  var manual;
  if (isEdge) {
    manual = manualDepreciated();
  } else {
    manual = manualSt();
  }
    return (
        <div style={{background: "white"}}>
          <MetaData title={'Columbia Virtual Campus'}/>
          <CustomHeader active={''} brand={''}></CustomHeader>
          <div className={classNames(manual.landing)}>
            <div className={classNames(manual.landingText)}>
              <h1 className={classNames(manual.toAll, manual.toAllSecondary)}>
                Stay connected through
              </h1>
              <h1 className={manual.toAll, manual.toAllPrimary}>
                Columbia Virtual Campus
              </h1>
              <h1 className={classNames(manual.toAllSubHeading)}>
                Navigate Columbia and Barnard by keeping track of upcoming virtual events and online resources
              </h1>
              <Button color="vcColor" size="lg" className={classNames(manual.button)}
                      href="/events"
              >
                <span className={classNames(manual.buttonSpan)}> EXPLORE </span>
              </Button>
            </div>
          </div>

          <div style={{marginBottom: "2.5vh", background: "transparent"}}/>
          <div className={classNames(classes.main, manual.eventsSection)} style={{textAlign: 'left'}}>
            <div className={classes.container} id="explore">
              <h1 style={{textAlign: "center"}}
                  className={manual.toAll}> Upcoming Events
              </h1>
              <div style={{textAlign: "center"}}>
                <h1 className={classNames(manual.toAllSubHeadingUpEvents)}>
                  Do you or your club want to host your own event on Columbia Virtual Campus? Answer some short
                  questions to get started!
                </h1>
              </div>
              <div style={{textAlign: 'center'}}>
                <Button color="vcColor" size="lg" className={classNames(manual.button)}
                        active={true} target={'_blank'} rel="noopener noreferrer"
                        href={'https://forms.gle/fzKvSZqkAVNN6cHY6'}>
                  <span className={classNames(manual.buttonSpan)}>HOST A NEW EVENT</span>
                </Button>
                <div style={{marginBottom: "40px"}}/>
              </div>
              <HomeEvents/>
              <div style={{marginBottom: "100px"}}/>
            </div>
          </div>
        </div>
    )
};