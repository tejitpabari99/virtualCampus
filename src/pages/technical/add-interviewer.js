import React from "react"
import InterviewerForm from "../../components/technical/InterviewerForm";

class Index extends React.Component {

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
      return (
        <div>
          <InterviewerForm/>
        </div>
      );
  }
}

export default Index;