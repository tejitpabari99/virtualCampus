import GridItem from "./material-kit-components/Grid/GridItem";
import CustomCard1 from "./CustomCard1";
import GridContainer from "./material-kit-components/Grid/GridContainer";
import React from "react";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
import Data from "../assets/Data";
import Template from "./template";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "30px"
  }
}));


export default function CategoriesSection({pageContext}) {
  const data = pageContext[0];
  console.log(pageContext);
  const contStyle = containerStyles();
  const classes = useStyles();
  return (
    <Template>
      <Helmet>
        <meta name="description" content="Virtual Campus for the Columbia Community" />
        <link rel="canonical" href="https://columbiavirtualcampus.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Columbia Virtual Campus" />
        <meta property="og:description" content="Virtual Campus for the Columbia Community" />
        <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Columbia Virtual Campus" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      </Helmet>
      <GridContainer>
        {data.map((ele) => {
          return (
            <GridItem xs={12} sm={6} md={4} className={contStyle.gridEle}>
              <CustomCard1 imgURL={ele.imgURL}
                           title={ele.title}
                           linkURL={ele.pageURL.toLowerCase()}
              />
            </GridItem>
          )
        })}
      </GridContainer>
    </Template>
  )
}