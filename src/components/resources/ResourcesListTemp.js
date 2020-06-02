import GridItem from "../material-kit-components/Grid/GridItem";
import classNames from "classnames";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "gatsby";
import {MuiThemeProvider} from "@material-ui/core/styles";

import {makeStyles} from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
  },
  button: {
    background: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    marginLeft:"4%",
    marginRight:"4%",
    marginBottom: '3%',
    marginTop: '3%',

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    color: '#0072CE',
    '&:focus': {
      background: '#F2F2F2'
    },
  },
}));

const allData = function(data) {
  let allRes = [];
  for (let cat in data) {
    let catData = data[cat]['data'];
    for (let i in catData) {
      allRes.push(catData[i]);
    }
  }
  return allRes
};

function display(contStyle, category) {
  console.log("Clicked");
  let allResources = allData(CampusData);
  return (
    <div className={classNames(contStyle.mainGrid)}>
      <GridContainer>
      {Object.keys(allResources).map(i => {
        let data = allResources[i];
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
}

export default function ResourcesList() {
  const contStyle = containerStyles();
  let allResources = allData(CampusData);
  return (
    <MuiThemeProvider theme={theme}>

    <div style={{textAlign:'center'}}>
      {Object.keys(CampusData).map(category => {
        return (
          <Button size="large" onClick={display(contStyle, CampusData[category])} className={contStyle.button}>{CampusData[category]['title']}</Button>
        );
      })}
    </div>

    <div className={classNames(contStyle.mainGrid)}>
      <GridContainer>
      {Object.keys(allResources).map(i => {
        let data = allResources[i];
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

    </MuiThemeProvider>
  )
}




/*
            <div className={contStyle.gridCont}>
            <div>
            <Typography style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }} variant="h5" component="h2" className={contStyle.title}>{CampusData[key]['title']}</Typography>

            </div>


    <div className={classNames(contStyle.mainGrid)}>
      <GridContainer>
      {Object.keys(allResources).map(i => {
        let data = allResources[i];
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
*/