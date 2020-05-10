import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import TeamMember from "./TeamMember";


import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import gitika from "../../assets/img/gitika.jpg";
import tejit from "../../assets/img/tejit.jpg";
import sharon from "../../assets/img/sharon.jpg";
import archit from "../../assets/img/archit.jpeg";
import karen from "../../assets/img/karen.jpeg";
import lydia from "../../assets/img/lydia.jpeg";

const useStyles = makeStyles(styles);
const custClass = makeStyles(() => ({
  toAll:{
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  section:{
    marginTop:0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom:0
  }
}));

export default function TeamSection() {
  const classes = useStyles();
  const custStyle = custClass();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
      <div className={classNames(classes.section, custStyle.toAll, custStyle.section)}>
        <GridContainer className={custStyle.section}>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Co Founder'} name={'Gitika Bose'}
                        image={gitika}
                        description={'Gitika in a Junior in SEAS, studying CS.'}
                        facebook={"https://www.facebook.com/gitika.bose"}
                        github={"https://github.com/gitika-bose"}
                        linkedin={"https://www.linkedin.com/in/gitikabose/"}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Co Founder'} name={'Tejit Pabari'}
                        image={tejit}
                        description={'Tejit in a Junior in SEAS, studying CS.'}
                        facebook={"https://www.facebook.com/Sharon.jin17"}
                        github={"https://github.com/sharonjin17"}
                        linkedin={"https://www.linkedin.com/in/sharon-jin-728b55152/"}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Resources Lead'} name={'Sharon Jin'}
                        image={sharon}
                        description={'Sharon is a Junior in SEAS, studying CS.'}
                        facebook={"https://www.facebook.com/tejit.pabari"}
                        github={"https://github.com/tejitpabari99"}
                        linkedin={"https://www.linkedin.com/in/tejitpabari/"}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Study Spaces Lead'} name={'Archit Choudhury'}
                        image={archit}
                        description={'Archit is a Junior in GS, studying CS.'}
                        github={"https://github.com/architchoudhury"}
                        facebook={"https://www.facebook.com/architchoudhury"}
                        linkedin={"https://www.linkedin.com/in/architchoudhury/"}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Design Lead'} name={'Karen Lin'}
                        image={karen}
                        description={'Karen is a Junior in SEAS, studying CS.'}
                        facebook={"https://www.facebook.com/karen.lin.9847867"}
                        github={"https://github.com/linkaren"}
                        linkedin={"https://www.linkedin.com/in/klin123/"}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <TeamMember position={'Faculty Advisor'} name={'Lydia Chilton'}
                        image={lydia}
                        description={'Lydia is a Professor at Columbia University in the City of New York'}
                        github={"https://github.com/hmslydia"}
                        facebook={"https://www.facebook.com/hmslydia"}
                        linkedin={"https://www.linkedin.com/in/lydia-chilton-15495427/"}
            />
          </GridItem>
        </GridContainer>
      </div>
  );
}
