import React from "react";
import ResourcesListFunctionality from "../resourcesList/ResourcesListFunctionality";
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme} from "../..";
import FeaturedResourcesCardDesktop from "../../cards/ResourcesCards/FeaturedResourcesCardDesktop.js";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;

const useStyles = () => ({
  text: {
    marginTop: "20px",
    marginLeft: "6%",
    color:"white",
    textAlign: "left",
    width:"40%"
  },
  mainBox: {
    backgroundColor: "#3B5998",
    height: "600px",
    width: "104%",
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
    width: "57.8%",
    marginLeft: "13%",
    marginRight: "-0.32%",
    borderColor: "#FB750D",
    borderRadius: "0px 0px 0px 102px"
  },
  cardList: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "-130px",
    marginTop: "25px"
  },
  card: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "40px",
    marginTop: "10px"
  }
});

class ResourcesFeaturedDesktop extends ResourcesListFunctionality {
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
        <div className={classes.mainBox}
          >
          <div className={classes.text}>
            <h2 style={{fontSize:40}}>Resources</h2>
            <p style={{fontSize: 20}}>Some of our most popular resources to help you tackle recent events, be mindful of your health, improve your job search, and more.
              <br /><br />
            </p>
          </div>
          <div className={classes.subBox}>
            <div className={classes.cardList}>
              { Object.keys(FeaturedData).map(key => {
                  if(value < MAX_RESOURCES_DISPLAYED){
                    let data = FeaturedData[key];
                    value = value + 1;
                    return(<div className={classes.card}>
                      <FeaturedResourcesCardDesktop
                      website={data.links.website}
                      img={data.img}
                      title={data.title}
                      description={data.descriptions.description}
                      tags={data.category.tags}
                      category={data.category.category}
                      share/>
                      </div>
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

export default withStyles(useStyles)(ResourcesFeaturedDesktop);
