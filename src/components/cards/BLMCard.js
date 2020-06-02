import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
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
    height: '220px',
    maxWidth: 345,
    marginBottom: 25,
    position: 'relative',
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    transition: 'all 0.3s',
    "&:hover": {
      boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 15px 5px -10px rgba(0, 0, 0, 0.2), 0 5px 25px 0 rgba(0, 0, 0, 0.12)"
    }
  },
  title: {
    fontSize: '25px',
    lineHeight: '30px',
    color: '#000000'
  },
  description: {
    fontSize: '13px',
    lineHeight: '21px',
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
    borderRadius: '20px',
    zIndex: 10,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '15px',
    textAlign: 'center'
  },
  link:{
    color:'blue',
    "&:hover": {
      color:'darkblue'
    }
  }
});

export default function BLMCard(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  let {website, share, title, description, tags, links, resume,
          headerTitle, headerColor} = props;
  if(headerColor && colorMapping.hasOwnProperty(headerColor)){
    headerColor = colorMapping[headerColor.toLowerCase()]
  }
  else if(!headerColor || headerColor===''){
    headerColor = colorMapping['vc']
  }

  return (
    <a href={website} target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
    <Card className={classes.root}>
      <CardContent style={{marginBottom: 0, overflowWrap:'anywhere'}}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div" className={classes.description}>
          <div>{description}</div>
          <div><a href={links} target='_blank' rel="noopener noreferrer" className={classes.link}>Check out Profile</a></div>
          <div><a target='_blank' rel="noopener noreferrer" href={resume} className={classes.link} >Check out Resume</a></div>
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
    </a>
  );
}

BLMCard.propTypes = {
  website: PropTypes.string.isRequired,
  share: PropTypes.bool,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string,
  headerTitle: PropTypes.string,
  headerColor: PropTypes.string
};
