import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { SvgIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


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

export default function TeamMember({image, name, position, description, linkedin, facebook, github, behance, noDescription}) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <Card plain>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      {!noDescription &&
      <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
        <img src={image} alt="..." className={imageClasses}
             style={{maxWidth:"none", width: 'max(13vw, 180px)', height: 'max(13vw, 180px)', paddingBottom:0}}/>
      </GridItem>}
      {noDescription &&
        <img src={image} alt="..." className={imageClasses} style={{width:'120px', height:'120px', marginLeft:'auto', marginRight:'auto', paddingBottom:0}}/>
      }
      <h4 className={classNames(classes.cardTitle)} style={{fontSize: '20px'}}>
        {name}
        <br />
        <small className={classNames(classes.smallTitle)} style={{fotnSize: '16px'}}>{position}</small>
      </h4>
      {!noDescription &&
      <CardBody style={{paddingBottom:0, paddingTop: 0, paddingLeft:'1.5vw', paddingRight:'1.5vw'}}>
        <p className={classNames(classes.description)} style={{minHeight: '170px', marginBottom:0}}>
          {description}
        </p>
      </CardBody>}
      <CardFooter className={classes.justifyCenter} style={{paddingTop:0, marginTop:-10}}>
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
        {behance &&
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
          target="_blank"
          href={behance}
        >
          <SvgIcon>
            <path d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z"/>
          </SvgIcon>
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
