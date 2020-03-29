import React from "react"
import classNames from "classnames";

import Template from "../components/template";
import WebCard from "../components/WebCard";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import im from "../assets/img/samaritan-temp.png"
import sampleAppData from "../assets/sampleData.js";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
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

export default function CovidResource() {

  const classes = useStyles();
  const contStyle = containerStyles();
  return (
    <Template>
      <div className={classNames(classes.section, contStyle.container)}>
        <GridContainer>
          {sampleAppData.sampleShortAppData.map((d) => {
            return (
              <GridItem xs={12} sm={6} md={4} className={contStyle.gridEle}>
                <WebCard
                  imageURL={d.imageURL}
                  title={d.title}
                  description={d.blurb}
                  btnText={'Read More'}
                  btnID={d.id}
                />
              </GridItem>
            )
          })}
        </GridContainer>
      </div>

    </Template>
    )
};