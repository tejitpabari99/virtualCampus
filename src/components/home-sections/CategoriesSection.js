import GridItem from "../material-kit-components/Grid/GridItem";
import CustomCard1 from "../CustomCard1";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Link} from "gatsby";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";

import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/Data";
import CustomCard2 from "../CustomCard2";
const CampusData = Data.CampusData;
const IndexCampusData = Data.IndexCampusData;

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
    display: 'inline-block',
    textDecoration: 'underline'
  }
}));


export default function CategoriesSection() {
  const contStyle = containerStyles();
  const classes = useStyles();
  return (
    <div>
      {Object.keys(IndexCampusData).map(key => {
        return (
          <div>
            <Typography variant="h6" component="h2" className={contStyle.title}>{CampusData[key]['title']}</Typography>
            <Link to={CampusData[key]['pageURL']} className={contStyle.seeAllLink}>See All</Link>
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
  )
}
