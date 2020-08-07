import React from "react"
import classNames from "classnames";
import HomeEvents from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/MainGraphic.png";
import HostEventPic from "../../assets/images/home/HostEventPic.png";
import Mentoring1 from "../../assets/images/home/BlueWaveMobile1.png";
import Mentoring2 from "../../assets/images/home/BlueWaveMobile2.png";
import Mentoring3 from "../../assets/images/home/BlueWaveMobile3.png";
import BlmImage from "../../assets/images/home/BlmImageMobile.png";
import Bubbles1 from "../../assets/images/home/BubblesMobile1.png";
import Bubbles2 from "../../assets/images/home/BubblesMobile2.png";
import OrangeBlob from "../../assets/images/home/OrangeBlobMobile.png";
import BlueBlob from "../../assets/images/home/BlueBlobMobile.png";
import facebookPic from "../../assets/images/home/facebook.png";
import instagramPic from "../../assets/images/home/instagram.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import Button from "./../material-kit-components/CustomButtons/Button.js";
import {MetaData, CustomHeader, CustomButton, Title, Subtitle} from "../";
import HomeResourcesList from "./HomeResourcesList.js";
import * as Events from './../../pages/events.js';
import InstagramEmbed from 'react-instagram-embed';
import { Helmet } from 'react-helmet';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import IconButton from '@material-ui/core/IconButton';

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
    backgroundPosition: 'center max(40%, 20px)',
    height: "max(100vh, 31vw)",
    width: "95%",
    marginBottom: "-300px"
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
  upcomingEventsBox: {
    width: "320px",
    height: '162px',
    borderRadius: '30px',
    backgroundColor: "#0072CE",
    marginBottom: "10px",
    marginLeft: "25px",
  },
  hostEventPicBox: {
    width: "300px",
    height: "210px",
    marginLeft: "35px"
  },
  mentoring1: {
    background: `url(${Mentoring1})`,
    backgroundRepeat: 'no-repeat',
    marginTop: "40px",
    height: "300px",
    width: "600px",
    marginBottom: "-165px"
  },
  mentoring2: {
    background: `url(${Mentoring2})`,
    backgroundRepeat: 'no-repeat',
    height: "400px",
    width: "600px",
    marginBottom: "-270px"
  },
  mentoring3: {
    background: `url(${Mentoring3})`,
    backgroundRepeat: 'no-repeat',
    height: "400px",
    width: "600px",
    marginBottom: "-210px"
  },
  blmImage: {
    background: `url(${BlmImage})`,
    backgroundRepeat: 'no-repeat',
    height: "100px",
    width: "100px",
    marginLeft: "140px"
  },
  bubbles1: {
    marginLeft: "10px",
    width: "140px",
    height: "100px"
  },
  bubbles2: {
    marginLeft: "120px",
    width: "60px",
    height: "50px"
  },
  blueBlob: {
    width: "100%",
    height: "1500px",
    marginTop: "50px"
  },
  orangeBlob: {
    width: "100%",
    height: "800px",
    marginTop: "-2360px"
  },
  largeIcon: {
    width: "50px",
    height: "50px",
    marginBottom: "-20px"
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
  footer: {
    width: "100%",
    height: "400px",
    backgroundColor: "#0072CE",
    color: "white",
    marginTop: "50px"
  }
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
    backgroundSize: '40%',
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
            <span style={{display:"block"}}>Your one stop-shop for all things social, career, academic, and well-being.</span>
            <span>Thank us later.</span>
          </h1>
          <CustomButton href={"/events"} text={'EXPLORE'} color={"orange"} size={"large"}/>
        </div>
      </div>

      <div className={manual.upcomingEventsBox}>
          <br/>
          <p style={{color: "white", fontSize: "24px", textAlign: "center"}}> Upcoming Events </p>
          <p style={{color: "white", fontSize: "12px", textAlign: "center"}}> Find out what's happening on campus, virtually.</p>
          <div style={{marginTop: "10px", textAlign: "center"}}>
            <CustomButton href={'/events'}  text={'SEE ALL EVENTS'}
            color={"white2"} size={"large"} />
          </div>
      </div>

      <div style={{marginBottom: "5px", background: "transparent"}}/>
      <div className={classNames(classes.main, manual.eventsSection)} style={{textAlign:'left',  background: "transparent"}}>
          <div className={classes.container} id="explore">
            <HomeEvents/>
          </div>
      </div>

      <img className={manual.hostEventPicBox} src={HostEventPic} />
      <h2 style={{color:"#0072CE", fontSize: "24px", textAlign: "center"}}>Want to host an event?</h2>
      <p style={{color:"black", fontSize: "12px", textAlign: "center", maxWidth: "280px", marginLeft: "50px"}}>Looking to host your own event on Columbia Virtual Campus? Answer some questions to <strong>start leading.</strong></p>
      <br/>
      <div style={{marginTop: "-20px", textAlign: "center"}}>
        <CustomButton href={'/add-new-event'}  text={'HOST AN EVENT'}
        color={"orange"} size={"large"}/>
      </div>

      <div className={manual.mentoring1}>
          <br/> <br/>
          <div className={manual.blmImage}> </div>
      </div>
      <div className={manual.mentoring2}>
          <h1 style={{fontSize: "24px", textAlign: "center", marginLeft: "-230px", marginTop: "20px"}}> #BLM</h1>
          <h1 style={{fontSize: "24px", textAlign: "center", marginLeft: "-230px", marginTop: "-5px"}}> Our Mentorship Program</h1>
          <h3 style={{fontSize: "16px", textAlign: "center", marginLeft: "-230px", marginTop: "0px"}}> DONATE WHAT YOU CAN</h3>
          <h3 style={{fontSize: "16px", textAlign: "center", marginLeft: "-230px", marginTop: "-5px"}}> for 30 minutes with any mentor!</h3>

      </div>
      <div className={manual.mentoring3}>
          <p style={{fontSize: "12px", textAlign: "center", marginLeft: "-230px"}}> Columbia Virtual Campus is offering a one-on-one </p>

          <p style={{fontSize: "12px", textAlign: "center", marginLeft: "-230px", marginTop: "-5px"}}> mentoring service in which 100% of fees are donated to </p>
          <p style={{fontSize: "12px", textAlign: "center", marginLeft: "-230px", marginTop: "-5px"}}> organizations upporting the black community. </p>
          <CustomButton href={'/coding-interviews'}  text={'SCHEDULE A SESSION'}
          color={"orange2"} size={"large"} style={{textAlign: "center", marginLeft: "120px", marginTop: "15px"}}/>
      </div>

        <h1 style={{color: "#0072CE", fontSize: "24px", maxWidth: "300px", textAlign: "center", marginLeft: "45px", marginBottom: "-50px"}}> Take a look at our Resources!</h1>


      <div className={manual.resourcesSection}>
        <div className={classes.container} id="resources">
          <HomeResourcesList />
        </div>
        <div style={{marginBottom: "-20px" }} />
        <div style={{marginLeft: "35%"}}>
            <CustomButton href={'/resources'}  text={'SEE ALL RESOURCES'}
            color={"orange"} size={"large"} />
        </div>
      </div>
      <div style={{marginBottom: "50px" }} />

      <div>
        <img className={manual.bubbles1} src={Bubbles1}/>
        <img className={manual.bubbles2} src={Bubbles2}/>
      </div>

      <div>
        <img className={manual.blueBlob} src={BlueBlob}/>
        <img className={manual.orangeBlob} src={OrangeBlob}/>
        <div>
            <div style={{ border:"none", marginLeft: "25px", marginTop: "-1490px"}}>
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
            <div style={{marginLeft: "130px", marginTop: "60px", color: "black", borderColor: "black", marginBottom: "150px"}}>
                    <CustomButton href={"https://www.instagram.com/columbiavirtualcampus/"} text={'INSTAGRAM'}
                          startIcon={<InstaIcon />} color={"black"} size={"large"} />
            </div>
        </div>
        <div>
            <div style={{ border:"none", marginTop: "400px", marginLeft: "30px"}}
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
            <div style={{marginTop: "50px", marginLeft: "130px"}}>
                <CustomButton href={"https://www.facebook.com/columbiavirtualcampus/"} text={'FACEBOOK'}
                    startIcon={<FacebookIcon />} color={"black2"} size={"large"}/>
            </div>
        </div>
      </div>

      <div className={manual.footer} />
          <h2 style={{color: "white", fontSize: "24px", marginLeft: "30px", marginTop: "-360px"}}> Columbia Virtual Campus </h2>
          <h2 style={{color: "white", fontSize: "16px", marginTop: "0px", marginLeft: "30px"}}> Columbia, <i>virtually</i>.</h2>
      <div style={{color: "white", fontSize: "14px", marginLeft: "30px", marginTop: "30px"}}>
          <a href={""} style={{color: "white"}}> Home </a> <br/>
          <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
          <a href={"/events"} style={{color: "white"}}> Socialize </a> <br/>
          <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
          <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
          <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
      </div>

      <div style={{color: "white", fontSize: "14px", marginLeft: "200px", marginTop: "-145px"}}>
          <a href={"/events/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
          <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
          <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
      </div>

      <div style={{marginRight: "0px"}}>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "20px", marginTop: "90px"}} href={"https://www.instagram.com/columbiavirtualcampus/"}>
            <InstaIcon style={{color: "white", fontSize: 40}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"https://www.facebook.com/columbiavirtualcampus/"}>
            <FacebookIcon style={{color: "white", fontSize: 40}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
            <LinkedInIcon style={{color: "white", fontSize: 40}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"mailto:columbiavirtualcampus@gmail.com"}>
            <MailOutlineIcon style={{color: "white", fontSize: 40}}/>
        </IconButton>
      </div>


    </div>
    )
};
