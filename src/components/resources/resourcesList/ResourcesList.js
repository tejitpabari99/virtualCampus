import React from "react"
import {isMobile, isTablet, isEdge, isIE} from "react-device-detect";
import ResourcesListDesktop from "./ResourcesListDesktop";
import ResourcesListMobile from "./ResourcesListMobile";

class ResourcesList extends React.Component {

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

  render() {
    {/* For mobile's screen orientation update */}
    const isLandscape = this.state.width > this.state.height;
    if (this.state.height === -1) {
      return (
          <div>
            <ResourcesListDesktop data={this.props.data}/>
          </div>
      );
      {/* If Tablet: If in portrait, do mobile component else render desktop */}
    } else if (isTablet) {
      if (isLandscape) {
        return (
          <div>
            <ResourcesListDesktop data={this.props.data}/>
          </div>
        );
      } else {
        return (
          <div>
            <ResourcesListMobile data={this.props.data}/>
          </div>
        );
      }


      {/* For mobile component : IE or Edge must go to mobile since they do not support all css */}
    } else if (isMobile || (isLandscape === false && this.state.height > 700) || isIE || isEdge) {
      return (
        <div>
          <ResourcesListMobile data={this.props.data}/>
        </div>
      );


      {/* Else: desktop: isBrowser
            If screen is full size and not weirdly shape: render desktop version
            Else render mobile version (see above)
            */}
    } else {
      return (
        <div>
          <ResourcesListDesktop data={this.props.data}/>
        </div>
      );
    }
  }
}

export default ResourcesList;


