import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from "prop-types";
import {vcColor} from '../../../assets/material-kit-assets/jss/material-kit-react'


const useStyles = makeStyles({
  root: {
    height: '145px',
    width: '95%',
    display: 'flex',
    align: 'left',
    position: 'relative',
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    transition: 'all 0.3s',

    "&:hover": {
      boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 15px 5px -10px rgba(0, 0, 0, 0.2), 0 5px 25px 0 rgba(0, 0, 0, 0.12)"
    }
  },
  imgOverlay: {
    position:'absolute',
    background: '#FFFFFF',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    opacity:'0%'
  },
  media: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '100%',
    paddingRight: "70%",
    borderRadius: '5px 5px 0px 0px'
  },
  title: {
    position: 'absolute',
    left: '35%',
    right: '8.28%',
    top: '25%',
    bottom: '51.04%',

    /* Desktop/Body */

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    lineHeight: '30px',

    color: '#000000'
  },
  description: {
    // display: 'none',
    // height: 60,
    position: 'absolute',
    left: '35%',
    right: '8.28%',
    top: '50%',
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
  category: {
    position: 'absolute',
    left: '35%',
    top: '10%',

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '16px',

    color: "#636363",
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
    backgroundColor: vcColor,
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

export default function FeaturedResourcesCardDesktop(props) {
  const classes = useStyles();

  let {website, img, title, description, tags, category} = props;

  return (
    <Card className={classes.root}>
      <a href={website} target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
      <div className={classes.mediaContainer}>
        <CardMedia
          component="img"
          height="100%"
          className={classes.media}
          image={img}
          title={title}
        />
        <div className={classes.imgOverlay}/>
      </div>

        <CardContent style={{marginBottom: 0}}>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.category} >
        {category}
        </Typography>
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
      </a>
    </Card>
  );
}

FeaturedResourcesCardDesktop.propTypes = {
  website: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};
