import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
    textAlign:'center',
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
    fontSize: '20px',
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
    color:'#82b7e8',
    "&:hover": {
      color:'#252c55'
    },
    fontSize:'20px'
  }
});

export default function BLMCard(props) {
  const classes = useStyles();
  let {website, title, description, links, resume} = props;
  return (
    <a href={website} target='_blank' rel="noopener noreferrer" style={{color: 'black'}}>
    <div>
    <div style={{display:'flex', flexDirection:'horizontal', justifyContent:'space-between'}}>
    <div className={classes.title}><strong> {title}</strong></div>
    <div style={{display:'flex',flexDirection:'horizontal'}}>{links && <div style={{marginRight:"3%"}}><a href={links} target='_blank' rel="noopener noreferrer"
                            className={classes.link}>Profile</a></div>} {resume && <div><a target='_blank' rel="noopener noreferrer"
                             href={resume} className={classes.link} > Resume</a></div>}</div>
    </div>
    <i> {description} </i>
    </div>

    </a>
  );
}

BLMCard.propTypes = {
  website: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
  resume: PropTypes.string
};
