import React from "react"
import classNames from "classnames";
import HomeEvents from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/MainGraphic.png";
import HostEventPic from "../../assets/images/home/HostEventPic.png";
import MockCodingInterviews from "../../assets/images/home/MockCodingInterviews.png";
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
import * as Events from './../../pages/socialize';
import InstagramEmbed from 'react-instagram-embed';
import { Helmet } from 'react-helmet';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import IconButton from '@material-ui/core/IconButton';
import GridItem from "../material-kit-components/Grid/GridItem";
import CustomFooterMobile from "../all/CustomFooterMobile";
import CustomFooter from "../all/CustomFooter";

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
  eventsSection: {
    position:'relative',
    left:'0px',
    backgroundColor:'transparent',
    textAlign: "left",
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
  hostEventTitle: {
    color:"#0072CE",
    fontSize: "24px",
    textAlign: "center"
  },
  hostEventText: {
    color:"black",
    fontSize: "12px",
    textAlign: "center",
    maxWidth: "280px",
    marginLeft: "50px"
  },
  hostEventButton: {
    marginTop: "-20px",
    textAlign: "center"
  },
  interviewPicBox: {
    width: "300px",
    height: "250px",
    marginLeft: "35px",
    marginBottom: "-20px"
  },
  dateText: {
    color:"black",
    fontSize: "14px",
    textAlign: "center"
  },
  interviewTitle: {
    color:"#0072CE",
    fontSize: "24px",
    textAlign: "center"
  },
  interviewText: {
    color:"black",
    fontSize: "12px",
    textAlign: "center",
    maxWidth: "280px",
    marginLeft: "50px"
  },
  interviewButton: {
    marginTop: "-20px",
    textAlign: "center"
  },
  resourcesText: {
    color: "#0072CE",
    fontSize: "24px",
    maxWidth: "300px",
    textAlign: "center",
    marginLeft: "35px",
    marginBottom: "-60px",
    marginTop: "40px"
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
    border:"none",
    marginLeft: "25px",
    marginTop: "-1490px"
  },
  fabo: {
    border:"none",
    marginLeft: "45px",
    marginBottom:"-30px"
  },
  instaButton: {
    marginLeft: "130px",
    marginTop: "30px",
    color: "black",
    borderColor: "black",
    marginBottom: "150px"
  },
  faboButton: {
    marginTop: "20px",
    marginLeft: "130px",
    marginBottom: "110px",
  },
  firstColumn: {
    color: "white",
    fontSize: "14px",
    marginLeft: "30px",
    marginTop: "30px"
  },
  secondColumn: {
    color: "white",
    fontSize: "14px",
    marginLeft: "200px",
    marginTop: "-145px"
  },
  icon: {
    color: "white",
    fontSize: 40,
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
  toAllSecondary: {
    color: "#BFD8E9",
    lineHeight: ".2rem",
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
    backgroundSize: '80% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right max(40%, 20px)',
    height: "max(120vh, 31vw)",
    width: "95%",
  },
  eventsSection: {
    position:'relative',
    backgroundColor:'transparent',
    marginLeft: "160px"
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
  upcomingEventsBox: {
    width: "320px",
    height: '162px',
    borderRadius: '30px',
    backgroundColor: "#0072CE",
    marginBottom: "30px",
    marginLeft: "250px",
  },
  hostEventPicBox: {
    width: "300px",
    height: "210px",
    marginLeft: "35px"
  },
  hostEventTitle: {
    color:"#0072CE",
    fontSize: "24px",
    textAlign: "center",
    marginLeft: "270px",
    marginTop: "-200px"
  },
  hostEventText: {
    color:"black",
    fontSize: "12px",
    textAlign: "left",
    maxWidth: "280px",
    marginLeft: "405px"
  },
  hostEventButton: {
    marginTop: "-20px",
    textAlign: "center",
    marginBottom: "60px",
    marginLeft: "210px"
  },
  interviewPicBox: {
    width: "300px",
    height: "250px",
    marginLeft: "400px",
    marginBottom: "-20px"
  },
  dateText: {
    color:"black",
    fontSize: "14px",
    marginTop: "-180px",
    textAlign: "center",
    marginLeft: "-360px"
  },
  interviewTitle: {
    color:"#0072CE",
    fontSize: "24px",
    textAlign: "center",
    marginLeft: "-430px"
  },
  interviewText: {
    color:"black",
    fontSize: "12px",
    textAlign: "right",
    maxWidth: "280px",
    marginLeft: "50px"
  },
  interviewButton: {
    marginTop: "-20px",
    textAlign: "left",
    marginLeft: "55px"
  },
  resourcesText: {
    color: "#0072CE",
    fontSize: "24px",
    textAlign: "center",
    marginLeft: "35px",
    marginBottom: "-60px",
    marginTop: "40px"
  },
  bubbles1: {
    marginLeft: "10px",
    width: "140px",
    height: "100px"
  },
  bubbles2: {
    marginLeft: "600px",
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
  resourcesSection: {
    position: 'relative'
  },
  largeIcon: {
    width: "50px",
    height: "50px",
    marginBottom: "-20px"
  },
  insta: {
    border:"none",
    marginLeft: "250px",
    marginTop: "-1490px"
  },
  fabo: {
    border:"none",
    marginLeft: "250px"
  },
  instaButton: {
    marginLeft: "320px",
    marginTop: "60px",
    color: "black",
    borderColor: "black",
    marginBottom: "150px"
  },
  faboButton: {
    marginTop: "30px",
    marginLeft: "320px"
  },
  footer: {
    width: "100%",
    height: "400px",
    backgroundColor: "#0072CE",
    color: "white",
    marginTop: "50px"
  },
  footerTitle: {
    color: "white",
    fontSize: "24px",
    marginLeft: "30px",
    marginTop: "-300px"
  },
  footerSubTitle: {
    color: "white",
    fontSize: "16px",
    marginTop: "0px",
    marginLeft: "30px"
  },
  firstColumn: {
    color: "white",
    fontSize: "14px",
    marginLeft: "400px",
    marginTop: "-70px"
  },
  secondColumn: {
    color: "white",
    fontSize: "14px",
    marginLeft: "600px",
    marginTop: "-145px"
  },
  icon: {
    color: "white",
    fontSize: 40,
  }
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
          <CustomButton href={"/socialize"} text={'EXPLORE'} color={"orange"} size={"large"}/>
        </div>
      </div>

      <div className={manual.upcomingEventsBox}>
          <br/>
          <p style={{color: "white", fontSize: "24px", textAlign: "center"}}> Upcoming Events </p>
          <p style={{color: "white", fontSize: "12px", textAlign: "center"}}> Find out what's happening on campus, virtually.</p>
          <div style={{marginTop: "10px", textAlign: "center"}}>
            <CustomButton href={'/socialize'}  text={'SEE ALL EVENTS'}
            color={"white2"} size={"large"} />
          </div>
      </div>

      <div style={{marginBottom: "5px", background: "transparent"}}/>
      <div className={classNames(classes.main, manual.eventsSection)}>
          <div className={classes.container} id="explore">
            <HomeEvents/>
          </div>
      </div>

      <div style={{marginBottom: "20px" }} />

      <img className={manual.hostEventPicBox} src={HostEventPic}/>
      <h2 className={manual.hostEventTitle}>Looking for people who share <strong>your</strong> interests?</h2>
      <p className={manual.hostEventText}>
        1. Submit a topic and time using our form.<br />
        2. Let us host and share the event on our website.<br />
        3. Share your interest with your friends, meet new people, and have fun!<br /></p>
      <br/>
      <div className={manual.hostEventButton}>
        <CustomButton href={'socialize/add-new-event'}  text={'HOST AN EVENT'}
        color={"orange"} size={"large"}/>
      </div>

      <div style={{marginBottom: "60px" }} />

      <img className={manual.interviewPicBox} src={MockCodingInterviews} />
      <h2 className={manual.dateText}><strong>August 3rd - August 24th, 2020 </strong></h2>
      <h2 className={manual.interviewTitle}>Mock Coding Interviews</h2>
      <p className={manual.interviewText}>Practice and network 1-on-1 with students & alumni at Microsoft, Facebook, & Google.</p>
      <br/>
      <div className={manual.interviewButton}>
        <CustomButton href={'/coding-interviews'}  text={'SCHEDULE A SESSION'}
        color={"orange"} size={"large"} />
      </div>


      <div style={{marginBottom: "80px" }} />

      <h1 className={manual.resourcesText}> Take a look at our Resources!</h1>


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
            <div className={manual.insta}>
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
            <div className={manual.instaButton}>
                    <CustomButton href={"https://www.instagram.com/columbiavirtualcampus/"} text={'INSTAGRAM'}
                          startIcon={<InstaIcon />} color={"black"} size={"large"} />
            </div>
        </div>
        <div>
            <div
                     className={classNames("fb-page", manual.fabo)}
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
            <div className={manual.faboButton}>
                <CustomButton href={"https://www.facebook.com/columbiavirtualcampus/"} text={'FACEBOOK'}
                    startIcon={<FacebookIcon />} color={"black2"} size={"large"}/>
            </div>
        </div>
      </div>

    <CustomFooter style={{marginTop:"-50px"}}/>
    </div>
    )
};
