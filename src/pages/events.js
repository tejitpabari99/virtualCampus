import React from "react"
import Template from "../components/template";
import classNames from "classnames";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "../assets/material-kit-assets/jss/material-kit-react.js";
import { Helmet } from 'react-helmet'

const TITLE = 'Events @ Columbia Virtual Campus'

const styles = {
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
};

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  button:{
    boxShadow:"none",
  },
  button2:{
    boxShadow:"none",
    height:"50px",
    margin:"0px",
    float:"right",
    right:0,
    top:0,
    position:"absolute",
    borderBottomLeftRadius:"15px"
  },
  cardbody:{
    position:"relatives"
  },
  button3:{
    boxShadow:"none",
    backgroundColor:"#BFD8E950",
    margin:"15px",
    marginLeft:"0px"
  },

}));

export default function Events() {
    const classes = useStyles();
    const manual = manualSt();
    return (
        <Template active={'schedule'}>
          <Helmet>
            <title>{ TITLE }</title>
          </Helmet>
        <div style={{marginTop:"0px"}}>
          <h3 style={{textAlign:"center", color:"#4284C8", fontSize:"30px"}} className={manual.toAll}> ALL EVENTS </h3>
        </div>
        <h3 className={manual.toAll} style={{textAlign:"left", color:'#F1945B', fontSize:"20px", fontWeight: 100}} > APRIL 2020</h3>
        <hr style={{
            color: '#F1945B',
            backgroundColor: '#F1945B',
            height: 3
        }}/>
        <Card style={{display:"flex", flexDirection:"row"}}>
          <img style={{height: "160px", width:"160px"}} src={require("../assets/img/boardgame_pexels.jpg")} />

          <CardBody className={manual.cardbody}>

            <h4 style={{color:"#4284C8"}} className={classNames(classes.cardTitle, manual.toAll)}>Weekly Board Game Nights</h4>
            <Button
              className={classNames(classes.navLink, manual.button3)}
              size="sm"
              round
              disabled
            >
              April 24, 2020
            </Button>
            <Button
              className={classNames(classes.navLink, manual.button3)}
              size="sm"
              round
              disabled
            >
              5:00pm EST
            </Button>
            <Button
              color="vcColor"
              className={classNames(classes.navLink, manual.button)}
              size="sm"
              round
              disabled
              active={true}
            >
              games
            </Button>
            <p style={{color:"#4284C8"}} className={manual.toAll}>Do you miss Hex? Does the word "Catan" bring back fond memories? Join us every week starting next Friday evening to play online games with friends and form this new virtual community.</p>

          </CardBody>
          <Button color="vcColor" size="sm" className={manual.button2} active={true}> Attend </Button>
        </Card>
        </Template>
    );
}
