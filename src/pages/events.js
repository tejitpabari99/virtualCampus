import React from "react"
import Template from "../components/template";
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Toolbar from "@material-ui/core/Toolbar";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import myEventsList from '../assets/events'
import { createMuiTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const theme = createMuiTheme();


const localizer = momentLocalizer(moment);
const useStyles = () => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class Events extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      open:false,
      event:null,
    };
    this.closeDo = this.closeDo.bind(this);
  }

  closeDo() {
    console.log('here');
    this.setState({open: false})
  }

  eventPropStyles(event, start, end, isSelected){
    let style={
      backgroundColor: '#2984ce'
    };
    return {style:style}
  }

  render() {
    const {classes} = this.props;
    return (
      <Template active={'schedule'}>
        <Button style={{float:'right', marginBottom:15}}>Add New Event</Button>
        <Toolbar/>
        <Calendar
          views={['week', 'day']}
          localizer={localizer}
          scrollToTime={new Date()}
          events={myEventsList}
          defaultView={'week'}
          startAccessor="start"
          endAccessor="end"
          allDayAccessor="allDay"
          style={{ height: 500 }}
          onSelectEvent={(event) => {this.setState({open:true, event})}}
          eventPropGetter={this.eventPropStyles}
        />
        {this.state.open && <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.closeDo}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <h2 id="transition-smodal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>}
      </Template>
    );
  }
}

export default withStyles(useStyles)(Events);
