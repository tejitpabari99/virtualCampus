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
      fontSize: '2.5rem',
      lineHeight: '1.25em',
      textAlign:'center',
    },
    [theme.breakpoints.up('sm')]:{
      fontSize: '4rem',
      lineHeight: '1.25em',
      textAlign:'right',
    },
    [theme.breakpoints.up('lg')]:{
      fontSize: '4rem',
      lineHeight: '1em',
      textAlign:'right',
    },
    color:'#F1945B',
  },
  toAllLeft: {
    [theme.breakpoints.up('xs')]:{
      marginTop: '30%',
      marginLeft: 0,
      textAlign:'center',
    },
    [theme.breakpoints.up('sm')]:{
      marginTop: 'auto',
      textAlign: 'left',
      marginLeft: '-8rem',
    },
    color:"#BFD8E9",
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
    color: '#4284C8',
  },
  text:{
    [theme.breakpoints.up('xs')]:{
      marginTop: '0',
      float:'right',
      width: '100%',
      textAlign:'center'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0',
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right',
      width: 'auto'
    },
    [theme.breakpoints.up('md')]:{
      margin: 0,
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right'
    },
    [theme.breakpoints.up('lg')]:{
      margin: 0,
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right'
    }
  },
  landing: {
    [theme.breakpoints.up('xs')]:{
      background: `url(${landingImage})`,
      backgroundSize: '200%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '80% 100%',
    },
    [theme.breakpoints.up('sm')]:{
      background: `url(${landingImage})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
    },
    [theme.breakpoints.up('md')]:{
      background: `url(${landingImage})`,
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
    },
    [theme.breakpoints.up('lg')]: {
      background: `url(${landingImage})`,
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
    },
  },
  addNewButton:{
    boxShadow:"none",
    fontSize: 20,
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
          <h1 className={classNames(manual.toAll, manual.toAllLeft)}>
            COLUMBIA
          </h1>
          <h1 className={manual.toAll}>
            VIRTUAL CAMPUS
          </h1>
          <Button
            href="/events"
            className={classNames(manual.button)}
          >
            <span className={manual.buttonSpan}>Explore Events</span>
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