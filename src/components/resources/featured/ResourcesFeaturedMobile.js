import React from "react";
import ResourcesListFunctionality from "../resourcesList/ResourcesListFunctionality";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Button from "../../material-kit-components/CustomButtons/Button.js";

import {makeStyles} from "@material-ui/core/styles";
import Data from "../../../assets/ResourcesData";
import {CustomTheme, EventCardFeatured, Template} from "../..";
import ResourcesCardGridView from "../../cards/ResourcesCards/ResourcesCardGridView.js";
const FeaturedData = Data.FeaturedData;
const theme = CustomTheme;

const containerStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    display: 'block',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
    filter: 'blur(15px) contrast(125%) brightness(75%)',
  },
  img: {
    position: 'absolute',
    left: '0%',
    top: '7.91%',
    objectFit: 'cover',
  },
  card: {
    position: 'absolute',
    left: '3.4%',
    right: '62.74%',
    top: '7.91%',
    bottom: '14.5%',
    background: '#FFFFFF',
  },
  category: {
    position: 'absolute',
    left: '7.55%',
    right: '7.55%',
    top: '7.81%',
    bottom: '77.93%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1.2vw',
    lineHeight: '30px',
    color: '#000000'
  },
  title: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '2vw',
    lineHeight: 'vh',
    color: '#0072CE'
  },
  button: {
    background: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    marginLeft: '3%',
    borderRadius: '5px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '10px',
    textAlign: 'center',
  },
  description: {
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 'vw',
    lineHeight: '17px',
    color: '#000000',
    paddingTop: '5px'
  },
}));

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

    return (
      <MuiThemeProvider theme={theme}>
      <div style={{backgroundColor: "#3B5998",
          height: "600px",
          width: "104.2%",
          borderStyle: "solid",
          borderColor: "#3B5998",
          borderWidth: "thick",
          flexDirection: "row",
          display: "flex",
          marginLeft: "-4%"}}
          >
          <div style={{marginTop: "20px", marginLeft: "6%", color:"white", textAlign: "left"}}>

          </div>
          <div style={{backgroundColor: "#FB750D",
            marginTop: "-5px",
            height: "550px",
            marginLeft: "80%",
            width: "14.6%",
            marginRight: "-0.25%",
            borderColor: "#FB750D",
            borderRadius: "0px 0px 0px 102px"
          }}>
            <div style={{flexDirection: "column", display: "flex", marginTop: "25px", marginLeft: "-540%",}}>
              <h2 style={{fontSize:40, color:"white"}}>Featured Resources</h2>
              <p style={{fontSize: 20, color:"white"}}>Some of our most popular resources to help you tackle recent events, be mindful of your health, improve your job search, and more.
                <br /><br />
              </p>
            </div>
            <div style={{flexDirection: "row", display: "flex", marginLeft: "-540%",}}>
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
export default ResourcesFeaturedDesktop;
