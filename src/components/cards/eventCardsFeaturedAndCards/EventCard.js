import React from "react"
import {isMobile, isTablet, isEdge, isIE} from "react-device-detect";
import EventCardDesktop from './EventCardDesktop'
import EventCardMobile from './EventCardMobile'

class EventCardHighlight extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: -1 };
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

  // TODO: Remove duplicate code in HomeDesktop.js and HomeMobile.js
  render() {
    const {ele, onClick} = this.props;

    if (this.state.height === -1) {
      return (
        <div>
          <EventCardDesktop ele={ele} onClick={onClick}/>
        </div>
      );
    }
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
            <EventCardDesktop ele={ele} onClick={onClick}/>
          </div>
        );
      } else {
        return (
          <div>
            <EventCardMobile ele={ele} onClick={onClick}/>
          </div>
        );
      }


      {/* For mobile component : IE or Edge must go to mobile since they do not support all css */}
    } else if (isMobile || (isLandscape === false && this.state.height > 700) || isIE || isEdge) {
      return (
        <div>
          <EventCardMobile ele={ele} onClick={onClick}/>
        </div>
      );


      {/* Else: desktop: isBrowser
            If screen is full size and not weirdly shape: render desktop version
            Else render mobile version (see above)
            */}
    } else {
      return (
        <div>
          <EventCardDesktop ele={ele} onClick={onClick}/>
        </div>
      );
    }
  }
}

export default EventCardHighlight;
