/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "gatsby"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

let rootPage = null;
if (typeof window !== 'undefined'){
  if(window.location.href.includes('.com')){
    rootPage = window.location.href.split('.com')[1].split('/')[1].split('#')[0].trim().toLowerCase()
  }
  else{
    rootPage = window.location.href.split('/')[3].split('#')[0].trim().toLowerCase()
  }
}
else{
  rootPage = ''
}

import styles from "../../../assets/material-kit-assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  console.log(rootPage);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
          active={rootPage===''}
        >
          <HomeIcon className={classes.icons} /> Campus
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/about-us"
          color="transparent"
          className={classes.navLink}
          active={rootPage==='about-us'}
        >
          <InfoIcon className={classes.icons} /> About Us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/contact-us"
          color="transparent"
          className={classes.navLink}
          active={rootPage==='contact-us'}
        >
          <ContactMailIcon className={classes.icons} /> Contact Us
        </Button>
      </ListItem>
    </List>
  );
}
