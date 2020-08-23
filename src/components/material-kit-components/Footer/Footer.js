import React from "react";
import {isBrowser, isMobile, isTablet} from "react-device-detect";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function Footer(props) {
  if (isMobile) {
    return (
      <FooterMobile/>
    );
  } else {
    return (
        <FooterDesktop />
    );
  }
}
