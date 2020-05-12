import Header from "../material-kit-components/Header/Header";
import HeaderLinks from "../material-kit-components/Header/HeaderLinks";
import React from "react";

export default function CustomHeader(props) {
  return (
    <Header
      color="transparent"
      brand={props.brand}
      rightLinks={<HeaderLinks active={props.active}/>}
      fixed
      changeColorOnScroll={{
        height: 50,
        color: "white"
      }}
    />
  )
}
