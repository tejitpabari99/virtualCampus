import React from "react"
import HomeDesktop from "../components/home/HomeDesktop";
import HomeMobile from "../components/home/HomeMobile";
import {BrowserView, MobileView} from "react-device-detect";

export default function IndexPage() {
  return (
      <div>
          {/* Rendered only on PCs/Desktops/Computers */}
          <BrowserView>
              <HomeDesktop />
          </BrowserView>

          {/* Rendered only on mobile devices */}
          <MobileView>
              <HomeMobile />
          </MobileView>
      </div>
    )
};