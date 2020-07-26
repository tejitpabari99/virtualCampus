import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../material-kit-components/Card/Card";
import CardBody from "../../material-kit-components/Card/CardBody";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import classNames from "classnames";
import { cardTitle } from "../../../assets/material-kit-assets/jss/material-kit-react";
import { CustomButton, AddCalendar, CustomTheme } from "../../";
import EventEmailModal from "./../EventEmailModal"
import Heading1 from "../../text/Heading1";
import Heading2 from "../../text/Heading2";

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

const days = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
};

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const useStyles = makeStyles(() => ({
    root: {
        height: '250px',
        width: "208px",
        align: 'center',
        marginLeft: "22.5%",
        marginRight: "25%",
        marginBottom: "-20px",
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        transition: 'all 0.3s',
        "&:hover": {
            boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 15px 5px -10px rgba(0, 0, 0, 0.2), 0 5px 25px 0 rgba(0, 0, 0, 0.12)"
        }
    },
    imgOverlay: {
        position:'absolute',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 71%)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: '50.26%',
        opacity:'50%'
    },
    media: {
        position: 'absolute',
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '50.26%',
        borderRadius: '5px 5px 0px 0px'
    },
    title: {
        position: 'absolute',
        left: '8.28%',
        right: '8.28%',
        top: '68%',
        bottom: '32%',

        /* Desktop/Body */

        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '21px',

        color: 'black'
    },
    dateInfo: {
        position: 'absolute',
        left: '8.28%',
        right: '8.28%',
        top: '55%',
        bottom: '51.04%',

        /* Desktop/Body */

        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '21px',

        color: '#0072CE'
    },
    timeInfo: {
        position: 'absolute',
        left: '8.28%',
        right: '3%',
        top: '53%',
        bottom: '51.04%',

        /* Desktop/Body */

        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '9px',
        lineHeight: '31px',
        textAlign: 'right',

        color: '#828282'
    },
    organization: {
        position: 'absolute',
        left: '8.28%',
        right: '8.28%',
        top: '85%',
        bottom: '15%',

        /* Desktop/Body */

        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',

        color: '#0072CE'
    },
    button:{
        background: 'rgba(255, 255, 255, 0.85)',
        float: 'right',
        marginLeft:"3%",
        marginTop: "2%",
        marginBottom: 0,
        borderRadius: '5px',
        zIndex: 10,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '10px',
        lineHeight: '15px',
        textAlign: 'center'
    }
}));

export default function EventCardFeaturedMobile({ele}) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const openModalHandler = () => {
        setOpen(true)
    }

    const closeDo = () => {
        setOpen(false);
    }


    const TITLE_MAX = 25
    const ORG_MAX = 45
    if (ele.title.length > TITLE_MAX) {
        ele.title = ele.title.substring(0, TITLE_MAX - 3) + "..."
    }
    if (ele.name.length > ORG_MAX) {
        ele.name = ele.name.substring(0, ORG_MAX - 3) + "..."
    }

    return(
        <Card className={classes.root}>

            <div className={classes.mediaContainer}>
                <CardMedia
                    component="img"
                    height="50.26%"
                    className={classes.media}
                    image={ele.image_link}
                />
                <div className={classes.imgOverlay}/>

                {ele.tags.map((ta, ind) => {
                    if (ta !== undefined && ta !== "") {
                        return (
                            <Button className={classes.button}>
                                {ta}
                            </Button>
                        )
                    }
                })}

            </div>

            <CardContent>
                <Typography variant="h3" component="h3" className={classes.dateInfo}>
                    <p> <strong>{days[ele.start_date.getDay()]} </strong>
                        {ele.start_date.getDate()} {months[ele.start_date.getMonth()]} </p>
                </Typography>

                <Typography className={classes.timeInfo}  style={{marginRight:".5vw"}}>
                    {formatTime(ele.start_date.getHours(), ele.start_date.getMinutes())} -
                    {formatTime(ele.end_date.getHours(), ele.end_date.getMinutes())} {ele.timeZoneGMT}
                </Typography>

                <Typography gutterBottom variant="h5" component="h2" className={classes.title} >
                    {ele.title}
                </Typography>

                <Typography gutterBottom variant="h5" component="h2" className={classes.organization} >
                    {ele.name}
                </Typography>

            </CardContent>
        </Card>
    );
}