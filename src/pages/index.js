import React from "react"
import HomeDesktop from "../components/home/HomeDesktop";
import HomeMobile from "../components/home/HomeMobile";
import {
    BrowserView,
    MobileView,
} from "react-device-detect";



export default function IndexPage() {
  return (
      <div>
          <BrowserView>
              <HomeDesktop />
          </BrowserView>
          <MobileView>
              <HomeMobile />
          </MobileView>
      </div>
    )
};