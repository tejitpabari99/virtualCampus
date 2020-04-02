import React from "react"

import Template from "./template";
import GridContainer from "./material-kit-components/Grid/GridContainer.js";
import GridItem from "./material-kit-components/Grid/GridItem";
import CustomCard2 from "./CustomCard2";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "30px"
  }
}));

export default function CovidResource({pageContext}) {
  const data = pageContext[0];
  const classes = useStyles();
  const contStyle = containerStyles();
  return (
    <Template>
      <GridContainer>
        {data.map(ele => {
          return(
            <GridItem xs={6} sm={4} md={3} className={contStyle.gridEle}>
              <CustomCard2
                website={ele.website || ele.facebook || ele.instagram }
                imgURL={ele.imgURL}
                title={ele.title}
                description={ele.description}
                iosLink={ele.iosLink}
                androidLink={ele.androidLink}
                headerTitle={ele.headerTitle}
                headerColor={ele.headerColor}
                share
              />
            </GridItem>
          )
        })}
      </GridContainer>
    </Template>
  )
};