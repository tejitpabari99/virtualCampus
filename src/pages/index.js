import React from "react"
import HomeDesktop from "../components/home/HomeDesktop";
import HomeMobile from "../components/home/HomeMobile";
import {isMobile, isTablet} from "react-device-detect";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {

        {/* For mobile's screen orientation update */}
        const isLandscape = this.state.width > this.state.height ? true : false;

        {/* If Tablet:
            If in portrait, do mobile component
            else render desktop
            */}
        if (isTablet) {
            if (isLandscape) {
                return (
                <div>
                    <HomeDesktop/>
                </div>
                );
            } else {
                return (
                    <div>
                        <HomeMobile isLandscape={isLandscape}/>
                    </div>
                );
            }


        {/* For mobile component */}
        } else if (isMobile || isLandscape == false) {
                return (
                    <div>
                        <HomeMobile isLandscape={isLandscape}/>
                    </div>
                );


        {/* Else: desktop: isBrowser
            If screen is full size and not weirdly shape: render desktop version
            Else render mobile version (see above)
            */}
        } else {
            return (
                <div>
                    <HomeDesktop/>
                </div>
            );
        }
    }
}

export default Index;