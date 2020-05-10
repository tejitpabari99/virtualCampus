import React from "react";
import classNames from "classnames";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import "../../assets/material-kit-assets/scss/material-kit-react.scss?v=1.8.0";
import CustomHeader from "./CustomHeader";
import CustomTheme from "./CustomTheme";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";

const customStyle = makeStyles(() => ({
  container: {
    padding: "50px"
  },
  main: {
    paddingTop:50,
    height: '100%'
  },
  toAll:{
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  }
}));
const useStyles = makeStyles(styles);

export default function Template(props) {
  const classes = useStyles();
  const custStyle = customStyle();
  const { children } = props;
  return (
    <MuiThemeProvider theme={CustomTheme}>
      <div >
        <CustomHeader active={props.active} brand={'VIRTUAL CAMPUS'}></CustomHeader>
        <div className={classNames(classes.mainOther, custStyle.main)}>
          <div className={classNames(classes.container, custStyle.toAll)} style={{paddingTop: "50px"}}>
            {children}
            <div style={{marginBottom: "50px"}}/>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
