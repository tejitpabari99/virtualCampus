import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function HomeDescription() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2>Where To Begin?</h2>
          <h5 className={classes.description}>
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
