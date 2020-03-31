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
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import InfoArea from "../components/material-kit-components/InfoArea/InfoArea.js";
import Button from "../components/material-kit-components/CustomButtons/Button.js";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2>Where To Begin?</h2>
          <h5 className={classes.description}>
            As with our beloved campus, it might take some navigating to find what you are looking for.
            Based on our current situation, our team has come up with three broad categories (Social, COVID related resources, and Mental Health) for resources that
            focus on combating social isolation and the challenges that arise due to coronavirus.
          </h5>
          <br/>
          <h5 className={classes.description}>
            On that note, look out for the Virtual Campus Design Challenge 2020 coming up online from April 4th to April 6th, 2020 open to all Columbia/Barnard students.
            To learn more about it and join, visit our <a href="https://www.facebook.com/events/1020511525011664/">Facebook group</a> and join our <a href=" http://bit.ly/virtual-campus-resources ">Slack channel</a>.
            Please contact us if you have any more questions.
            We expect to have many more amazing projects and resources on the website after that time.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Social"
              description="If there is a way to 'make the best of our time', you will find it here. Look out for board games, cooking videos, tailored skin care routines, and so much more!"
              icon={PeopleIcon}
              iconColor="info"
              vertical
            />
            <Button color="transparent"
            variant="outlined"
            size="lg"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-play" />
              SEE MORE
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="COVID Related Resources"
              description="From grocery delivery systems to Columbia emergency services, use these resources to keep yourself updated and ensure your safety, along with that of your community.   "
              icon={LocalHospitalIcon}
              iconColor="success"
              vertical
            />
            <Button color="transparent"
            variant="outlined"
            size="lg"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-play" />
              SEE MORE
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Mental Health"
              description="Social isolation amisdt this crisis can be extremely challening and draining. Please prioritize your mental health and make use of the resources available to you. "
              icon={FavoriteIcon}
              iconColor="danger"
              vertical
            />
            <Button color="transparent"
            variant="outlined"
            size="lg"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-play" />
              SEE MORE
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
