import React from "react"
import classNames from "classnames";
import Button from "../components/material-kit-components/CustomButtons/Button.js";

import Template from "../components/template";
import WebCard from "../components/WebCard";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import im from "../assets/img/samaritan-temp.png"
import sampleAppData from "../assets/sampleData.js";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import Parallax from "../components/material-kit-components/Parallax/Parallax.js";

import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ProductSection from "./ProductSection.js";

// core components
import InfoArea from "../components/material-kit-components/InfoArea/InfoArea.js";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "30px"
  }
}));


export default function IndexPage() {

  const classes = useStyles();
  const contStyle = containerStyles();
  return (
    <div>
    <Parallax small image={require("../assets/img/columbia_night.jpg")}>
      <div style={{height:"100%", width:"100%", backgroundColor:"#00000080"}}>
      <div className={classes.container} style={{marginTop:"200px"}}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} >
            <h1 style={{color:"white"}}><strong>Virtual Campus</strong></h1>
            <h3 style={{color:"white"}}>
              A one-stop shop for everything you miss about campus - your friends, the buzz, a stream of resources, and much more.
            </h3>
            <br/>
            <Button
              color="danger"
              variant="outlined"
              size="lg"
              href="#explore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-play" />
                Explore
            </Button>
          </GridItem>
        </GridContainer>
      </div>
      </div>
    </Parallax>
    <Template>
      <ProductSection id="explore"/>
    </Template>
    </div>
    )
};

// const IndexPage = () => (
//   classes = useStyles();
//   contStyle = containerStyles();
//   <Template>
//     <div className={classNames(classes.section, contStyle.container)}>
//       <GridContainer>
//         {sampleAppData.sampleShortAppData.map((d) => {
//           return (
//             <GridItem xs={12} sm={6} md={4} className={contStyle.gridEle}>
//               <WebCard
//                 imageURL={d.imageURL}
//                 title={d.title}
//                 description={d.blurb}
//                 btnText={'Read More'}
//                 btnID={d.id}
//               />
//             </GridItem>
//           )
//         })}
//       </GridContainer>
//     </div>
//
//   </Template>
// );
//
//
// export default IndexPage
