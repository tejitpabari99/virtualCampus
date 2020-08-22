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
    width: "50px",
    height: "50px",
    marginBottom: "-20px"
  },
  icon: {
    color: "white",
    fontSize: 40,
  },
  footer: {
    width: "100%",
    height: "400px",
    backgroundColor: "#0072CE",
    color: "white"
  },
  footerTitle: {
    color: "white",
    fontSize: "24px",
    marginLeft: "30px",
    marginTop: "-360px"
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
    marginLeft: "30px",
    marginTop: "30px"
  },
  secondColumn: {
    color: "white",
    fontSize: "14px",
    marginLeft: "200px",
    marginTop: "-145px"
  },

}));

export default function Footer(props) {
  const classes = useStyles();
  const manual = manualSt();
  return (
      <footer className={classNames(manual.footer)}>

        <div className={manual.footer} />
        <h2 className={manual.footerTitle}> Columbia Virtual Campus </h2>
        <h2 className={manual.footerSubTitle}> Columbia, <i>virtually</i>.</h2>
        <div className={manual.firstColumn}>
          <a href={""} style={{color: "white"}}> Home </a> <br/>
          <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
          <a href={"/socialize"} style={{color: "white"}}> Socialize </a> <br/>
          <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
          <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
          <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
        </div>

        <div className={manual.secondColumn}>
          <a href={"/socialize/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
          <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
          <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
        </div>

        <div style={{marginRight: "0px"}}>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "20px", marginTop: "90px"}} href={"https://www.instagram.com/columbiavirtualcampus/"}>
            <InstaIcon className={manual.icon}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"https://www.facebook.com/columbiavirtualcampus/"}>
            <FacebookIcon className={manual.icon}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
            <LinkedInIcon className={manual.icon}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} style={{marginLeft: "10px", marginTop: "90px"}} href={"mailto:columbiavirtualcampus@gmail.com"}>
            <MailOutlineIcon className={manual.icon}/>
          </IconButton>
        </div>
      </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
