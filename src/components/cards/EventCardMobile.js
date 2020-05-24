import classNames from "classnames";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import CustomTheme from "../all/CustomTheme";
import { AddCalendar } from "../";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from '../buttons/CustomButton';
import Heading1Mobile from "../text/Heading1Mobile";
import Heading2Mobile from "../text/Heading2Mobile";
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
        fontSize: 10,
    },
    tagInfo: {
        color: 'gray',
        display: "inline",
        fontSize: 10,
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
        left: "32px",
        backgroundColor: '#F2F9FD',
        borderRadius: "5px",
        width: "60px",
        height: "60px"
    },
    dateText:{
      color: '#0072CE',
      fontSize: 20,
      textAlign: "center",
      marginBottom: "0px", marginTop: "10px",
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
        fontSize: 'min(3.5vw, 20px)',
        color:'#0072CE !important',
        margin: 0,
        marginTop:'10px'
    },
    middleDot: {
        height: "3px",
        width: "3px",
        marginLeft: "6px", marginRight: "6px",
        marginBottom: "2px",
        backgroundColor: 'gray',
        borderRadius: "50%",
        display: "inline-block",
      },
}));

export default function EventCardMobile({ele}) {
    const classes = useStyles();

    return(
        <div className={classes.card}>
            <div style={{position: "relative"}}>
                <img className={classes.image} src={ele.imgLink} />
                <div className={classes.imageBox}>
                  <div className={classes.dateText}>{ele.startTime.getDate()}</div>
                  <div className={classes.monthText}>{months[ele.startTime.getMonth()]}</div>
                </div>
            </div>

            <div className={classes.cardbody}>
                <h1 className={classes.heading1}> {ele.title} </h1>
                <h1 className={classes.heading2}>{ele.hostedBy}</h1>
                <div className={classes.timeInfo}>
                    {formatTime(ele.startTime.getHours(), ele.startTime.getMinutes())} - {formatTime(ele.endTime.getHours(), ele.endTime.getMinutes())} EST

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
                <p style={{color: "black", marginBottom: 10, marginTop: 5}}>{ele.description}</p>

                <div style={{color:"#4284C8", marginBottom: 5, marginTop: 5}}>
                        <strong><AddCalendar info={ele}/> </strong>
                </div>


                {/* Button Formatting for putting one or two buttons */}

                {ele.eventLink.length > 0 && ele.website !== '' ?
                    <div style={{textAlign:'center', width: "100%"}}>
                        <CustomButton href={ele.website} text={'WEBSITE'} newTab
                                    style={{width: "45%", height: 42, fontSize: 14, marginBottom: 20, marginRight: 20, marginTop: 5}} color={'blue'}/>
                        <CustomButton href={ele.eventLink[0].link} text={ele.eventLink[0].title} newTab
                                style={{width: "45%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>
                    </div>
                : ele.eventLink.length === 0 && ele.website !== '' ?
                    <CustomButton href={ele.website} text={'WEBSITE'} newTab
                                style={{width: "100%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>

                : ele.eventLink.length > 0 ?
                    <CustomButton href={ele.eventLink[0].link} text={ele.eventLink[0].title} newTab
                            style={{width: "100%", height: 42, fontSize: 14, marginBottom: 20, marginTop: 5}} color={'blue'}/>
                : null}

            </div>

        </div>
    )
}
