import React from "react"
import HomeDesktop from "../components/home/HomeDesktop";
import HomeMobile from "../components/home/HomeMobile";
import {withOrientationChange, isBrowser, isMobile, isTablet} from "react-device-detect";
import {withStyles} from "@material-ui/core/styles";
import myEventsList from "../assets/EventsData";


class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (isTablet) {
            return (
                <div>
                    <HomeMobile />
                </div>
            );
        } else if (isMobile) {
                return (
                    <div>
                        <HomeMobile/>
                    </div>
                );
            } else {
                return (
                    <div>
                        <HomeDesktop/>
                    </div>
                );
            }
    }
}

export default withOrientationChange(Index);