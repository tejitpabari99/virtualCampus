import React from "react"

import Template from "./template";
import GridContainer from "./material-kit-components/Grid/GridContainer.js";
import GridItem from "./material-kit-components/Grid/GridItem";
import CustomCard2 from "./CustomCard2";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "40px",
    marginTop: 5
  },
  title: {
    textTransform: "capitalize",
    display: 'inline-block'
  },
}));

const resolveData = function(data) {
  const contStyle = containerStyles();
  return (
    <GridItem xs={12} sm={6} md={3} className={contStyle.gridEle}>
      <CustomCard2
        website={data.website || data.facebook || data.instagram }
        imgURL={data.imgURL}
        title={data.title}
        description={data.description}
        iosLink={data.iosLink}
        androidLink={data.androidLink}
        share
      />
    </GridItem>
  )
};

export default function CovidResource({pageContext}) {
  const contStyle = containerStyles();
  let check=true;
  for(let key of Object.keys(pageContext)){
    if(pageContext[key].hasOwnProperty('data')){check=false}
    break;
  }
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
      {check &&
        <GridContainer>
        {Object.keys(pageContext).map((key, index) => {
          let d = pageContext[key];
          return (resolveData(d))
        })}
        </GridContainer>
      }
      {!check &&
        <div>
          {Object.keys(pageContext).map((key, index) => {
            let d1 = pageContext[key];
            return (
              <div>
                <Typography variant="h6" component="h2" className={contStyle.title}>{d1['title']}</Typography>
                <GridContainer>
                  {Object.keys(d1['data']).map((key2, index2) => {
                    let d2 = d1['data'][key2];
                    return (resolveData(d2))
                  })}
                </GridContainer>
              </div>
            )
          })}
        </div>
      }
    </Template>
  )
};