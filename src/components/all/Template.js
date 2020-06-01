import React from "react";
import classNames from "classnames";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import "../../assets/material-kit-assets/scss/material-kit-react.scss?v=1.8.0";
import {MetaData, CustomTheme, CustomHeader} from '../'
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";

const customStyle = makeStyles(() => ({
  container: {
    paddingTop: "50px",
    paddingLeft:'3%',
    paddingRight:'3%',
    marginLeft:0,
    marginRight:0,
    background: "#FFFFFF",
  },
  main: {
    paddingTop:50,
    height: '100%',
    background: "#FFFFFF",
    backgroundColor:"#FFFFFF",
    position: "relative",
    marginBottom:'100px'
  },
}));
const useStyles = makeStyles(styles);

export default function Template(props) {
  const classes = useStyles();
  const custStyle = customStyle();
  const { children } = props;
  return (
    <MuiThemeProvider theme={CustomTheme}>
      <div>
        <CustomHeader active={props.active} brand={'VIRTUAL CAMPUS'}/>
        <MetaData title={props.title}/>
        <div className={custStyle.main}>
          <div className={classNames(custStyle.container)} >
            {children}
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
