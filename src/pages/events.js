import React from "react"
import Template from "../components/template";
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Toolbar from "@material-ui/core/Toolbar";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import classNames from "classnames";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import myEventsList from '../assets/events'
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import { cardTitle } from "../assets/material-kit-assets/jss/material-kit-react.js";
import { Helmet } from 'react-helmet'
import AddIcon from '@material-ui/icons/Add';

const TITLE = 'Events @ Columbia Virtual Campus';
const theme = createMuiTheme();

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}


const localizer = momentLocalizer(moment);
const useStyles = () => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    transition: 'all 0.3s',
    "&:hover": {
      boxShadow: '0 6px 6px 0 rgba(0, 0, 0, 0.14), 0 9px 3px -6px rgba(0, 0, 0, 0.2), 0 3px 15px 0 rgba(0, 0, 0, 0.12)'
    },
    [theme.breakpoints.up('xs')]:{
      display:'block',
      flexDirection: 'none'
    },
    [theme.breakpoints.up('sm')]:{
      display:'block',
      flexDirection: 'none'
    },
    [theme.breakpoints.up('md')]:{
      display:"flex", flexDirection:"row",
    },
    [theme.breakpoints.up('lg')]:{
      display:"flex", flexDirection:"row",
    }
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 500
  },
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.5em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  button:{
    boxShadow:"none",
  },
  button2:{
    boxShadow:"none",
    height:"50px",
    margin:"0px",
    float:"right",
    right:0,
    top:0,
    position:"absolute",
    borderBottomLeftRadius:"15px"
  },
  cardbody:{
    position:"relatives"
  },
  button3:{
    boxShadow:"none",
    backgroundColor:"#BFD8E950",
    margin:"15px",
    marginLeft:"0px"
  },
  addNewButton:{
    float:'right',
    boxShadow:"none",
    fontSize: 15,
  },
  learnMoreModal: {
    boxShadow:"none",
    fontSize: 15,
  },
  image:{
    borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
    [theme.breakpoints.up('xs')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('sm')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('md')]:{
      width:"160px",
      height: "160px",
    },
    [theme.breakpoints.up('lg')]:{
      width:"160px",
      height: "160px",
    }
  }
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

  formatTime(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
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
        <Helmet>
          <title>Events</title>
        </Helmet>
        <div style={{marginTop:"0px"}}>
          <h3 style={{textAlign:"center", color:"#4284C8", fontSize:"30px"}} className={classes.toAll}> ALL EVENTS </h3>
        </div>

        <Button color="vcColor" size="sm" className={classes.addNewButton}
                active={true} target={'_blank'} rel="noopener noreferrer"
                href={'https://forms.gle/fzKvSZqkAVNN6cHY6'}> <AddIcon/> Add New Event
        </Button>
        <Toolbar/>
        <Calendar
          views={['week', 'day']}
          localizer={localizer}
          scrollToTime={new Date()}
          events={myEventsList}
          defaultView={'week'}
          startAccessor="startTime"
          endAccessor="endTime"
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

              <h4 style={{color:"#4284C8"}} className={classNames(classes.cardTitle, classes.toAll)}>{this.state.event.title}</h4>
              <Button
                className={classNames(classes.navLink, classes.button3)}
                size="sm"
                round
                disabled
              >
                {months[this.state.event.startTime.getMonth()].toUpperCase()} {this.state.event.startTime.getDate()}, {this.state.event.startTime.getFullYear()}
              </Button>
              <Button
                className={classNames(classes.navLink, classes.button3)}
                size="sm"
                round
                disabled
              >
                {this.formatTime(this.state.event.startTime.getHours(),this.state.event.startTime.getMinutes())} EST
              </Button>
              {this.state.event.tags.map((ele) => {
               return (
                 <Button
                   color="vcColor"
                   className={classNames(classes.navLink, classes.button)}
                   size="sm"
                   round
                   disabled
                   active={true}
                 >
                   {ele}
                 </Button>
               )
              })}
              <p style={{color:"#4284C8"}} className={classes.toAll}>{this.state.event.description}</p>
              <div style={{textAlign:'center'}}>
                <Button
                  color="vcColor"
                  className={classes.learnMoreModal}
                  size="sm"
                  active={true}
                  href={this.state.event.location}
                  target={'_blank'} rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>}
        <Toolbar />
        <div>
          <h3 className={classes.toAll} style={{textAlign:"left", color:'#F1945B', fontSize:"20px", fontWeight: 100}} > APRIL 2020</h3>
          <div style={{
            color: '#F1945B',
            backgroundColor: '#F1945B',
            height: 3
          }}/>
          {myEventsList.map((ele) => {
            return(
              <a href={ele.location}>
              <Card className={classes.card}>
                <img className={classes.image} src={ele.imgLink} />

                <CardBody className={classes.cardbody}>
                  <h4 style={{color:"#4284C8"}} className={classNames(classes.cardTitle, classes.toAll)}>{ele.title}</h4>
                  <Button
                    className={classNames(classes.navLink, classes.button3)}
                    size="sm"
                    round
                    disabled
                  >
                    {months[ele.startTime.getMonth()].toUpperCase()} {ele.startTime.getDate()}, {ele.startTime.getFullYear()}
                  </Button>
                  <Button
                    className={classNames(classes.navLink, classes.button3)}
                    size="sm"
                    round
                    disabled
                  >
                    {this.formatTime(ele.startTime.getHours(),ele.startTime.getMinutes())} EST
                  </Button>
                  {ele.tags.map((ta) => {
                    return (
                      <Button
                        color="vcColor"
                        className={classNames(classes.navLink, classes.button)}
                        size="sm"
                        round
                        disabled
                        active={true}
                      >
                        {ta}
                      </Button>
                    )
                  })}
                  <p style={{color:"#4284C8"}} className={classes.toAll}>{ele.description}</p>
                </CardBody>
                <Button color="vcColor" size="sm" className={classes.button2}
                        active={true} href={ele.location}
                        target={'_blank'} rel="noopener noreferrer"
                > Attend </Button>
              </Card>
              </a>
            )
          })}

        </div>
      </Template>
    )
  }
}

export default withStyles(useStyles)(Events);
