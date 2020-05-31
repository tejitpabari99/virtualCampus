import GridItem from "../material-kit-components/Grid/GridItem";
import classNames from "classnames";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "gatsby";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Button from "../material-kit-components/CustomButtons/Button";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/ResourcesData";
import {ResourcesCard, CustomTheme} from "..";
import {cardTitle} from "../../assets/material-kit-assets/jss/material-kit-react";
const CampusData = Data.CampusData;
const theme = CustomTheme;

const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "40px",
    marginTop: 5,
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
  },

  left: {
    left: '0%',
    width: '20%'
  },
  right: {
    left: '25%'
  }
}));


export default function ResourcesList() {
  const contStyle = containerStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classNames(contStyle.mainGrid)}>

        {Object.keys(CampusData).map(key => {
          return (
            <div className={contStyle.gridCont}>
              <div>
                <Typography style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }} variant="h5" component="h2" className={contStyle.title}>{CampusData[key]['title']}</Typography>

              </div>
              <GridContainer>
                {CampusData[key]['data'].map(data => {
                  return (
                    <GridItem xs={12} sm={6} md={3} className={contStyle.gridEle}>
                      <ResourcesCard
                        website={data.links.website}
                        img={data.img}
                        title={data.title}
                        description={data.description}
                        iosLink={data.links.iosLink}
                        androidLink={data.links.androidLink}
                        tags={data.category.tags}
                        share
                      />
                    </GridItem>
                  );

                })}
              </GridContainer>
            </div>
          )
        })}
      </div>
    </MuiThemeProvider>
  )
}