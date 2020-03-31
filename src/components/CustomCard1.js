import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from './material-kit-components/Typography/Typography';
import theme from "../assets/material-kit-assets/jss/material-kit-react/theme";
import {Link} from "gatsby";

const styles = {
  imageWrapper: {
    textTransform: "uppercase",
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    minHeight: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.25,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    textTransform: "uppercase",
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
};

const useStyles = makeStyles(styles);

function CustomCard1({imgURL, title, linkURL}) {
  const classes = useStyles();

  return (
    <Link to={linkURL}>
      <ButtonBase
        key={title}
        className={classes.imageWrapper}
        style={{width: "100%"}}
      >
        <div
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${imgURL})`,
          }}
        />
        <div className={classes.imageBackdrop}/>
        <div className={classes.imageButton}>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            className={classes.imageTitle}
          >
            {title}
            <div className={classes.imageMarked}/>
          </Typography>
        </div>
      </ButtonBase>
    </Link>
  )
}

CustomCard1.propTypes = {
  title: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired
};

export default CustomCard1;
