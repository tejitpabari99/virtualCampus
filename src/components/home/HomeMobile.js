import React from "react"
import classNames from "classnames";
import HomeEvents from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/graphic.png";
import hostEventPic from "../../assets/images/home/hostAnEvent.png";
import facebookPic from "../../assets/images/home/facebook.png";
import instagramPic from "../../assets/images/home/instagram.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import Button from "./../material-kit-components/CustomButtons/Button.js";
import {MetaData, CustomHeader, CustomButton, Title} from "../";
import HomeResourcesList from "./HomeResourcesList.js";
import * as Events from './../../pages/events.js';
import InstagramEmbed from 'react-instagram-embed';
import { Helmet } from 'react-helmet';

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
    marginTop: "20%",
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
  eventPic: {
    height: "400px",
    width: "100%",
    marginBottom: "-450px",
    objectFit: "cover"
  },
  eventText: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.5)",
    color:"white",
    textAlign: "center",
    lineHeight: '2.5vw',
    marginTop: "15px",
  },
  resourcesSection: {
    position: 'relative'
  },
  socialSection: {
    textAlign: "center",
  },
  insta: {
    width: "100%",
    height: "900px",
    backgroundColor: "#F6C09F",
    color: "black",
    padding:"0px",
    marginTop: "0px",
  },
  fabo: {
    width: "100%",
    height: "900px",
    backgroundColor: "#82B7E8",
    color: "white",
    padding:"0px",
    margin: "0px",
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
    marginTop: "3%",
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
  hostsSection: {
    height: "70vh",
    flexDirection: "column",
    position: "relative",
    backgroundImage: `url(${hostEventPic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto"
  },
  eventsSection: {
    position:'relative',
    left:'0px',
    backgroundColor:'transparent',
  },
  eventPic: {
    height: "400px",
    width: "100%",
    marginBottom: "-450px",
    objectFit: "cover"
  },
  eventText: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.5)",
    color:"white",
    textAlign: "center",
    lineHeight: '2.5vw',
    marginTop: "15px",
  },
  resourcesSection: {
    position: 'relative'
  },
  socialSection: {
    textAlign: "center",
  },
  insta: {
    width: "100%",
    height: "900px",
    backgroundColor: "#F6C09F",
    color: "black",
    padding:"0px",
    marginTop: "0px",
  },
  fabo: {
    width: "100%",
    height: "900px",
    backgroundColor: "#82B7E8",
    color: "white",
    padding:"0px",
    margin: "0px",
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
      <Helmet>
        <script async={true} defer={true} crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=2186738638294469&autoLogAppEvents=1" />
      </Helmet>
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
                Find out what's happening on campus, virtually.
              </h1>
            </div>
            <HomeEvents/>
            <div style={{textAlign:'center'}}>
              <CustomButton href={'/events'}  text={'SEE ALL EVENTS'}
                            color={"orange"} size={"large"}/>
              <div style={{marginBottom: "10px"}}/>
            </div>
          </div>
      </div>

      <div className={manual.hostsSection}>
        <img className={manual.eventPic} src={hostEventPic} alt="HostEventPic"/>
          <div className={manual.eventText}>
            <br/>
            <h2>Want to host an event?</h2>
            <h5>Looking to host you own event on Columbia Virtual Campus?</h5>
            <h5>Answer some questions to <strong>start leading.</strong></h5>
            <CustomButton href={'/events/add-new-event'}  text={'HOST A NEW EVENT'}
            color={"white2"} size={"large"} />
            <br/><br/>
          </div>
      </div>

      <div style={{marginBottom: "50px" }} />

      <div className={manual.resourcesSection}>
        <div className={classes.container} id="resources">
          <Title color={"blue"}>Top Resources</Title>
          <HomeResourcesList />
        </div>
        <div style={{marginBottom: "-20px" }} />
        <div style={{marginLeft: "35%"}}>
            <CustomButton href={'/resources'}  text={'SEE ALL RESOURCES'}
            color={"orange"} size={"large"} />
        </div>
      </div>
      <div style={{marginBottom: "50px" }} />

      <div className={manual.socialSection}>
          <div className={manual.insta}>
              <br/>
              <br/>
              <h2 style={{marginTop: "50px"}}></h2>
              <h4 style={{marginTop: "20px"}}>
              </h4>
              <br/>
              <div align="center"  style = {{marginTop: "30px", border:"none"}}>
                <InstagramEmbed
                    url='https://www.instagram.com/p/CBHN4GMlSkD/'
                    maxWidth={320}
                    hideCaption={true}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                />
              </div>
              <div style={{marginTop: "30px"}}>
                  <CustomButton href={"https://www.instagram.com/columbiavirtualcampus/"} text={'VISIT INSTAGRAM'} color={"black"} size={"large"} />
              </div>
          </div>
          <div className={manual.fabo}>
              <br/>
              <br/>
              <h2 style={{marginTop: "0px"}}></h2>
              <h4 style={{marginTop: "20px"}}>
              </h4>
              <br/>
              <div style = {{marginTop: "52px", border:"none"}}
                   className="fb-page"
                   data-href="https://www.facebook.com/columbiavirtualcampus/"
                   data-tabs="timeline"
                   data-width="320"
                   data-height="527"
                   data-small-header="true"
                   data-adapt-container-width="true"
                   data-hide-cover="false"
                   data-show-facepile="false"
              >
              </div>
              <div style={{marginTop: "50px"}}>
                  <CustomButton href={"https://www.facebook.com/columbiavirtualcampus/"} text={'VISIT FACEBOOK'} color={"white"} size={"large"} newTab/>
              </div>
          </div>
      </div>

    </div>
    )
};
