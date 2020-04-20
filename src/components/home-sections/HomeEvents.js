import React from "react"
import Template from "../template";
import classNames from "classnames";
import Card from "../material-kit-components/Card/Card.js";
import CardBody from "../material-kit-components/Card/CardBody.js";
import Button from "../material-kit-components/CustomButtons/Button.js";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react.js";

import myEventsList from '../../assets/events'
import { Link } from "gatsby";
import { withStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Helmet } from "react-helmet";
const { DateTime } = require("luxon");

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

const theme = createMuiTheme();

const useStyles = () => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    transition: 'all 0.3s',
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
    maxWidth: 500,
    margin: 25
  },
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
  toAll: {
    fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
    WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
  },
  button:{
    boxShadow:"none",
    marginTop: 10,
    marginBottom: 10,
  },
  button2:{
    boxShadow:"none",
    height:"50px",
    margin:"0px",
    float:"right",
    right:0,
    fontSize:15,
    top:0,
    position:"absolute",
    borderBottomLeftRadius:"15px",
    backgroundColor: '#F1945B',
    color:'white !important',
    "&:hover,&:focus": {
      backgroundColor: 'white',
      color: '#F1945B !important'
    },
  },
  cardbody:{
    padding: 10,
    paddingLeft: 20,
    paddnigRight: 20
  },
  button3:{
    boxShadow:"none",
    backgroundColor:"#BFD8E950",
    marginLeft:"0px",
    margin:'15px',
    marginTop: 10,
    marginBottom: 10
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
    borderTopLeftRadius: 6, borderBottomLeftRadius: 6,width:"200px",
    height: "200px",
    [theme.breakpoints.up('xs')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('sm')]:{
      width:'0',
      height: "0",
    },
    [theme.breakpoints.up('md')]:{
      width:"200px",
      height: "200px",
    },
    [theme.breakpoints.up('lg')]:{
      width:"200px",
      height: "200px",
    }
  },
  button4: {
    boxShadow: 'none',
    borderRadius: 30,
    fontSize: '1.1rem',
    width: 150,
    border: '1px solid #F1945B',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#F1945B !important',
    "&:hover,&:focus": {
      backgroundColor: '#F1945B',
      color: 'white !important'
    },
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
    console.log(this.compareTime);
    const { classes } = this.props;
    return (
      <div style={{ marginTop: "100px" }}>
        <Helmet>
          <meta name="description" content="Virtual Campus for the Columbia Community" />
          <link rel="canonical" href="https://columbiavirtualcampus.com/" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Columbia Virtual Campus" />
          <meta property="og:description" content="Virtual Campus for the Columbia Community" />
          <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:alt" content="Columbia Virtual Campus" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
        </Helmet>
        <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}
            className={classes.toAll}> UPCOMING EVENTS </h3>
        <div>
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
                <h4 style={{ color: "#4284C8"}}
                    className={classNames(classes.cardTitle, classes.toAll)}>{this.state.event.title}</h4>
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
                  {this.formatTime(this.state.event.startTime.getHours(), this.state.event.startTime.getMinutes())}
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
                <p style={{ color: "#4284C8", marginBottom: 5 }} className={classNames(classes.toAll)}>
                  <strong>Website: </strong>
                  {this.state.event.website &&
                  <a href={this.state.event.website} target={'_blank'} rel="noopener noreferrer"
                     style={{ color: "#4284C8", textDecoration: 'underline' }}>{this.state.event.hostedBy}</a>
                  }
                  {!this.state.event.website && <span>TBA</span>}
                </p>
                <p style={{ color: "#4284C8", marginBottom: 5 }} className={classNames(classes.toAll)}>
                  <strong>Event Link: </strong>
                  {this.state.event.eventLink &&
                  <a href={this.state.event.eventLink} target={'_blank'} rel="noopener noreferrer"
                     style={{ color: "#4284C8", textDecoration: 'underline' }}>{this.state.event.eventLinkHeader}</a>
                  }
                  {!this.state.event.eventLink && <span>TBA</span>}
                </p>
                <p style={{ color: "#4284C8" }} className={classes.toAll}>{this.state.event.description}</p>
                <p style={{color:"#4284C8", marginBottom: 5, marginTop: 10}} className={classNames(classes.toAll)}>
                  <strong>Hosted By: </strong> {this.state.event.hostedBy}
                </p>
              </div>
            </Fade>
          </Modal>}
          {myEventsList.map((ele) => {
            if(ele.display) {
              return (
                <Card className={classes.card}>
                  <img className={classes.image} src={ele.imgLink}/>

                  <CardBody className={classes.cardbody}>
                    <h4 style={{ color: "#4284C8" }}
                        className={classNames(classes.cardTitle, classes.toAll)}>{ele.title}</h4>
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
                      {this.formatTime(ele.startTime.getHours(), ele.startTime.getMinutes())}
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
                    <p style={{ color: "#4284C8" }} className={classes.toAll}>{ele.description}</p>
                    <p style={{ color: "#4284C8", marginBottom: 5, marginTop: 10 }}
                       className={classNames(classes.toAll)}>
                      <strong>Hosted By: </strong> {ele.hostedBy}
                    </p>
                  </CardBody>
                  <Button color="vcColor" size="sm" className={classes.button2}
                          style={{ color: '#F1945B' }} onClick={() => {
                    this.setState({ open: true, event: ele })
                  }}
                          target={'_blank'} rel="noopener noreferrer"
                  > Attend </Button>
                </Card>
              )
            }
          })}
        </div>
        <div style={{textAlign:"center"}}>
          <Button round className={classes.button4} href={'/events'}
                  style={{color:'white'}}> See More </Button>
        </div>
      </div>
    )
  }
}
export default withStyles(useStyles)(Events);
