import React from "react";
import ResourcesListFunctionality from "../resourcesList/ResourcesListFunctionality";
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import Button from "../../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme, EventCardFeatured, Template} from "../..";
import ResourcesCardGridView from "../../cards/ResourcesCards/ResourcesCardGridView.js";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;

const useStyles = () => ({
  text: {
    flexDirection: "column",
    display: "flex",
    marginTop: "25px",
    marginLeft: "-540%",
  },
  mainBox: {
    backgroundColor: "#3B5998",
    height: "600px",
    width: "104.2%",
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    marginLeft: "-4%"
  },
  subBox: {
    backgroundColor: "#FB750D",
    marginTop: "-5px",
    height: "550px",
    marginLeft: "80%",
    width: "14.6%",
    marginRight: "-0.25%",
    borderColor: "#FB750D",
    borderRadius: "0px 0px 0px 102px"
  },
  cardList: {
    flexDirection: "row",
    display: "flex",
    marginLeft: "-540%",
  },
  card: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "40px",
    marginTop: "10px"
  }
});

class ResourcesFeaturedMobile extends ResourcesListFunctionality {
constructor(props){
  super(props);
  this.state = {
    displayResources: []
  };
}
render() {
  const MAX_RESOURCES_DISPLAYED = 3;
  let value = 0;
  const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.mainBox}>
          <div className={classes.subBox}>
            <div className={classes.text}>
              <h2 style={{fontSize:40, color:"white"}}>Featured Resources</h2>
              <p style={{fontSize: 20, color:"white"}}>Some of our most popular resources to help you tackle recent events, be mindful of your health, improve your job search, and more.
                <br /><br />
              </p>
            </div>
            <div className={classes.cardList}>
              { Object.keys(FeaturedData).map(key => {
                  if(value < MAX_RESOURCES_DISPLAYED){
                    let data = FeaturedData[key];
                    value = value + 1;
                    return(
                      <ResourcesCardGridView
                      website={data.links.website}
                      img={data.img}
                      title={data.title}
                      description={data.description}
                      iosLink={data.links.iosLink}
                      androidLink={data.links.androidLink}
                      tags={data.category.tags}
                      category={data.category.category}
                      share/>
                    );
                  }
              })}
            </div>
          </div>
      </div>



      </MuiThemeProvider>
    )
  }

}

export default withStyles(useStyles)(ResourcesFeaturedMobile);
