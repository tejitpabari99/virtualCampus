import CardBody from "../material-kit-components/Card/CardBody";
import classNames from "classnames";
import Button from "../material-kit-components/CustomButtons/Button";
import Card from "../material-kit-components/Card/Card";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import CustomTheme from "../all/CustomTheme";
import { makeStyles } from "@material-ui/styles";
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
    cardTitle,
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
        margin:"15px",
        marginLeft:"0px",
        marginTop: 0,
        marginBottom: 0
    },
    image:{
        borderTopLeftRadius: 6, borderBottomLeftRadius: 6,width:"200px",
        height: "200px",
        [theme.breakpoints.up('xs')]:{
            display:'none'
        },
        [theme.breakpoints.up('sm')]:{
            display:'none'
        },
        [theme.breakpoints.up('md')]:{
            width:"200px",
            height: "200px",
            display:'block'
        },
        [theme.breakpoints.up('lg')]:{
            width:"200px",
            height: "200px",
            display:'block'
        }
    }
}));

export default function EventCard({ele, onClick}) {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <img className={classes.image} src={ele.imgLink}/>
            <CardBody className={classes.cardbody}>
                <h4 style={{ color: "#4284C8", marginRight: 90, marginTop:0  }}
                    >{ele.title}</h4>
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
                    {formatTime(ele.startTime.getHours(), ele.startTime.getMinutes())} EST
                </Button>
                {ele.tags.map((ta, ind) => {
                    return (
                        <Button
                            key={ind}
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
                <p style={{ color: "#4284C8", minHeight: 75, marginBottom:0, marginTop: 10 }}>{ele.description}</p>
                <p style={{ color: "#4284C8", marginBottom: 0, marginTop: 5 }}>
                    <strong>Hosted By: </strong> {ele.hostedBy}
                </p>
            </CardBody>
            <Button color="vcColor" size="sm" className={classes.button2}
                    active={true} onClick={onClick}
                    target={'_blank'} rel="noopener noreferrer"
            > Attend </Button>
        </Card>
    )
}