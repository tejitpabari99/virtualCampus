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
    fontSize: '25px',
    lineHeight: '30px',

    color: '#FFFFFF'
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

const trimDescription = function(description) {
  if(description.length > 250) {
    description = description.substr(0, description.lastIndexOf(' ', 250)) + ' ...'
  }
  return description
};

export default function ResourcesCard(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  let {iosLink, androidLink, website, share, img, title, description, tags,
    headerTitle, headerColor} = props;
  if(headerColor && colorMapping.hasOwnProperty(headerColor)){
    headerColor = colorMapping[headerColor.toLowerCase()]
  }
  else if(!headerColor || headerColor===''){
    headerColor = colorMapping['vc']
  }

  return (
    <Card className={classes.root}>
      <a href={website} target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
        <div className={classes.mediaContainer}>
          {headerTitle && <div className={classes.cardHeader} style={{backgroundColor: headerColor, fontWeight:'bold'}}>{headerTitle}</div>}
          <CardMedia
            component="img"
            height="50.26%"
            className={classes.media}
            image={img}
            title={title}
          />
          <div className={classes.imgOverlay}/>

        </div>

        <CardContent style={{marginBottom: 0}}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {trimDescription(description)}
          </Typography>
          {tags && tags.sort().reverse().map(ele => {
            return (
              <Button disabled style={{'color':'black'}} className={classes.button}>
                  {ele}
              </Button>
            )
          })}

        </CardContent>
        <CardActions disableSpacing style={{marginTop: 0, paddingTop: 0, display: 'none',}}>
          <div style={{float: 'left'}}>
            {share &&
            <div style={{display:'inline-block'}} className={classes.icons}>
              <IconButton aria-describedby={id} onClick={handleClick} size={'small'}>
                <ShareIcon fontSize={'small'}/>
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
            <IconButton href={iosLink} target={'_blank'} rel="noopener noreferrer" className={classes.icons} size={'small'}>
              <AppleIcon fontSize={'small'}/>
            </IconButton>}
            {androidLink &&
            <IconButton href={androidLink} target={'_blank'} rel="noopener noreferrer" className={classes.icons} size={'small'}>
              <AndroidIcon fontSize={'small'}/>
            </IconButton>}
          </div>
          <div style={{float: 'right', marginLeft: 'auto'}}>
            <Button size="small" color="primary" href={website} target='_blank' rel="noopener noreferrer">
              View
            </Button>
          </div>
        </CardActions>
      </a>
    </Card>
  );
}

ResourcesCard.propTypes = {
  iosLink: PropTypes.string,
  androidLink: PropTypes.string,
  website: PropTypes.string.isRequired,
  share: PropTypes.bool,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  headerTitle: PropTypes.string,
  headerColor: PropTypes.string
};
