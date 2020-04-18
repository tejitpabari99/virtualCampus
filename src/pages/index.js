import React from "react"
import classNames from "classnames";
// import {Link} from "gatsby"
import Button from "../components/material-kit-components/CustomButtons/Button.js";
// import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
// import GridItem from "../components/material-kit-components/Grid/GridItem.js";
// import Parallax from "../components/material-kit-components/Parallax/Parallax.js";
import HomeDescription from '../components/home-sections/HomeDescription'
import CustomHeader from "../components/CustomHeader";
import CategoriesSection from '../components/home-sections/CategoriesSection'
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
// import Toolbar from "@material-ui/core/Toolbar";
import landingImage from "../assets/img/graphic.png";
import { Helmet } from 'react-helmet'

const TITLE = 'Columbia Virtual Campus'

const useStyles = makeStyles(styles);

const breakpointValues = {
  xs: 0,
  sm: 700,
  md: 900,
  lg: 1200,
  xl: 1900,
};
const theme = createMuiTheme({ breakpoints: { values: breakpointValues } });

const manualSt = makeStyles(() => ({
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', height: '100%'
  },
  button:{
    boxShadow: 'none',
    borderRadius: '5px',
  },
  text:{
    [theme.breakpoints.up('xs')]:{
      margin:0,
      marginTop: '55%'
    },
    [theme.breakpoints.up('sm')]:{
      margin:0,
      marginTop: '55%'
    },
    [theme.breakpoints.up('md')]:{
      margin:0,
      marginTop: '40%'
    },
    [theme.breakpoints.up('lg')]:{
      margin:0,
      float:'right', marginRight: '3%', marginTop: '10%'
    }
  },
  landing: {
    backgroundImage: `url(${landingImage})`,
    backgroundSize: 'cover'
  }
}));


export default function IndexPage() {
  const classes = useStyles();
  const manual = manualSt();
  console.log(theme.breakpoints.up('sm'));
  return (
    <div style={{background: "white"}} className={manual.toAll}>
      <Helmet>
          <title>{ TITLE }</title>
      </Helmet>
      <CustomHeader active={''} brand={''}></CustomHeader>
        <div className={classNames(manual.landing)} style={{height:"100vh", width:"100%"}}>
          <div className={classNames(manual.text)} style={{textAlign:'right'}}>
            <h1 style={{color:"#2984ce", alignText:'center', fontSize: '3rem', lineHeight: '1.15em', fontWeight: 400, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={manual.toAll}>
              COLUMBIA UNIVERSITY
            </h1>
            <h1 style={{color:'#ff8f4d', alignText:'center', fontSize: '2.9rem', lineHeight: '1.15em', fontWeight: 300, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={manual.toAll}>
              VIRTUAL CAMPUS
            </h1>
            <Button
              href="/contact-us"
              color="vcColor"
              className={classNames(classes.navLink, manual.button)}
              active={true}
            >
              Join Us
            </Button>
          </div>
        </div>
      <div className={classNames(classes.main)}>
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
