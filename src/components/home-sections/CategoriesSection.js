import GridItem from "../material-kit-components/Grid/GridItem";
import CustomCard1 from "../CustomCard1";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import React from "react";

import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
import Data from "../../assets/Data";
const CampusData = Data.CampusData;

const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "30px"
  }
}));


export default function CategoriesSection() {
  const contStyle = containerStyles();
  const classes = useStyles();
  return (
    <GridContainer>
      {CampusData.map((ele) => {
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

  )
}
