import classNames from "classnames";
import React, { useState } from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import CustomTheme from "../all/CustomTheme";
import { AddCalendar } from "../";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from '../buttons/CustomButton';
import Heading1Mobile from "../text/Heading1Mobile";
import Heading2Mobile from "../text/Heading2Mobile";
import EventEmailModal from "./EventEmailModal"
const theme = CustomTheme;

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

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const useStyles = makeStyles(() => ({
    card:{
        paddingLeft: "5vw",
        paddingRight: "5vw",
    },
    cardTitle,
    eventTitle: {
        color: 'black',
        marginRight: "8px",
        fontSize:18,
        display:'inline-block'
    },
    eventHost: {
        color: '#0072CE',
        marginTop: "2.34px",
        fontSize:12,
        display:'inline-block'
    },
    timeInfo: {
        color: 'gray',
        display: "block",
        fontSize: 13,
    },
    tagInfo: {
        color: 'gray',
        display: "inline",
        fontSize: 13,
    },
    button:{
        boxShadow:"none",
        marginTop: 0,
        marginBottom: 0
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
        "&:hover": {
            backgroundColor: 'white',
            color: '#F1945B !important'
        },
        "&:focus": {
            backgroundColor: '#F1945B',
            color: 'white !important',
        },
    },
    cardbody:{
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0
    },
    button3:{
        boxShadow:"none",
        backgroundColor:"#BFD8E950",
        margin:"15px",
        marginLeft:"0px",
        marginTop: 0,
        marginBottom: 0
    },
    imageBox:{
        position: "absolute",
        top: "43px",
        left: "15px",
        backgroundColor: '#F2F9FD',
        borderRadius: "5px",
        width: "50px",
        height: "50px"
    },
    dateText:{
      color: '#0072CE',
      fontSize: 20,
      textAlign: "center",
      marginBottom: "0px",
      marginTop: "1.5vw",
        lineHeight: '5vw',
      paddingBottom: "0px"
    },
    monthText:{
      color: '#0072CE',
      fontSize: 12,
      textAlign: "center",
      marginTop: "0px",
      paddingTop: "0px"
    },
    image:{
        borderRadius: 5,
        width:"100%",
        height: "102px",
        objectFit: "cover",
        marginTop: "32px",
        marginBottom: "11px",
        // [theme.breakpoints.up('xs')]:{
        //     display:'none'
        // },
        // [theme.breakpoints.up('sm')]:{
        //     display:'none'
        // },
        // [theme.breakpoints.up('md')]:{
        //     width:"200px",
        //     height: "200px",
        //     display:'block'
        // },
        // [theme.breakpoints.up('lg')]:{
        //     width:"200px",
        //     height: "200px",
        //     display:'block'
        // }
    },
    heading1:{
        lineHeight: '3vw',
        fontSize: 'min(5.2vw, 28px)',
        color:'#000000 !important',
        margin: 0
    },
    heading2:{
        lineHeight: '3vw',
        fontSize: 'min(4.2vw, 20px)',
        color:'#0072CE !important',
        margin: 0,
        marginTop:'12px',
        marginBottom:5,
    },
    middleDot: {
        height: "4px",
        width: "4px",
        marginLeft: "6px", marginRight: "6px",
        marginBottom: "2px",
        backgroundColor: 'gray',
        borderRadius: "50%",
        display: "inline-block",
      },
}));

export default function EventCardMobile({ele}) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const openModalHandler = () => {
        setOpen(true)
    }

    const closeDo = () => {
        setOpen(false);
    }

    return(
        <div className={classes.card}>
            <div style={{position: "relative"}}>
                <img className={classes.image} src={ele.image_link} />
                <div className={classes.imageBox}>
                  <div className={classes.dateText}>{ele.start_date.getDate()}</div>
                  <div className={classes.monthText}>{months[ele.start_date.getMonth()]}</div>
                </div>
            </div>
            <div className={classes.cardbody}>
                <h1 className={classes.heading1}> {ele.event} </h1>
                <h1 className={classes.heading2}>{ele.name}</h1>
                <div className={classes.timeInfo}>
                    {formatTime(ele.start_date.getHours(), ele.start_date.getMinutes())} - {formatTime(ele.end_date.getHours(), ele.end_date.getMinutes())} {ele.timeZoneGMT}

                    {ele.tags.map((ta, ind) => {
                        return (
                        <span>
                            <span className={classes.middleDot}/>
                          <p className={classes.tagInfo}>
                            {ta}
                          </p>
                        </span>
                        )
                    })}
                </div>
                <p style={{color: "black", marginBottom: 10, marginTop: 5}}>{ele.desc}</p>

                <div style={{color:"#4284C8", marginBottom: 5, marginTop: 5}}>
                        <strong><AddCalendar info={ele}/> </strong>
                </div>


                {/* Button Formatting for putting one or two buttons */}

                {ele.invite_link !== '' && ele.event_link !== '' ?
                    <div style={{textAlign:'center', width: "100%"}}>
                        <CustomButton href={ele.event_link} text={'WEBSITE'} newTab
                                    style={{width: "45%", height: 42, fontSize: 14, marginBottom: 20, marginRight: 20, marginTop: 5}} color={'blue'}/>
                        <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                            style={{width: "45%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>
                    </div>
                : ele.invite_link === '' && ele.event_link !== '' ?
                    <CustomButton href={ele.event_link} text={'WEBSITE'} newTab
                                style={{width: "100%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>

                : ele.invite_link !== '' ?
                    <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                            style={{width: "100%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>
                : null}
                {/* Uncomment the button below for testing */}
                {/* <CustomButton onClick={openModalHandler} text={'ATTEND'} newTab
                            style={{width: "100%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/> */}
                {open && <EventEmailModal open={open} closeDo={closeDo} event={ele}/>} 

            </div>

        </div>
    )
}
