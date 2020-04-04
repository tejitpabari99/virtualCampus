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
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);


export default function IndexPage() {
  const classes = useStyles();
  return (
    <div style={{background: "#FFFFFF", fontFamily: "Roboto Helvetica Arial sans-serif", fontWeight: 300, lineHeight: '1.5em'}}>
      <CustomHeader></CustomHeader>
      <Parallax small image={require("../assets/img/campus_graphic.png")} style={{backgroundPosition: "50% 30%"}}>
        {/*<div style={{height:"100%", width:"100%", backgroundColor:"#00000080"}}>*/}
          <div className={classes.container} style={{textAlign:'center', marginTop:'30%'}}>
                <h1 style={{color:"#f57d20", alignText:'center'}}><strong>Virtual Campus</strong></h1>
          </div>
        {/*</div>*/}
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} id="explore">
          <HomeDescription/>
          <CategoriesSection />
            <h5 className={classes.description}>
              Look out for the Virtual Campus Design Challenge 2020 coming up online from April 4th to April 6th, 2020 open to all Columbia/Barnard students.
              To learn more about it and join, visit our <a href="https://www.facebook.com/events/1020511525011664/">Facebook group</a> and join our <a href=" http://bit.ly/virtual-campus-resources ">Slack channel</a>.
              Please contact us if you have any more questions.
              We expect to have many more amazing projects and resources on the website after that time.
            </h5>
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
