import GridItem from "../material-kit-components/Grid/GridItem";
import classNames from "classnames";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "gatsby";
import {MuiThemeProvider} from "@material-ui/core/styles";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/ResourcesData";
import {ResourcesCard, CustomTheme} from "..";
const CampusData = Data.CampusData;
const IndexCampusData = Data.IndexCampusData;
const theme = CustomTheme;

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
  gridCont: {
    boxSizing: 'border-box',
    display: 'block'
  },
  mainGrid: {
    marginLeft: 30,
    marginRight: 30
  }
}));


export default function ResourcesList() {
  const contStyle = containerStyles();
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classNames(contStyle.mainGrid)}>
      {Object.keys(IndexCampusData).map(key => {
        return (
          <div className={contStyle.gridCont}>
            <div>
            <Typography variant="h6" component="h2" className={contStyle.title}>{CampusData[key]['title']}</Typography>
            <Link to={CampusData[key]['pageURL']} className={contStyle.seeAllLink}>See All</Link>
            </div>
            <GridContainer>
              {IndexCampusData[key].map(ele => {
                let splt = ele.split('/');
                let data = CampusData[key];
                for (let k of splt){ data = data['data'][k]}
                return (
                  <GridItem xs={12} sm={6} md={3} className={contStyle.gridEle}>
                    <ResourcesCard
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
