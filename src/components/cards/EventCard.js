import CardBody from "../material-kit-components/Card/CardBody";
import classNames from "classnames";
import Button from "../material-kit-components/CustomButtons/Button";
import Card from "../material-kit-components/Card/Card";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import CustomTheme from "../all/CustomTheme";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from '../buttons/CustomButton';
import AddCalendar from "../events/AddCalendar";
import Circle from 'react-simple-shapes';
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
    card: {
        display:"flex",
        flexDirection:"row",
        boxShadow: "none",
        marginTop: "0px",
        marginBottom: "5px"
    },
    cardTitle,
    eventTitle: {
        color: 'black',
        position: "relative",
        fontSize:25,
    },
    eventHost: {
        color: '#0072CE',
        position: "relative",
        fontSize:20,
        display: "inline",
    },
    timeInfo: {
        color: 'gray',
        position: "absolute",
        marginLeft: "4.32px",
        marginRight: "9.61px",
        marginTop: "4.68px",
        marginBottom: "9.82px",
        flexDirection: 'row'
    },
    middleDot: {
      height: "5px",
      width: "5px",
      marginLeft: "145px",
      backgroundColor: 'gray',
      borderRadius: "50%",
      display: "inline-block",
      flexDirection: 'row'
    },
    tagInfo: {
        color: 'gray',
        position: "absolute",
        marginLeft: "10px",
        marginTop: "3px",
        flexDirection: 'row'
    },
    cardbody: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    flexBox: {
        flexDirection: 'column'
    },
    flexBox2: {
        flexDirection: 'column',
    },
    imageBox: {
        position: "absolute",
        top: "40px",
        left: "40px",
        backgroundColor: '#F2F9FD',
        paddingLeft: "1%",
        paddingRight: "1%",
        borderRadius: "5.51px",
        height: "40%",
        width: "8%"
    },
    dateText: {
      color: '#0072CE',
      fontSize: 31,
      textAlign: "center"
    },
    monthText: {
      color: '#0072CE',
      fontSize: 17.62,
      textAlign: "center"
    },
    image: {
        borderRadius: "11px",
        height:"200px",
        width:"300px",
        paddingBottom:0,
        marginTop:'5%',
        display:'block',
        objectFit: "cover",
    }
}));

export default function EventCard({ele, onClick}) {
    const classes = useStyles();
    return(

        <div style={{width: "100%"}}>
          <div style={{ color: '#4284C8', backgroundColor: '#4284C8', height: 1 }}></div>

            <Card className={classes.card}>
            <div className={classes.flexBox}>
                <img className={classes.image} src={ele.imgLink} />
                <div className={classes.imageBox}>
                  <p className={classes.dateText}>{ele.startTime.getDate()}</p>
                  <p className={classes.monthText}>{months[ele.startTime.getMonth()]}</p>
                </div>
            </div>
                <CardBody>


                <div className={classes.flexBox}>
                    <p className={classes.eventTitle}>
                        {ele.title} <span className={classes.eventHost}>{ele.hostedBy}</span>
                    </p>

                    <div >
                        <div className={classes.timeInfo}>
                            {formatTime(ele.startTime.getHours(), ele.startTime.getMinutes())} -
                            {formatTime(ele.endTime.getHours(), ele.endTime.getMinutes())} EST
                        </div>
                        <span className={classes.middleDot}></span>
                        <span className={classes.tagInfo}>
                            {ele.tags.map((ta, ind) => {
                                return (
                                  <div>
                                    {ta}
                                  </div>
                                )
                            })}
                        </span>
                    </div>
                    <p style={{color: "black", minHeight: 75, marginBottom: 0, marginTop: 5, marginLeft: 4.32, maxWidth: 600}}>{ele.description}</p>

                    <div style={{color:"#4284C8", marginBottom: 5, marginTop: 10}}>
                        <strong> <AddCalendar info={ele}/></strong>
                    </div>
                </div>
                </CardBody>
                <div className={classes.flexBox2}>
                        <div style={{textAlign:'left'}}>
                            <CustomButton href={ele.website} text={'WEBSITE'}
                                          style={{position: "relative", marginTop:'60%', marginBottom: '5%', width:'90%', height:'10%'}} color={"blue"} size={"medium"}/>
                        </div>
                        <div style={{textAlign:'left'}}>
                            <CustomButton href={ele.eventLink[0].link} text={'CONNECT'}
                                      style={{position: "relative", width:'90%', height:'10%'}} color={"blue"} size={"medium"}/>
                        </div>
                </div>
                <div style={{marginBottom:"-20px"}}></div>
            </Card>
        </div>

    )
}
