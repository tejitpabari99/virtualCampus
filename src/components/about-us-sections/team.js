import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
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

import team1 from "../../assets/img/gitika.jpg";
import team2 from "../../assets/img/tejit.jpg";
import team3 from "../../assets/img/sharon.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
      <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Gitika Bose
                <br />
                <small className={classes.smallTitle}>Puppy</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="http://www.google.com">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://github.com/gitika-bose"
                >
                  <GitHubIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.linkedin.com/in/gitikabose/"
                >
                  <LinkedInIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.facebook.com/gitika.bose"
                >
                  <FacebookIcon/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Tejit Pabari
                <br />
                <small className={classes.smallTitle}>Puppy Husband</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="http://www.google.com">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://github.com/tejitpabari99"
                >
                  <GitHubIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.linkedin.com/in/tejitpabari/"
                >
                  <LinkedInIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.facebook.com/tejit.pabari"
                >
                  <FacebookIcon/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Sharon Jin
                <br />
                <small className={classes.smallTitle}>Toddler in a puppy's body</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="http://www.google.com">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://github.com/sharonjin17"
                >
                  <GitHubIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.linkedin.com/in/sharon-jin-728b55152/"
                >
                  <LinkedInIcon/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  target="_blank"
                  href="https://www.facebook.com/Sharon.jin17"
                >
                  <FacebookIcon/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}