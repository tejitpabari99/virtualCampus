import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import loading from "./loadingCard.gif";


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
  media: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '60.26%',
    borderRadius: '5px 5px 0px 0px'
  },
});

export default function LazyLoadingCardGridView() {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
        <CardMedia
          component="img"
          height="100%"
          className={classes.media}
          image={loading}
        />
      </Card>
  );
}
