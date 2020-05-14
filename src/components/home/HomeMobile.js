import React from "react"
import classNames from "classnames";
import HomeEvents from './HomeEvents';
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../../assets/images/home/graphic.png";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import Button from "./../material-kit-components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";
import {MetaData, CustomTheme, CustomHeader} from "./../../components"

const theme = CustomTheme;

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
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
  toAllSubHeadingModified: {
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
  toAll2:{
    margin:"0px"
  },
  button:{
    boxShadow: 'none',
    borderRadius: 30,
    fontSize: '1.1rem',
    width: 200,
    border: '1px solid #4284C8',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    "&:hover": {
      backgroundColor: '#4284C8',
    },
    "&:hover span": {
      color: 'white !important',
    },
  },
  marginBottomDynamic:{
    marginTop: "30px",
    color: '#FB750D',
  },
  buttonSpan1:{
    paddingLeft: "1px",
    paddingRight: "1px",
    color: '#FB750D',
  },
  buttonSpan2:{
    paddingLeft: "1px",
    paddingRight: "1px",
    color: '#FB750D',
  },
  text:{
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
    backgroundPosition: '97% 60%',
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

  // Move events section up a little
  eventsSection: {
    position:'relative',
    left:'0px',
    backgroundColor:'transparent',
    top: '-8rem',
  },

}));


export default function HomeMobile() {
  const classes = useStyles();
  const manual = manualSt();
  return (
    <div style={{background: "white"}}>
      <MetaData title={'Columbia Virtual Campus'}/>
      <CustomHeader active={''} brand={''}></CustomHeader>
      <div className={classNames(manual.landing)} style={{height:"100vh", width:"100%"}}>
        <div className={classNames(manual.text)}>
          <h1 className={classNames(manual.toAll, manual.toAllSecondary)}>
            Stay connected through
          </h1>
          <h1 className={manual.toAll}>
            Columbia Virtual Campus
          </h1>
          <h1 className={classNames(manual.toAllSubHeading)}>
            Navigate Columbia and Barnard by keeping track of upcoming virtual events and online resources
          </h1>
          <Button color="vcColor"  size="lg" className={classNames(manual.buttonExplore)}
            href="/events"
          >
            <span className={classNames(manual.buttonSpan1)}> EXPLORE </span>
          </Button>
        </div>
      </div>

      <div className={classNames(classes.main, manual.eventsSection)} style={{textAlign:'left'}}>
          <div className={classes.container} id="explore">
            <h1 style={{ textAlign: "center"}}
                className={manual.toAll}> Upcoming Events
            </h1>
            <div style={{textAlign: "center"}}>
              <h1 className={classNames(manual.toAllSubHeadingModified)}>
                Do you or your club want to host your own event on Columbia Virtual Campus? Answer some short questions to get started!
              </h1>
            </div>
            <div style={{textAlign:'center'}}>
              <Button color="vcColor"  size="lg" className={classNames(manual.buttonExplore)}
                      active={true} target={'_blank'} rel="noopener noreferrer"
                      href={'https://forms.gle/fzKvSZqkAVNN6cHY6'} >
                <span className={classNames(manual.buttonSpan2)}>HOST A NEW EVENT</span>
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