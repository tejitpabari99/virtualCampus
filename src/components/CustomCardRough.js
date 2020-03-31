import React from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from './mui-treasury-components/textInfo';
import { useBlogTextInfoContentStyles } from '../assets/mui-treasury-assets/styles/textInfoContent/blog';
import { useOverShadowStyles } from '../assets/mui-treasury-assets/styles/shadow/over';
import theme from "../assets/material-kit-assets/jss/material-kit-react/theme";

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: "100%",
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      // paddingTop: theme.spacing(2),
    },
  },
  media: {
    minWidth: '80px',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: theme.spacing(-3),
    monHeight: '80px',
    // paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: '80px',
      height: '80px',
      marginLeft: theme.spacing(-1),
      marginTop: 0,
      transform: 'translateX(-8px)',
    }
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  heading: {
    padding: 0,
    margin: 0
  }
}));

const CustomCardRough = () => {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={classNames(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'}
      />
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          heading={'What is Git ?'}
          body={'Git is a '
          }
          headingProps={styles.heading}
          bodyProps={styles.heading}
        />
        <Button className={buttonStyles}>Read more</Button>
      </CardContent>
    </Card>
  );
};

export default CustomCardRough;