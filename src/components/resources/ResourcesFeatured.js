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
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;


const containerStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    left: '1.42%',
    right: '1.55%',
    top: '3.15%',
    bottom: '2.8%',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    filter: 'blur(15px)'
  }
}));


function ResourcesFeatured() {
  const contStyle = containerStyles();
  return (
    <div>
      hi
    </div>
  )
}

export default ResourcesFeatured;
