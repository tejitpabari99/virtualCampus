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
import HomeEvents from '../components/home-sections/HomeEvents'
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
    [theme.breakpoints.up('xs')]:{
      fontSize: '2.5rem',
      lineHeight: '1.00em',
      textAlign:'center',
    },
    [theme.breakpoints.up('sm')]:{
      fontSize: '4rem',
      lineHeight: '1.15em',
      textAlign:'right',
    },
    [theme.breakpoints.up('lg')]:{
      fontSize: '4rem',
      lineHeight: '1.15em',
      textAlign:'right',
    },
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', height: '100%',
    color:'#F1945B',
  },
  toAllLeft: {
    [theme.breakpoints.up('xs')]:{
      marginTop: '30%',
      marginLeft: 0,
      textAlign:'center',
    },
    [theme.breakpoints.up('sm')]:{
      marginTop: 'auto',
      textAlign: 'left',
      marginLeft: '-8rem',
    },
    color:"#BFD8E9",
    fontWeight: 400,
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

    "&:hover span": {
      color: 'white !important',
    },
  },
  buttonSpan:{
    color: '#4284C8',
  },
  text:{
    [theme.breakpoints.up('xs')]:{
      marginTop: '0',
      float:'right',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0',
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right',
      width: 'auto'
    },
    [theme.breakpoints.up('md')]:{
      margin: 0,
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right'
    },
    [theme.breakpoints.up('lg')]:{
      margin: 0,
      float:'right',
      marginRight: '3%',
      marginTop: "10%" ,
      textAlign:'right'
    }
  },
  landing: {
    [theme.breakpoints.up('xs')]:{
      backgroundImage: `url(${landingImage})`,
      backgroundSize: '200%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '80% 100%',
    },
    [theme.breakpoints.up('md')]:{
      backgroundImage: `url(${landingImage})`,
      backgroundSize: '120%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '80% 80%',
    },
    [theme.breakpoints.up('lg')]: {
      backgroundImage: `url(${landingImage})`,
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
    },
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
          <div className={classNames(manual.text)}>
            <h1 className={classNames(manual.toAll, manual.toAllLeft)}>
              COLUMBIA
            </h1>
            <h1 className={manual.toAll}>
              VIRTUAL CAMPUS
            </h1>
            <Button
              href="/events"
              className={classNames(manual.button)}
              // active={true}
            >
              <span className={manual.buttonSpan}>Explore Events</span>
            </Button>
          </div>
        </div>
      <div className={classNames(classes.main)} style={{textAlign:'left'}}>
        <div className={classes.container} id="explore">
          <HomeEvents/>
          <div style={{marginBottom: "100px"}}/>
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
