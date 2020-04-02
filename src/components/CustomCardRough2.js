import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 100
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 100,
    margin: 8,
    marginRight: 0
  },
  title: {
    margin: 0,
    padding: 0,
    lineHeight: 0.7
  },
  subtitle: {
    marginTop: 15,
    textTransform: "none",
    lineHeight: 1.3
  },
  readMore: {
    color: 'blue',
    textDecoration: 'underline'
  }
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.title}>
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
            Mac Miller Github is a great choice lol whoops what u foinggg Mac Miller Github is a great choice lol whoops what u foinggg
            Mac Miller Github is a great choice lol whoops what u foinggg Mac Miller Github is a great choice lol &nbsp;
            <a className={classes.readMore} href={"www.google.com"}><span>Read More...</span></a>
          </Typography>


        </CardContent>
      </div>
    </Card>
  );
}
