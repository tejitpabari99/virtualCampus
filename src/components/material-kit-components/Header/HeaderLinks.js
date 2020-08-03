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

const rootPage = typeof window !== 'undefined' ? window.location.href.split('/')[3].split('#')[0].trim().toLowerCase() : '';

import styles from "../../../assets/material-kit-assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
          active={props.active===''}
        >
          Campus
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/coding-interviews"
          color="transparent"
          className={classes.navLink}
          active={props.active==='technical'}
        >
          Coding Interviews
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/socalize"
          color="transparent"
          className={classes.navLink}
          active={props.active==='schedule'}
        >
          Socialize
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/resources"
          color="transparent"
          className={classes.navLink}
          active={props.active==='resources'}
        >
          Resources
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/about-us"
          color="transparent"
          className={classes.navLink}
          active={props.active==='about-us'}
        >
          About Us
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/contact-us"
          color="transparent"
          className={classes.navLink}
          active={props.active==='contact-us'}
        >
          Contact Us
        </Button>
      </ListItem>
    </List>
  );
}
