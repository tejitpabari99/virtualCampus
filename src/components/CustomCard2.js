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
  vcColor} from '../assets/material-kit-assets/jss/material-kit-react'

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
    maxWidth: 245,
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
  },
  media: {
    height: 140,
    padding: 0
  },
  title: {
    textTransform: "capitalize",
    height: 60
  },
  description: {
    height: 100,
    overflow: 'hidden'
  },
  cardHeader:{
    textTransform: 'capitalize',
    height: 35,
    borderRadius: "3px",
    padding: "7px",
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "15px",
    marginTop: "-15px",
    border: "0",
    marginBottom: "0",
    textAlign: 'right',
    backgroundColor: colorMapping['vc'],
    position: 'absolute',
    width:'75%',
    right: 10,
    boxShadow:
      "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  container: {
    position: 'relative',
    padding: 0,
    flex: 1,
    justifyContent:'right'
  }
});

const trimDescription = function(description) {
  if(description.length > 145) {
    description = description.substr(0, description.lastIndexOf(' ', 145)) + ' ...'
  }
  return description
};

export default function CustomCard2(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let {iosLink, androidLink, website, share, imgURL, title, description,
          headerTitle, headerColor} = props;
  if(headerColor && colorMapping.hasOwnProperty(headerColor)){
    headerColor = colorMapping[headerColor.toLowerCase()]
  }
  else if(!headerColor || headerColor===''){
    headerColor = colorMapping['vc']
  }

  return (
    <Card className={classes.root}>
      <div className={classes.mediaContainer}>
        {headerTitle && <div className={classes.cardHeader} style={{backgroundColor: headerColor}}>{headerTitle}</div>}
        <CardMedia
          className={classes.media}
          image={imgURL}
          title={title}
        />
      </div>

      <CardContent style={{marginBottom: 0}}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
          {trimDescription(description)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{marginTop: 0, paddingTop: 0}}>
        <div style={{float: 'left'}}>
          {share &&
            <div style={{display:'inline-block'}}>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <ShareIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
                <div style={{display: 'inline-block', paddingLeft: 5, paddingTop: 5, width: '100%'}}>
                  <FacebookShareButton url={website} children={<FacebookIcon round size={24} style={{marginRight: 5}}/>}/>
                  <TwitterShareButton url={website} children={<TwitterIcon round size={24} style={{marginRight: 5}}/>}/>
                  <WhatsappShareButton url={website} children={<WhatsappIcon round size={24} style={{marginRight: 5}}/>}/>
                  <LinkedinShareButton url={website} children={<LinkedinIcon round size={24} style={{marginRight: 5}}/>}/>
                  <EmailShareButton url={website} children={<EmailIcon round size={24} style={{marginRight: 5}}/>}/>
                </div>
              </Popover>
            </div>
          }
          {iosLink &&
          <IconButton href={iosLink} target={'_blank'} rel="noopener noreferrer">
            <AppleIcon />
          </IconButton>}
          {androidLink &&
          <IconButton href={androidLink} target={'_blank'} rel="noopener noreferrer">
            <AndroidIcon />
          </IconButton>}
        </div>
        <div style={{float: 'right', marginLeft: 'auto'}}>
          <Button size="small" color="primary" href={website} target='_blank' rel="noopener noreferrer">
            View
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

CustomCard2.propTypes = {
  iosLink: PropTypes.string,
  androidLink: PropTypes.string,
  website: PropTypes.string.isRequired,
  share: PropTypes.bool,
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headerTitle: PropTypes.string,
  headerColor: PropTypes.string
};
