import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import Button from "../material-kit-components/CustomButtons/Button.js";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";
import CardFooter from "../material-kit-components/Card/CardFooter.js";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';


import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import PropTypes from "prop-types";


const useStyles = makeStyles(styles);
const custClass = makeStyles(() => ({
  toAll:{
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  section:{
    marginTop:0,
    paddingTop: 0,
    // paddingBottom: 0,
    marginBottom:0
  },
  description:{
    minHeight: '100px'
  },
  title:{
    fontSize: '20px'
  },
  position:{
    fotnSize: '16px'
  }
}));

export default function TeamMember({image, name, position, description, linkedin, facebook, github, noDescription}) {
  const classes = useStyles();
  const custStyle = custClass();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <Card plain>
      {!noDescription &&
      <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
        <img src={image} alt="..." className={imageClasses} />
      </GridItem>}
      {noDescription &&
      <GridItem xs={8} sm={8} md={8} className={classes.itemGrid}>
        <img src={image} alt="..." className={imageClasses} />
      </GridItem>}
      <h4 className={classNames(classes.cardTitle, custStyle.title, custClass.toAll)}>
        {name}
        <br />
        <small className={classNames(classes.smallTitle, custStyle.position, custClass.toAll)}>{position}</small>
      </h4>
      {!noDescription &&
      <CardBody>
        <p className={classNames(classes.description, custStyle.description, custClass.toAll)}>
          {description}
        </p>
      </CardBody>}
      <CardFooter className={classes.justifyCenter}>
        {github &&
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
          target="_blank"
          href={github}
        >
          <GitHubIcon style={{color:"#211F1F"}}/>
        </Button>}
        {linkedin &&
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
          target="_blank"
          href={linkedin}
        >
          <LinkedInIcon style={{color:"#2867B2"}} />
        </Button>}
        {facebook &&
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
          target="_blank"
          href={facebook}
        >
          <FacebookIcon style={{color:"#4267B2"}}/>
        </Button>}
      </CardFooter>
    </Card>
  );
}

TeamMember.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  linkedin: PropTypes.string,
  facebook: PropTypes.string,
  github: PropTypes.string,
  noDescription: PropTypes.bool
};

TeamMember.defaultProps = {
  noDescription: false
};
