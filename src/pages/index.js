import React from "react"
import classNames from "classnames";
import {Link} from "gatsby"
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import Parallax from "../components/material-kit-components/Parallax/Parallax.js";
import HomeDescription from '../components/home-sections/HomeDescription'
import CustomHeader from "../components/CustomHeader";
import CategoriesSection from '../components/home-sections/CategoriesSection'
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const breakpointValues = {
  xs: 0,
  sm: 700,
  md: 900,
  lg: 1200,
  xl: 1400,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit'
  },
  par: {
    [theme.breakpoints.up('xs')]:{
      height: 500,
    },
    [theme.breakpoints.up('sm')]:{
      height: 550,
    },
    [theme.breakpoints.up('md')]:{
      height: 600,
    },
    [theme.breakpoints.up('lg')]:{
      height: 900,
    }
  },
  text:{
    [theme.breakpoints.up('xs')]:{
      marginTop:'35%'
    },
    [theme.breakpoints.up('sm')]:{
      marginTop:'35%'
    },
    [theme.breakpoints.up('md')]:{
      marginTop:'38%'
    },
    [theme.breakpoints.up('lg')]:{
      marginTop:'29%'
    }
  }
}));


export default function IndexPage() {
  const classes = useStyles();
  const manual = manualSt();
  console.log(theme.breakpoints.up('sm'));
  return (
    <div style={{background: "#FFFFFF"}} className={manual.toAll}>
      <CustomHeader active={''}></CustomHeader>
      <Parallax small image={require("../assets/img/campus_graphic.png")} className={manual.par}>
        {/*<div style={{height:"100%", width:"100%", backgroundColor:"#00000080"}}>*/}
          <div className={classNames(classes.container, manual.text)} style={{textAlign:'center'}}>
                <h1 style={{color:"#f57d20", alignText:'center', fontSize: '3rem', lineHeight: '1.15em', fontWeight: 400, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={manual.toAll}>
                  VIRTUAL CAMPUS
                </h1>
                <h1 style={{color:'#246a6d', alignText:'center', fontSize: '2.9rem', lineHeight: '1.15em', fontWeight: 300, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={manual.toAll}>
                  Columbia University
                </h1>
          </div>
        {/*</div>*/}
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} id="explore">
          <HomeDescription/>
          <CategoriesSection />
          <div style={{marginBottom: "50px"}}/>
        </div>
      </div>
    </div>
    )
};

// const IndexPage = () => (
//   classes = useStyles();
//   contStyle = containerStyles();
//   <Template>
//     <div className={classNames(classes.section, contStyle.container)}>
//       <GridContainer>
//         {sampleAppData.sampleShortAppData.map((d) => {
//           return (
//             <GridItem xs={12} sm={6} md={4} className={contStyle.gridEle}>
//               <WebCard
//                 imageURL={d.imageURL}
//                 title={d.title}
//                 description={d.blurb}
//                 btnText={'Read More'}
//                 btnID={d.id}
//               />
//             </GridItem>
//           )
//         })}
//       </GridContainer>
//     </div>
//
//   </Template>
// );
//
//
// export default IndexPage
