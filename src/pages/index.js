import React from "react"
import classNames from "classnames";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import HomeEvents from '../components/home/HomeEvents'
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../assets/images/home/graphic.png";
import AddIcon from "@material-ui/icons/Add";
import {MetaData, CustomTheme, CustomHeader} from "../components";
const theme = CustomTheme;

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  toAll: {
    [theme.breakpoints.up('xs')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '1.2rem',
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('sm')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '3.9rem',
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('lg')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '4rem',
      fontSize: '3rem',
    },
    color:'#0072CE',
  },
  toAllSubHeading: {
    [theme.breakpoints.up('xs')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.75rem',
      maxWidth: '69%',
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
      lineHeight: '18px',
    },
    [theme.breakpoints.up('sm')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.75rem',
      maxWidth: '58%',
      marginTop: ".75rem",
      marginBottom: "1.5rem",
      lineHeight: '21px',
    },
    [theme.breakpoints.up('lg')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.75rem',
      maxWidth: '58%',
      marginTop: ".75rem",
      marginBottom: "1.5rem",
      lineHeight: '21px',
    },
    color:'#000000',
  },
  toAllSubHeadingModified: {
    [theme.breakpoints.up('xs')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.84rem',
      marginTop: "1rem",
      marginBottom: "1.5rem",
      maxWidth: '93%',
    },
    [theme.breakpoints.up('sm')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1rem',
      marginTop: ".75rem",
      marginBottom: "1.5rem",
      maxWidth: '86%',
    },
    [theme.breakpoints.up('lg')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      marginTop: ".75rem",
      marginBottom: "1.5rem",
      maxWidth: '75%',
      lineHeight: "30px",
    },
    margin: "auto",
    color:'#000000',
  },
  toAllSecondary: {
    color: "#BFD8E9",
    [theme.breakpoints.up('lg')]: {
      lineHeight: "1rem",
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: "1rem",
    },
    [theme.breakpoints.up('xs')]: {
      lineHeight: ".2rem",
    },
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
    [theme.breakpoints.up('lg')]: {
      marginTop: "10px"
    },
    [theme.breakpoints.up('xs')]: {
      marginTop: "50px"
    },
    color: '#FB750D',
  },
  buttonSpan1:{
    [theme.breakpoints.up('lg')]: {
      width: "120px",
    },
    [theme.breakpoints.up('md')]: {
      width: "100px",
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "1px",
      paddingRight: "1px",
    },
    [theme.breakpoints.up('xs')]: {
      paddingLeft: "1px",
      paddingRight: "1px",
    },
    color: '#FB750D',
  },
  buttonSpan2:{
    [theme.breakpoints.up('lg')]: {
      width: "200px",
    },
    [theme.breakpoints.up('md')]: {
      width: "180px",
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: "1px",
      paddingRight: "1px",
    },
    [theme.breakpoints.up('xs')]: {
      paddingLeft: "1px",
      paddingRight: "1px",
    },
    color: '#FB750D',
  },
  text:{
    [theme.breakpoints.up('xs')]:{
      margin: '0',
      float:'left',
      marginLeft: '5%',
      marginTop: "20%" ,
      textAlign:'left',
      width: 'auto'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0',
      float:'left',
      marginLeft: '5%',
      marginTop: "10%" ,
      textAlign:'left',
      width: 'auto'
    },
    [theme.breakpoints.up('md')]:{
      margin: 0,
      float:'left',
      marginLeft: '5%',
      marginTop: "9%" ,
      textAlign:'left',
    },
    [theme.breakpoints.up('lg')]:{
      margin: 0,
      float:'left',
      marginLeft: '5%',
      marginTop: "7%" ,
      textAlign:'left',
    }
  },
  landing: {
    [theme.breakpoints.up('xs')]:{
      background: `url(${landingImage})`,
      backgroundSize: '105% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% 70%',
    },
    [theme.breakpoints.up('sm')]:{
      background: `url(${landingImage})`,
      backgroundSize: '85% 70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% center',
    },
    [theme.breakpoints.up('md')]:{
      background: `url(${landingImage})`,
      backgroundSize: '70% 70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% bottom',
    },
    [theme.breakpoints.up('lg')]: {
      background: `url(${landingImage})`,
      backgroundSize: '95% 90%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% 90%',
    },
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
}));


export default function IndexPage() {
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

      <div className={classNames(classes.main)} style={{textAlign:'left'}}>
        <div className={classNames(manual.marginBottomDynamic)}/>
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
              <div className={classNames(manual.marginBottomDynamic)}/>
            </div>
            <HomeEvents/>
            <div style={{marginBottom: "100px"}}/>
          </div>
      </div>
    </div>
    )
};