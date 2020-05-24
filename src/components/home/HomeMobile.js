import React from "react"
import classNames from "classnames";
import HomeEventsMobile from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/graphic.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import Button from "./../material-kit-components/CustomButtons/Button.js";
import {MetaData, CustomHeader, CustomButton, Title} from "../"


const useStyles = makeStyles(styles);

const manualPortrait = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '1.2rem',
    fontSize: '1.5rem',
    color:'#0072CE',
  },
  toAllSubHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '.75rem',
    maxWidth: '69%',
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    lineHeight: '18px',
    color:'#000000',
  },
  toAllSubHeadingUpEvents: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '.84rem',
    marginTop: "1rem",
    marginBottom: "1.5rem",
    maxWidth: '93%',
    margin: "auto",
    color:'#000000',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    lineHeight: ".2rem",
  },
  buttonSpan:{
    paddingLeft: "1px",
    paddingRight: "1px",
    color: '#FB750D',
  },
  landingText:{
    margin: '0',
    float:'left',
    marginLeft: '5%',
    marginTop: "20%" ,
    textAlign:'left',
    width: 'auto'
  },
  landing: {
    background: `url(${landingImage})`,
    backgroundSize: '110% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '97% bottom',
    height: "70vh",
    width: "100%"
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
    backgroundColor:'transparent',
  },

}));


const manualLandscape = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '1.2rem',
    fontSize: '1.5rem',
    color:'#0072CE',
  },
  toAllSubHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '.75rem',
    maxWidth: '50%',
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    lineHeight: '18px',
    color:'#000000',
  },
  toAllSubHeadingUpEvents: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '.84rem',
    marginTop: "1rem",
    marginBottom: "1.5rem",
    maxWidth: '93%',
    margin: "auto",
    color:'#000000',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    lineHeight: ".2rem",
  },
  buttonSpan:{
    paddingLeft: "1px",
    paddingRight: "1px",
    color: '#FB750D',
  },
  landingText:{
    margin: '0',
    float:'left',
    marginLeft: '12%',
    marginTop: "3%" ,
    textAlign:'left',
    width: 'auto'
  },
  landing: {
    background: `url(${landingImage})`,
    backgroundSize: '52% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% bottom',
    height: "80vh",
    width: "100%"
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
    backgroundColor:'transparent',
  },

}));
export default function HomeMobile({isLandscape}) {
  const classes = useStyles();
  var manual;
  if (isLandscape) {

    // Process the landscape style
    // NOTE: This only works on mobile devices
    // Tablets will go to desktop component in landscape
    manual = manualLandscape();
  } else {

    // Process the portrait style
    manual = manualPortrait();
  }

  return (
    <div style={{background: "white"}}>
      <MetaData title={'Columbia Virtual Campus'}/>
      <CustomHeader active={''} brand={''}/>
      <div className={classNames(manual.landing)} >
        <div className={classNames(manual.landingText)}>
          <h1 className={classNames(manual.toAll, manual.toAllSecondary)}>
            Stay connected through
          </h1>
          <h1 className={manual.toAll}>
            Columbia Virtual Campus
          </h1>
          <h1 className={classNames(manual.toAllSubHeading)}>
            Navigate Columbia and Barnard by keeping track of upcoming virtual events and online resources
          </h1>
          <CustomButton href={"/events"} text={'EXPLORE'} color={"orange"} size={"large"}/>
        </div>
      </div>

      <div style={{marginBottom: "5px", background: "transparent"}}/>
      <div className={classNames(classes.main, manual.eventsSection)} style={{textAlign:'left',  background: "transparent"}}>
          <div className={classes.container} id="explore">
            <Title color={"blue"}>Upcoming Events</Title>
            <div style={{textAlign: "center"}}>
              <h1 className={classNames(manual.toAllSubHeadingUpEvents)}>
                Do you or your club want to host your own event on Columbia Virtual Campus? Answer some short questions to get started!
              </h1>
            </div>
            <div style={{textAlign:'center'}}>
              <CustomButton href={'https://forms.gle/fzKvSZqkAVNN6cHY6'} text={'HOST A NEW EVENT'}
                            color={"orange"} size={"large"}/>
              <div style={{marginBottom: "40px"}}/>
            </div>
            <HomeEventsMobile/>
            <div style={{marginBottom: "100px"}}/>
          </div>
      </div>
    </div>
    )
};
