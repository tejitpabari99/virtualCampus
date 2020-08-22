/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../../assets/material-kit-assets/jss/material-kit-react/components/footerStyle.js";
import IconButton from "@material-ui/core/IconButton";
import InstaIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import landingImage from "../../../assets/images/home/MainGraphic.png";
import HostEventPic from "../../../assets/images/home/HostEventPic.png";
import MockCodingInterviews from "../../../assets/images/home/MockCodingInterviewDesktop.png";

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  largeIcon: {
    width: "100px",
    height: "100px",
    marginLeft: "50%",
    marginBottom: "-20px"
  },
  footer: {
    width: "100%",
    height: "250px",
    backgroundColor: "#0072CE",
    color: "white"
  }

}));

export default function Footer(props) {
  const classes = useStyles();
  var manual;
  manual = manualSt();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={classNames(manual.footer)} style={{zIndex:"50"}}>

      <div className={manual.footer} />
      <h2 style={{color: "white", fontSize: "36px", marginTop: "-180px", marginLeft: "80px"}}> Columbia Virtual Campus </h2>
      <h2 style={{color: "white", fontSize: "26px", marginTop: "0px", marginLeft: "80px"}}> Columbia, <i>virtually</i>.</h2>
      <div style={{color: "white", marginTop: "-105px", fontSize: "14px", marginLeft: "780px"}}>
        <a href={""} style={{color: "white"}}> Home </a> <br/>
        <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
        <a href={"/events"} style={{color: "white"}}> Socialize </a> <br/>
        <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
        <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
        <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
      </div>

      <div style={{color: "white", marginTop: "-145px", fontSize: "14px", marginLeft: "980px"}}>
        <a href={"/events/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
        <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
        <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
      </div>

      <div>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1200px", marginTop: "-100px"}} href={"https://www.instagram.com/columbiavirtualcampus/"}>
          <InstaIcon style={{color: "white", fontSize: 70}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1290px", marginTop: "-150px"}} href={"https://www.facebook.com/columbiavirtualcampus/"}>
          <FacebookIcon style={{color: "white", fontSize: 70}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1380px", marginTop: "-200px"}} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
          <LinkedInIcon style={{color: "white", fontSize: 70}}/>
        </IconButton>
        <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "1470px", marginTop: "-245px"}} href={"mailto:columbiavirtualcampus@gmail.com"}>
          <MailOutlineIcon style={{color: "white", fontSize: 70}}/>
        </IconButton>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
