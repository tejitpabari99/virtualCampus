import React from "react"

import Template from "../components/template";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import CustomCard2 from "../components/CustomCard2";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export default function CovidResource({pageContext}) {
  const classes = useStyles();
  return (
    <Template>
      <CustomCard2/>
    </Template>
  )
};