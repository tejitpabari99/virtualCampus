import React from "react"
import classNames from "classnames";
import {Link} from "gatsby";

import Template from "./template";
import GridContainer from "./material-kit-components/Grid/GridContainer.js";
import GridItem from "./material-kit-components/Grid/GridItem.js";
import Button from "./material-kit-components/CustomButtons/Button.js";
import iosAppStore from "../assets/img/apple-app-store.svg";
import androidAppStore from "../assets/img/android-app-store.png";
import {Toolbar} from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';

import styles from "../assets/material-kit-assets/jss/material-kit-react/views/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);
const containerStyles = makeStyles(() => ({
  container: {
    paddingTop: "20px"
  },
  gridEle: {
    marginBottom: "30px"
  },
  disableLink: {
    pointerEvents:"none",
    color: '#222',
    fontSize: 18
  },
  description: {
    fontSize: 16
  },
  iosAppStoreIcon: {
    width: "120px"
  },
  androidAppStoreIcon: {
    width: "130px"
  }
}));

export default function CovidResource({pageContext}) {
  const classes = useStyles();
  const contSt = containerStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid
  );
  return (
    <Template>
      <GridContainer justify="center" className={contSt.container}>
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img src={pageContext.imageURL} alt="..." className={imageClasses} />
            </div>
            <div className={classes.name}>
              <h3 className={classes.title}>{pageContext.title}</h3>
              <h6 className={classes.subtitle}>
                {pageContext.developer.map((ele, ind) => {
                  if(ind===pageContext.developer.length-1){ return (<Link className={contSt.disableLink}>{ele}</Link>) }
                  return (<Link className={contSt.disableLink}>{ele + ' | '}</Link>)
              })}
              </h6>
            </div>
          </div>
        </GridItem>
        <div className={classes.description}>
          <p className={contSt.description}>{pageContext.description}</p>
        </div>
      </GridContainer>
      <div style={{textAlign:"center", marginTop: "30px"}}>
        {pageContext.iosAppLink && <a href={pageContext.iosAppLink}>
          <img src={iosAppStore} alt='...' className={contSt.iosAppStoreIcon}/>
        </a>}
        {pageContext.androidAppLink && <a href={pageContext.androidAppLink} style={{marginLeft: "10px"}}>
          <img src={androidAppStore} alt='...' className={contSt.androidAppStoreIcon}/>
        </a>}
      </div>
      <div style={{textAlign:"center", marginTop: "20px"}}>
        {pageContext.emailID &&
        <a href={'mailto:'+pageContext.emailID} style={{marginLeft: "7px"}}><EmailIcon style={{color:'black', fontSize:"28px"}}/></a>}
        {pageContext.websiteLink &&
        <a href={pageContext.websiteLink} style={{marginLeft: "7px"}}><LanguageIcon style={{color:'black', fontSize:"28px"}}/></a>}
        {pageContext.twitterLink &&
          <a href={pageContext.twitterLink} style={{marginLeft: "7px"}}><TwitterIcon style={{color:'#00acee', fontSize:"28px"}}/></a>}
        {pageContext.facebookLink &&
          <a href={pageContext.facebookLink} style={{marginLeft: "7px"}}><FacebookIcon style={{color:'#3b5998', fontSize:"28px"}}/></a>}
        {pageContext.instagramLink &&
          <a href={pageContext.instagramLink} style={{marginLeft: "7px"}}><InstagramIcon style={{color:'#e4405f', fontSize:"28px"}}/></a>}
        {pageContext.linkedinLink &&
          <a href={pageContext.linkedinLink} style={{marginLeft: "7px"}}><LinkedInIcon style={{color:'#0e76a8', fontSize:"28px"}}/></a>}
        {pageContext.githubLink &&
          <a href={pageContext.githubLink} style={{marginLeft: "7px"}}><GitHubIcon style={{color:'#211F1F', fontSize:"28px"}}/></a>}
      </div>
    </Template>
    )
};