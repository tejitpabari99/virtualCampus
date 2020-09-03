import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {vcColor} from '../../../assets/material-kit-assets/jss/material-kit-react'

import styled from "@emotion/styled/macro";
import {CustomButton} from "../../index";


const Hover = styled.div({
  opacity: 0,
  transition: "opacity 350ms ease",
});

const Background = styled.div({
  color: "#FFF",
  position: "relative",
  cursor: "pointer",
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
});


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
    height: '40.26%',
    opacity:'50%'
  },
  media: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '60.26%',
    borderRadius: '5px 5px 0px 0px'
  },
  frontPositioning: {
    position: 'absolute',
    left: '8.28%',
    right: '8.28%',
    top: '45.02%',
    bottom: '51.04%'
  },
  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    lineHeight: '30px',
    color: 'black'
  },
  title2: {
    paddingLeft: '7.8%',
    paddingRight: '7.8%',
    paddingTop: '8.2%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '25px',
    lineHeight: '1.56',
    color: 'black'
  },
  description: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#000000',
  },
  description2: {
    paddingLeft: '7.8%',
    paddingRight: '7.8%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '1.7',
    color: '#000000',
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
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '15px',
    textAlign: 'center'
  },
  subBox1: {
    backgroundColor: "rgba(253, 100, 100, 0.1)",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "auto",
    width: "100%",
    borderColor: "#FB750D",
    borderRadius: "5px"
  },
  subBox2: {
    backgroundColor: "#F2F9FD",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "auto",
    width: "100%",
    borderColor: "#FB750D",
    borderRadius: "5px"
  },
  addResourceButton: {
    position: "absolute",
    bottom: "10%",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
  },
});

const trimDescription = function(description) {
  if(description.length > 250) {
    description = description.substr(0, description.lastIndexOf(' ', 250)) + ' ...'
  }
  return description
};

export default function ResourcesCardGridView(props) {
  const classes = useStyles();
  let {website, img, title, description, tags, wantSupportWith, resourceOffers} = props;
  return (
    <Background>
      <Card className={classes.root}>
        <a target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
          <div className={classes.mediaContainer}>
            {title && <div className={classes.cardHeader} style={{backgroundColor: vcColor, fontWeight:'bold'}}>{title}</div>}
            <CardMedia
              component="img"
              height="40.26%"
              className={classes.media}
              image={img}
              title={title}
            />
            <div className={classes.imgOverlay}/>

          </div>

          <CardContent style={{marginBottom: 0}}>
            {tags && tags.sort().reverse().map(ele => {
              return (
                <Button style={{'color':'black'}} className={classes.button}>
                    {ele}
                </Button>
              )
            })}
            <div className={classes.frontPositioning}>
              <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                <div className={classes.subBox1}>
                  <span style={{"color":"#FD6464"}}>Want support with:  </span>
                  <span style={{"color":"black"}}>{wantSupportWith}</span>
                </div>
                <div style={{paddingTop: '10px'}} />
                <div className={classes.subBox2}>
                  <span style={{"color":"#0072CE"}}>This resource offers:  </span>
                  <span style={{"color":"black"}}>{resourceOffers}</span>
                </div>
              </Typography>
            </div>
          </CardContent>
        </a>
      </Card>
      <Hover>
        <div style={{marginTop:'-386px'}}>
          <Card className={classes.root}>
            <a target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
              <CardContent style={{marginBottom: 0}}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title2} >
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.description2}>
                  {description}
                </Typography>
                <div className={classes.addResourceButton}>
                  <CustomButton text={"GO TO RESOURCE"}
                              href={website}
                              color={"blue"}
                              size={"large"}
                              target={"_blank"}
                 />
                </div>
              </CardContent>
            </a>
          </Card>
        </div>
      </Hover>
    </Background>
  );
}

ResourcesCardGridView.propTypes = {
  website: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  wantSupportWith: PropTypes.string.isRequired,
  resourceOffers: PropTypes.string.isRequired,
};
