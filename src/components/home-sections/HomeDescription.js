import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";


// @material-ui/icons
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// core components
import GridContainer from "../../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../../components/material-kit-components/Grid/GridItem.js";
import InfoArea from "../../components/material-kit-components/InfoArea/InfoArea.js";
import Button from "../../components/material-kit-components/CustomButtons/Button.js";
import { title } from "../../assets/material-kit-assets/jss/material-kit-react";

const productStyle = makeStyles(() => ({
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999",
    fontSize: '1.0625rem',
    marginTop: '10px',
    marginBotton: '10px',
    paddingRight: '20px'
  },
  toAll: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit',
    marginRigh: 30
  }
}));

export default function HomeDescription() {
  const classes = productStyle();
  return (
    <div className={classNames(classes.section, classes.toAll)}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 style={{fontSize: '2.25rem', lineHeight: '1.15em', marginTop: 20, marginBottom: 10,color: 'inherit'}} className={classes.toAll}>
            Where To Begin?
          </h2>
          <h5 className={classNames(classes.description, classes.toAll)}>
            In line with our mission to recreate campus, we have divided the website into categories based on your favorite locations.
            For example, to socialize with other students through fun activities like board games, check out "Social", our virtual "Lerner".
            Eventually, we hope that this space becomes a virtual Butler, CPS, Career Center, etc. In other words, we hope this becomes your campus away from campus.
          </h5>
          <br/>
        </GridItem>
      </GridContainer>
    </div>
  );
}
