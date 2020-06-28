import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, WhatsappShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon, WhatsappIcon
} from "react-share";
import PropTypes from "prop-types";
import {primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  vcColor} from '../../assets/material-kit-assets/jss/material-kit-react'

const colorMapping = {
  'primary': primaryColor,
  'warning': warningColor,
  'danger': dangerColor,
  'success': successColor,
  'info': infoColor,
  'rose': roseColor,
  'gray': grayColor,
  'vc': vcColor
};


const useStyles = makeStyles({
  root: {
    height: '386px',
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
    top: '29.02%',
    bottom: '51.04%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',

    color: '#000000'
  },
  dateInfo: {
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '29.02%',
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
    right: '8.28%',
    top: '29.02%',
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
    top: '29.02%',
    bottom: '51.04%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',

    color: '#0072CE'
  },
  description: {
    // display: 'none',
    // height: 60,
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '55.44%',
    bottom: '9.59%',

    /* Desktop/Details */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',

    color: '#000000',
    // overflow: 'hidden'
  },
  cardHeader:{
    textTransform: 'capitalize',
    height: 35,
    borderRadius: "3px",
    padding: "0px",
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "4px",
    marginTop: "-15px",
    border: "0",
    marginBottom: "0",
    textAlign: 'right',
    backgroundColor: colorMapping['vc'],
    position: 'absolute',
    width:'75%',
    right: 10

  },
  container: {
    position: 'relative',
    padding: 0,
    flex: 1,
    justifyContent:'right'
  },
  icons:{
    marginRight: 0,
    marginLeft: 0
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
});

export default function EventTileCard(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(headerColor && colorMapping.hasOwnProperty(headerColor)){
    headerColor = colorMapping[headerColor.toLowerCase()]
  }
  else if(!headerColor || headerColor===''){
    headerColor = colorMapping['vc']
  }

  return (
    <Card className={classes.root}>

        <div className={classes.mediaContainer}>
          {headerTitle && <div className={classes.cardHeader} style={{backgroundColor: headerColor, fontWeight:'bold'}}>{headerTitle}</div>}
          <CardMedia
            component="img"
            height="50.26%"
            className={classes.media}
            image={img}
          />
          <div className={classes.imgOverlay}/>

        </div>

        <CardContent style={{marginBottom: 0}}>

          <Typography className={classes.dateInfo}>
            {date}
          </Typography>

          <Typography className={classes.timeInfo}>
            {time}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
            {title}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2" className={classes.organization} >
            {organization}
          </Typography>

          {tags && tags.map(ele => {
            return (
              <Button className={classes.button}>
                {ele}
              </Button>
            )
          })}
        </CardContent>
    </Card>
  );
}

EventTileCard.propTypes = {
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  headerTitle: PropTypes.string,
  headerColor: PropTypes.string
};
