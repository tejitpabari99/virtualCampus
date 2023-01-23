import React from "react"

import GridContainer from "../../material-kit-components/Grid/GridContainer.js";
import GridItem from "../../material-kit-components/Grid/GridItem";
import {ResourcesCard, Template} from "../";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
}));

const resolveData = function(data) {
  const contStyle = containerStyles();
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
};

export default function CovidResource({pageContext}) {
  const contStyle = containerStyles();
  let check=true;
  for(let key of Object.keys(pageContext)){
    if(pageContext[key].hasOwnProperty('data')){check=false}
    break;
  }
  return (
    <Template>
      {check &&
        <GridContainer>
        {Object.keys(pageContext).map((key, index) => {
          let d = pageContext[key];
          return (resolveData(d))
        })}
        </GridContainer>
      }
      {!check &&
        <div>
          {Object.keys(pageContext).map((key, index) => {
            let d1 = pageContext[key];
            return (
              <div>
                <Typography variant="h6" component="h2" className={contStyle.title}>{d1['title']}</Typography>
                <GridContainer>
                  {Object.keys(d1['data']).map((key2, index2) => {
                    let d2 = d1['data'][key2];
                    return (resolveData(d2))
                  })}
                </GridContainer>
              </div>
            )
          })}
        </div>
      }
    </Template>
  )
};