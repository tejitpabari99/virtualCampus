import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import landingImage from "../../assets/images/home/graphic.png";
import hostEventPic from "../../assets/images/home/hostAnEvent.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomButton, CustomHeader, MetaData, Subtitle, Title} from "./../../components";
import HomeEvents from './HomeEvents';
import HomeResourcesList from "./HomeResourcesList.js";
import { Helmet } from 'react-helmet';
import InstagramEmbed from 'react-instagram-embed';
import Orange from "./orange.svg";
import Blue from "./blue.svg";



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
  eventsSection: {
    flexDirection: "column",
    position: "relative",
  },
    hostsSection: {
        flexDirection: "column",
        position: "relative",
        backgroundImage: `url(${hostEventPic})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto"
    },
  eventPic: {
    height: "100%",
    width: "100%",
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
  button: {
      boxShadow: 'none',
      fontSize: '1.1rem',
      width: 150,
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F1945B !important',
      marginLeft: "37.5%"
  },
  button2: {
      boxShadow: 'none',
      fontSize: '1.1rem',
      width: 150,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F1945B !important',
      marginLeft: "37.5%"
  },
  socialSection: {
    textAlign: "center",
  },
/*  insta: {
    width: "50%",
    height: "850px",
    backgroundColor: "transparent",
    color: "black",
    float: "left",
    padding:"0px",
    marginTop: "0px",
  },
insta2: {
    width: "55%",
    height: "850px",
    float: "left",
    backgroundColor: "transparent"
},
    instaBg: {
        backgroundImage: `url(${Orange})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "103%"
    },
    faboBg: {
        backgroundImage: `url(${Blue})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
    },
  fabo: {
    width: "50%",
    height: "850px",
    backgroundColor: "transparent",
    color: "white",
    float: "right",
    paddingTop:"3px",
    marginTop: "3px",
  },
    fabo2: {
        width: "100%",
        height: "850px",
        backgroundColor: "transparent"
    }*/
        insta: {
        width: "50%",
        height: "100vh",
        backgroundColor: "#F6C09F",
        color: "black",
        float: "left",
        padding:"0px",
        marginTop: "0px",
    },
    fabo: {
    width: "50%",
        height: "100vh",
        backgroundColor: "#82B7E8",
        color: "white",
        float: "right",
        padding:"0px",
        margin: "0px",
},

}));


export default function HomeDesktop() {
  const classes = useStyles();
  var manual;
  manual = manualSt();
  return (
    <div style={{ background: "white" }}>
      <Helmet>
            <script async={true} defer={true} crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=2186738638294469&autoLogAppEvents=1" />
      </Helmet>
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
        <div id="explore" style={{marginLeft: "7%", marginRight: "7%", width:"86%"}}>
          <Title color={"blue"}>Upcoming Events</Title>
          <div style={{ textAlign: "center" }}>
            <Subtitle color={'black'} className={manual.toAllSubHeadingUpEvents}>
              Find out what's happening on campus, virtually.
            </Subtitle>
          </div>
          <HomeEvents />
          <div className={manual.button} style={{marginLeft:"45%"}}>
              <CustomButton href={'/events'}  text={'SEE ALL EVENTS'}
              color={"orange"} size={"large"} />
          </div>
          <div style={{ marginBottom: "40px" }} />
        </div>
      </div>

      <div className={manual.hostsSection}>
          <div className={manual.eventText} style={{height:"100%"}}>
            <br /><br /><br />
            <h2>Want to host an event?</h2>
            <h5>Looking to host you own event on Columbia Virtual Campus?</h5>
            <h5>Answer some questions to <strong>start leading.</strong></h5>
            <CustomButton href={'/events/add-new-event'}  text={'HOST A NEW EVENT'}
            color={"white2"} size={"large"} />
            <br /><br /><br /><br />
        </div>
      </div>

      <div className={manual.resourcesSection} style={{paddingTop:"40px"}}>
        <div className={classes.container} id="resources">
          <Title color={"blue"}>Top Resources</Title>
          <HomeResourcesList />
        </div>
        <div className={manual.button} style={{marginLeft: "42%"}}>
            <CustomButton href={'/resources'}  text={'SEE ALL RESOURCES'}
            color={"orange"} size={"large"}/>
        </div>
      </div>
      <div style={{ marginBottom: "40px" }} />

        {/*<div style={{height: "100vh"}}>
          <div className={classNames(manual.insta2, manual.instaBg)}  style={{paddingTop:"50px", zIndex:"1"}} />
          <div className={classNames(manual.fabo2, manual.faboBg)}  style={{paddingTop:"50px", zIndex:"0"}} />*/}

        {/*<div className={manual.socialSection} style={{position: "relative", height: "0px", top: "-850px", zIndex:"3"}}>*/}
        <div className={manual.socialSection}>
        <div className={manual.insta} style={{paddingTop:"50px"}}>
                  <div align="center"  style = {{ border:"none"}}>
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
                  <div style={{marginTop: "50px", color: "black", borderColor: "black"}}>
                      <CustomButton href={"https://www.instagram.com/columbiavirtualcampus/"} text={'VISIT INSTAGRAM'}
                                    color={"black"} size={"large"} />
                  </div>
              </div>
              <div className={manual.fabo}  style={{paddingTop:"50px"}}>
                  <div style = {{ border:"none"}}
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
                      <CustomButton href={"https://www.facebook.com/columbiavirtualcampus/"} text={'VISIT FACEBOOK'} color={"white"} size={"large"}/>
                  </div>
              </div>
          </div>
        {/*}</div>*/}


    </div>
  )
};
