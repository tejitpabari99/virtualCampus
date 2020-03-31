import React from "react"
import classNames from "classnames";
import {Link} from "gatsby"
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import Parallax from "../components/material-kit-components/Parallax/Parallax.js";

import ProductSection from "../components/home-sections/ProductSection.js";
import CustomHeader from "../components/CustomHeader";

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import {makeStyles} from "@material-ui/core/styles";
if (typeof window !== "undefined") {require("smooth-scroll")('a[href*="#"]')}

const useStyles = makeStyles(styles);

const scrollTo = (id) => () => {
  const el = document.querySelector(id);
  if (el) return window.scrollTo(0, el.offsetTop - 20);
  return false
};

export default function IndexPage() {
  const classes = useStyles();
  const myRef = React.createRef();

  return (
    <div>
      <CustomHeader></CustomHeader>
      <Parallax small image={require("../assets/img/columbia_night.jpg")}>
        <div style={{height:"100%", width:"100%", backgroundColor:"#00000080"}}>
          <div className={classes.container} style={{marginTop:"200px"}}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} >
                <h1 style={{color:"white"}}><strong>Virtual Campus</strong></h1>
                <h3 style={{color:"white"}}>
                  A one-stop shop for everything you miss about campus - your friends, the buzz, a stream of resources, and much more.
                </h3>
                <br/>
                <Link to="/#explore">
                  <Button
                    color="danger"
                    variant="outlined"
                    size="lg"
                    href={scrollTo('#explore')}
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-play" />
                      Explore
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} id="explore">
          <ProductSection/>
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
