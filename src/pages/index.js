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
    },
    [theme.breakpoints.up('sm')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.75rem',
      maxWidth: '58%',
    },
    [theme.breakpoints.up('lg')]:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '.75rem',
      maxWidth: '58%',
    },
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
  buttonSpan:{
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
      backgroundSize: '110% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% 80%',
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
      backgroundSize: '85% 90%',
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
          <h1 className={classNames(manual.toAllSubHeading)} style={{marginBottom: '30px'}}>
            Navigate Columbia and Barnard by keeping track of upcoming virtual events and online resources
          </h1>
          <Button color="vcColor"  size="lg" className={classNames(manual.buttonExplore)}
            href="/events"
          >
            <span className={classNames(manual.buttonSpan)}>Explore</span>
          </Button>
        </div>
      </div>


      <div className={classNames(classes.main)} style={{textAlign:'left'}}>
        <div className={classes.container} id="explore">
          <div style={{ marginTop: "100px" }}>
          <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}
              className={classes.toAll2}> UPCOMING EVENTS </h3>
          <div style={{textAlign:'center'}}>
            <Button color="vcColor" size="sm" className={manual.addNewButton}
                    style={{marginTop: 20}}
                    active={true} target={'_blank'} rel="noopener noreferrer"
                    href={'https://forms.gle/fzKvSZqkAVNN6cHY6'}> <AddIcon/> Add New Event
            </Button>
          </div>
          <HomeEvents/>
          </div>
          <div style={{marginBottom: "100px"}}/>
        </div>
      </div>
    </div>
    )
};