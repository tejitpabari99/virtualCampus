import React from "react"
import Button from "../material-kit-components/CustomButtons/Button.js";
import myEventsList from '../../assets/EventsData'
import { withStyles } from "@material-ui/core/styles";
import {EventCard, EventModal, CustomButton} from '../'

const useStyles = () => ({
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
            myEventsList: myEventsList,
            displayEvents: null
        };
        this.makeDisplayEvents(myEventsList);
        this.closeDo = this.closeDo.bind(this);
    }

    makeDisplayEvents(events){
        let arr = [];
        events.forEach((ele) => {
            if(ele.display){arr.push(ele)}
        });
        this.state.displayEvents = arr;
    }

    formatTime(hours, min) {
        let h = hours>12?hours-12:hours;
        let m = min<10?'0'+min.toString():min.toString();
        let add = hours>12?'PM':'AM';
        return h + ':' + m + add
    }

    closeDo() {
        this.setState({open: false, count:0})
    }

    eventPropStyles(event, start, end, isSelected){
        let style={
            backgroundColor: '#2984ce'
        };
        return {style:style}
    }

    attendEvent(ele) {
        this.setState({ open: true, event: ele })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div >
                    {this.state.open && <EventModal open={this.state.open} closeDo={this.closeDo} event={this.state.event}/>}
                    <div style={{ color: "#4284C8", backgroundColor: "#4284C8", height: 1 }}/>
                    {this.state.displayEvents.map((ele, ind) => {
                        if(ele.display) {
                            return(<EventCard key={ind} ele={ele} onClick={() => this.attendEvent(ele)}/>)
                        }
                        return null
                    })}
                </div>
                {this.state.displayEvents.length>0 && <div style={{textAlign:"center", marginTop:"20px"}}>
                    <CustomButton text={'SEE MORE'} href={'/events'} size={"small"} color={"orange"} rounded/>
                </div>}
            </div>
        )
    }
}
export default withStyles(useStyles)(Events);
