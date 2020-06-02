import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import landingImage from "../../assets/images/home/graphic.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomButton, CustomHeader, MetaData, Subtitle, Title } from "./../../components";
import HomeEvents from './HomeEvents';


const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'min(3.1rem, 5vw)',
    fontSize: 'min(3.0rem, 3.3vw)',
    color: '#0072CE',
  },
  toAllSubHeading: {
    fontSize: 'min(.95rem, 1.35vw)',
    maxWidth: '58%',
    marginTop: "min(.7rem, 1.3vw)",
    marginBottom: "min(1.5rem, 2vw)",
    lineHeight: 'min(1.4rem, 1.9vw)',
    color: '#000000',
  },
  toAllSubHeadingUpEvents: {
    marginTop: ".5rem",
    marginBottom: "1.25rem",
    maxWidth: 'min(60rem, 72vw)',
    margin: "auto",
    color: '#000000',
  },
  toAllPrimary: {
    color: "#0072CE",
    fontSize: 'min(3.0rem, 3.3vw)',
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    marginBottom: '0px',
  },
  buttonSpan: {
    marginLeft: '1vw',
    marginRight: '1vw',
    fontSize: '20px'
  },
  landingText: {
    margin: 0,
    float: 'left',
    marginLeft: 'min(9%, 15vw)',
    marginTop: "min(9%, 15vh)",
    textAlign: 'left',
  },
  landing: {
    background: `url(${landingImage})`,
    //backgroundSize: 'max(min(90vw, 160vh), 250px) max(76vh, 100px)',
    // backgroundSize: 'max(min(80vw, 120vh), 250px) auto',
    backgroundSize: 'max(min(92vw, 132vh), 262px) auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right max(100%, 75px)',
    height: "max(90vh, 31vw)",
    width: "100%",
  },
  button: {
    background: "#FFFFFF",
    color: '#FB750D !important',
    border: "1px solid #FB750D",
    boxSizing: "border-box",
    borderRadius: "10px",
    "&:hover,&:focus": {
      color: 'white !important',
      backgroundColor: '#FB750D',
    },
  },
  eventsSection: {
    position: 'relative',
    left: '0px',
    background: 'transparent',
  },

}));


export default function HomeDesktop() {
  const classes = useStyles();
  var manual;
  manual = manualSt();
  return (
    <div style={{ background: "white" }}>
      <MetaData title={'Columbia Virtual Campus'} />
      <CustomHeader active={''} brand={''}/>
      <div className={classNames(manual.landing)}>
        <div className={classNames(manual.landingText)}>
          <h1 className={classNames(manual.toAll, manual.toAllSecondary)}>
            Stay connected through
              </h1>
          <h1 className={classNames(manual.toAll, manual.toAllPrimary)}>
            Columbia Virtual Campus
              </h1>
          <h1 className={classNames(manual.toAllSubHeading)}>
            Navigate Columbia and Barnard by keeping track of upcoming virtual events and online resources
              </h1>
          <CustomButton href={"/events"} text={'EXPLORE'} color={"orange"} size={"large"} />
        </div>
      </div>

      <div style={{ marginBottom: "2.5vh", background: "transparent" }} />
      <div className={classNames(classes.main, manual.eventsSection)} style={{ textAlign: 'left' }}>
        <div className={classes.container} id="explore">
          <Title color={"blue"}>Upcoming Events</Title>
          <div style={{ textAlign: "center" }}>
            <Subtitle color={'black'} className={manual.toAllSubHeadingUpEvents}>
              Do you or your club want to host your own event on Columbia Virtual Campus?
                  <br /> Answer some short questions to get started!
                </Subtitle>
          </div>
          <div style={{ textAlign: 'center' }}>
            <CustomButton href={'/events/add-new-event'}  text={'HOST A NEW EVENT'}
              color={"orange"} size={"large"} />
            <div style={{ marginBottom: "40px" }} />
          </div>
          <HomeEvents />
          <div style={{ marginBottom: "100px" }} />
        </div>
      </div>
    </div>
  )
};
