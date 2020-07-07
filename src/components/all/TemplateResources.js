import React from "react";
import classNames from "classnames";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import "../../assets/material-kit-assets/scss/material-kit-react.scss?v=1.8.0";
import {MetaData, CustomTheme, CustomHeader} from '../'

const customStyle = makeStyles(() => ({
  container: {
    paddingTop: "50px",
    paddingLeft:'0%',
    paddingRight:'0%',
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

export default function TemplateResources(props) {
  const custStyle = customStyle();
  const { children, styleMain, styleContainer} = props;
  return (
    <MuiThemeProvider theme={CustomTheme}>
      <div>
        <CustomHeader active={props.active} brand={'VIRTUAL CAMPUS'}/>
        <MetaData title={props.title}/>
        <div className={custStyle.main} style={styleMain}>
          <div className={custStyle.container} style={styleContainer}>
            {children}
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}