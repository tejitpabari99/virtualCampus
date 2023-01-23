import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../material-kit-components/Card/Card";
import CardBody from "../../material-kit-components/Card/CardBody";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import classNames from "classnames";
import { cardTitle } from "../../../assets/material-kit-assets/jss/material-kit-react";
import { CustomButton, AddCalendar, CustomTheme } from "../../";
import EventEmailModal from "./../EventEmailModal"
import Heading1 from "../../text/Heading1";
import Heading2 from "../../text/Heading2";
import {months, days, formatTime} from "../../events/SharedEvents"

const theme = CustomTheme;

const useStyles = makeStyles(() => ({
  root: {
    height: '249px',
    width: "15rem",
    align: 'center',
    position: 'relative',
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    transition: 'all 0.3s',
    "&:hover": {
      boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 15px 5px -10px rgba(0, 0, 0, 0.2), 0 5px 25px 0 rgba(0, 0, 0, 0.12)"
    }
  },
  imgOverlay: {
    position:'absolute',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 71%)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '50.26%',
    opacity:'50%'
  },
  media: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '50.26%',
    borderRadius: '5px 5px 0px 0px'
  },
  title: {
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '68%',
    bottom: '32%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',

    color: 'black'
  },
  dateInfo: {
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '55%',
    bottom: '51.04%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',

    color: '#0072CE'
  },
  timeInfo: {
    position: 'absolute',
    left: '8.28%',
    right: '3%',
    top: '53%',
    bottom: '51.04%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '31px',
    textAlign: 'right',

    color: '#828282'
  },
  organization: {
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '85%',
    bottom: '15%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',

    color: '#0072CE'
  },
  button:{
    background: 'rgba(255, 255, 255, 0.85)',
    float: 'right',
    marginLeft:"3%",
    marginTop: "2%",
    marginBottom: 0,
    borderRadius: '5px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '15px',
    textAlign: 'center'
  }
}));

export default function EventCardFeaturedDesktop({ ele }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openModalHandler = () => {
    setOpen(true)
  }

  const closeDo = () => {
    setOpen(false);
  }

  const TITLE_MAX = 50
  const ORG_MAX = 70
  if (ele.title.length > TITLE_MAX) {
    ele.title = ele.title.substring(0, TITLE_MAX - 3) + "..."
  }
  if (ele.name.length > ORG_MAX) {
    ele.name = ele.name.substring(0, ORG_MAX - 3) + "..."
  }

  return (
    <Card className={classes.root} style={{marginLeft: "3vw"}}>

        <div className={classes.mediaContainer}>
          <CardMedia
            component="img"
            height="50.26%"
            className={classes.media}
            image={ele.image_link}
          />
          <div className={classes.imgOverlay}/>

          {ele.tags.map((ta, ind) => {
            if (ta !== undefined && ta !== "") {
              return (
                  <Button className={classes.button}>
                    {ta}
                  </Button>
              )
            }
          })}

        </div>

        <CardContent style={{marginTop: "80px"}}>
          <Typography variant="h3" component="h3" className={classes.dateInfo}>
            <p> <strong>{days[ele.start_date.getDay()]} </strong>
            {ele.start_date.getDate()} {months[ele.start_date.getMonth()]} </p>
          </Typography>

          <Typography className={classes.timeInfo}  style={{marginRight:".5vw"}}>
            {formatTime(ele.start_date.getHours(), ele.start_date.getMinutes())} -
            {formatTime(ele.end_date.getHours(), ele.end_date.getMinutes())} {ele.timeZoneGMT}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
            {ele.title}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2" className={classes.organization} >
            {ele.name}
          </Typography>

        </CardContent>
    </Card>

  );
}
