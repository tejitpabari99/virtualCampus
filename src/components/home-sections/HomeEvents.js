import React from "react"
import Template from "../template";
import classNames from "classnames";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";
import Button from "../material-kit-components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react.js";

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
    borderBottomLeftRadius:"20px"
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
      <div style={{marginTop:"100px"}}>
      <h3 style={{textAlign:"center", color:"#4284C8", fontSize:"30px"}} className={manual.toAll}> UPCOMING EVENTS </h3>
      <Card style={{display:"flex", flexDirection:"row"}}>
        <img style={{height: "160px", width:"160px"}} src={require("../../assets/img/logoMain.png")} />

        <CardBody className={manual.cardbody}>

          <h4 style={{color:"#4284C8"}} className={classNames(classes.cardTitle, manual.toAll)}>Weekly Board Game Nights</h4>
          <Button
            className={classNames(classes.navLink, manual.button3)}
            size="sm"
            round
            disabled
          >
            April 17, 2020
          </Button>
          <Button
            className={classNames(classes.navLink, manual.button3)}
            size="sm"
            round
            disabled
          >
            4:00pm EST
          </Button>
          <Button
            color="vcColor"
            className={classNames(classes.navLink, manual.button)}
            size="sm"
            round
            disabled
            active={true}
          >
            events
          </Button>
          <p style={{color:"#4284C8"}} className={manual.toAll}>Do you miss Hex? Does the word "Catan" bring back fond memories? Join the board game club every week on Friday evenings to play online games with friends and the supportive and friendly board game club members.</p>

        </CardBody>
        <Button color="vcColor" size="sm" className={manual.button2} active={true}> Learn More </Button>
      </Card>
      </div>
    );
}
