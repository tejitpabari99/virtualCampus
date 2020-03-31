import Header from "./material-kit-components/Header/Header";
import HeaderLinks from "./material-kit-components/Header/HeaderLinks";
import React from "react";

export default function CustomHeader() {
  return (
    <Header
      color="transparent"
      brand="VIRTUAL CAMPUS"
      rightLinks={<HeaderLinks/>}
      fixed
      changeColorOnScroll={{
        height: 150,
        color: "white"
      }}
    />
  )
}