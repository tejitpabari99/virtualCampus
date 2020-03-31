import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Toolbar} from "@material-ui/core";
// import vcg from "../assets/img/virtual-campus-graphic.png";
import im from "../assets/img/virtual-campus-graphic3.png";
import "../assets/material-kit-assets/scss/material-kit-react.scss?v=1.8.0";


// core components
import Parallax from "./material-kit-components/Parallax/Parallax.js";
import Header from "./material-kit-components/Header/Header.js";
import HeaderLinks from "./material-kit-components/Header/HeaderLinks.js";


import Card from "./material-kit-components/Card/Card.js";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
const customStyle = makeStyles(() => ({
  parallax: {
    height: "250px",
    backgroundPosition: "50% 25%"
  },
  container: {
    padding: "50px"
  },
}));
// Sections for this page


const useStyles = makeStyles(styles);

export default function Template(props) {
  const classes = useStyles();
  const custStyle = customStyle();
  const { children } = props;
  return (
    <div style={{backgroundColor:"white"}}>
      <Header
        color="transparent"
        brand="VIRTUAL CAMPUS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />
      <Parallax className={custStyle.parallax} small image={require("../assets/img/columbia_night.jpg")}>
        <div style={{height:"250px", width:"100%", backgroundColor:"#00000080"}}/>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classNames(classes.container)} style={{paddingTop: "50px"}}>
          {children}
          <div style={{marginBottom: "50px"}}/>
        </div>
      </div>
    </div>
  );
}
