import GridItem from "../material-kit-components/Grid/GridItem";
import classNames from "classnames";
import CustomCard1 from "../CustomCard1";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "gatsby";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import "../../css/resources/categories-sections.css"

import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/Data";
import CustomCard2 from "../CustomCard2";
import { Helmet } from "react-helmet";
const CampusData = Data.CampusData;
const IndexCampusData = Data.IndexCampusData;

const breakpointValues = {
  xs: 0,
  sm: 650,
  md: 1200,
  lg: 1400,
  xl: 1400,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

const useStyles = makeStyles(styles);
const containerStyles = makeStyles((theme) => ({
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
  seeAll: {
    float:'right',
    display: 'inline-block',
    textDecoration: 'underline'
  },
  seeAllLink: {
    color: '#3838ff',
    "&:hover":{
      color: 'blue',
      textDecoration: 'underline'
    },
    float:'right',
    textDecoration: 'underline',
  },
  toAll: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit'
  },
  gridCont: {
    boxSizing: 'border-box',
    display: 'block'
  },
  mainGrid: {
    marginLeft: 30,
    marginRight: 30
  }
}));


export default function CategoriesSection() {
  const contStyle = containerStyles();
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
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
    <div className={classNames(contStyle.toAll, contStyle.mainGrid)}>
      {Object.keys(IndexCampusData).map(key => {
        return (
          <div className={contStyle.gridCont}>
            <div>
            <Typography style={{ textAlign: "center", color: "#4284C8", fontSize: "30px", }} variant="h5" component="h2" className={contStyle.title}>{CampusData[key]['title']}</Typography>
            <button formAction={contStyle.seeAllLink} className="button1">See All</button>
            <!-- <Link to={CampusData[key]['pageURL']} className={contStyle.seeAllLink}>See All</Link> -->
            </div>
            <GridContainer>
              {IndexCampusData[key].map(ele => {
                let splt = ele.split('/');
                let data = CampusData[key];
                for (let k of splt){ data = data['data'][k]}
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
              })}
            </GridContainer>
          </div>
        )
      })}
    </div>
    </MuiThemeProvider>
  )
}