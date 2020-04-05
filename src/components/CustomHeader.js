import Header from "./material-kit-components/Header/Header";
import HeaderLinks from "./material-kit-components/Header/HeaderLinks";
import React from "react";

export default function CustomHeader(props) {
  return (
    <Header
      color="white"
      brand="VIRTUAL CAMPUS"
      rightLinks={<HeaderLinks active={props.active}/>}
      fixed
      changeColorOnScroll={{
        height: 150,
        color: "white"
      }}
    />
  )
}