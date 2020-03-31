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

// Sections for this page

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Template(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <div style={{backgroundColor:"white"}}>
      
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="VIRTUAL CAMPUS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />
      <Toolbar/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {children}
          <div style={{marginBottom: "50px"}}/>
        </div>
      </div>
    </div>
  );
}
