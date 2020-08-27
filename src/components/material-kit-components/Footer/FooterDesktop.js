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
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

const useStyles = makeStyles(styles);

const manualSt = makeStyles(() => ({
  largeIcon: {
    width: "100px",
    height: "100px",
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

      <div className={manual.footer} >
      <GridContainer style={{width:"100vw"}}>
        <GridItem xs={1} sm={1} md={1} lg={1} />
        <GridItem xs={4} sm={4} md={4} lg={4} >
          <h2 style={{color: "white", fontSize: "36px", paddingTop:"50px"}}> Columbia Virtual Campus </h2>
          <h2 style={{color: "white", fontSize: "26px"}}> Columbia, <i>virtually</i>.</h2>
        </GridItem>

        <GridItem xs={1} sm={1} md={1} lg={1} >
          <div style={{color: "white", fontSize: "14px", paddingTop:"70px"}}>
            <a href={""} style={{color: "white"}}> Home </a> <br/>
            <a href={"/socialize"} style={{color: "white"}}> Socialize </a> <br/>
            <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
            <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
            <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
          </div>
        </GridItem>

        <GridItem xs={2} sm={2} md={2} lg={2} >
          <div style={{color: "white", fontSize: "14px", paddingTop:"70px"}}>
            <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
            <a href={"/socialize/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
            <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
            <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
          </div>
        </GridItem>

        <GridItem xs={4} sm={4} md={4} lg={4} style={{ paddingTop:"40px"}}>
          <div style={{paddingTop:"20px"}} />
          <IconButton className={classNames(manual.largeIcon)}  href={"https://www.instagram.com/columbiavirtualcampus/"}>
            <InstaIcon style={{color: "white", fontSize: "3vw"}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} href={"https://www.facebook.com/columbiavirtualcampus/"}>
            <FacebookIcon style={{color: "white", fontSize: "3vw"}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
            <LinkedInIcon style={{color: "white", fontSize: "3vw"}}/>
          </IconButton>
          <IconButton className={classNames(manual.largeIcon)} href={"mailto:columbiavirtualcampus@gmail.com"}>
            <MailOutlineIcon style={{color: "white", fontSize: "3vw"}}/>
          </IconButton>
        </GridItem>
      </GridContainer>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
