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
  toAllLeft: {
    textAlign: 'left',
    marginLeft: '-8rem'
  },
  button:{
    boxShadow: 'none',
    borderRadius: 30,
    fontSize: '1.1rem',
    width: 200,
    border: '1px solid #4284C8',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    "&:hover": {
      backgroundColor: '#4284C8',
    },

    "&:hover .makeStyles-buttonSpan-13": {
      color: 'white'
    }
  },
  buttonSpan:{
    color: '#4284C8'
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
    backgroundSize: '70%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center'
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
            <h1 style={{color:"#BFD8E9", alignText:'center', fontSize: '4rem', lineHeight: '1.15em', fontWeight: 400, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={classNames(manual.toAll, manual.toAllLeft)}>
              COLUMBIA
            </h1>
            <h1 style={{color:'#F1945B', alignText:'center', fontSize: '4rem', lineHeight: '1.15em', fontWeight: 300, fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'}} className={manual.toAll}>
              VIRTUAL CAMPUS
            </h1>
            <Button
              href="/contact-us"
              className={classNames(manual.button)}
              // active={true}
            >
              <span className={manual.buttonSpan}>Explore Events</span>
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
