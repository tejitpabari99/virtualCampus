import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MetaData, EventCard, EventModal, Template, CustomButton, Title } from "../../components";
import TZ from "countries-and-timezones";
import AddIcon from "@material-ui/icons/Add";
import firebase from "../../firebase";
import Iframe from 'react-iframe'

class cvcBlm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      count: 0,
      myEventsList: [],
      displayEvents: []
    };
  }

  render() {
    return (
      <Template active={"schedule"} title={"Events"}>
        <Title color={"blue"}>Check out events</Title>
        <Iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTYFkksXtBunSIhpYZus5Bw6h3rbGH5eac29gOM14cCQmhLyVMl_AP2herWTshzp4syNjf0keLm9sUL/pubhtml?gid=646327213&amp;single=true&amp;widget=true&amp;headers=false"
                width={'100%'} height={'600px'}/>
      </Template>
    );
  }
}

export default cvcBlm;
