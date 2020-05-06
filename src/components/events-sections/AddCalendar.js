import React from "react";
import "./AddCalendarStyles.scss";

import appleIcon from "../../assets/img/apple_icon.png";
import calIcon from "../../assets/img/add-event.png";
import googleIcon from "../../assets/img/google_icon.png";

export default class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render()
    {
        // Get information for start time/date
        const dayOfMonthStart = this.props.info.startTime.getDate() < 10
                            ? "0" + this.props.info.startTime.getDate().toString()
                            : this.props.info.startTime.getDate().toString();
        const monthStart = this.props.info.startTime.getMonth() + 1 < 10
                            ? "0" + (this.props.info.startTime.getMonth() + 1).toString()
                            : (this.props.info.startTime.getMonth() + 1).toString();
        const yearStart = this.props.info.startTime.getFullYear().toString();
        const hourStart = this.props.info.startTime.getHours() < 10
                            ? "0" + this.props.info.startTime.getHours().toString()
                            : this.props.info.startTime.getHours().toString();
        const minuteStart = this.props.info.startTime.getMinutes() < 10
                            ? "0" + this.props.info.startTime.getMinutes().toString()
                            : this.props.info.startTime.getMinutes().toString();


        // Get information for end time/date
        const dayOfMonthEnd = this.props.info.endTime.getDate() < 10
                            ? "0" + this.props.info.endTime.getDate().toString()
                            : this.props.info.endTime.getDate().toString();
        const monthEnd = this.props.info.endTime.getMonth() + 1 < 10
                            ? "0" + (this.props.info.endTime.getMonth() + 1).toString()
                            : (this.props.info.endTime.getMonth() + 1).toString();
        const yearEnd = this.props.info.endTime.getFullYear().toString();
        const hourEnd = this.props.info.endTime.getHours() < 10
                            ? "0" + this.props.info.endTime.getHours().toString()
                            : this.props.info.endTime.getHours().toString();
        const minuteEnd = this.props.info.endTime.getMinutes() < 10
                            ? "0" + this.props.info.endTime.getMinutes().toString()
                            : this.props.info.endTime.getMinutes().toString();

        // Format start/end time for calendars
        const startTimeFmt = yearStart + monthStart + dayOfMonthStart + "T" + hourStart + minuteStart + "00";
        const endTimeFmt = yearEnd + monthEnd + dayOfMonthEnd + "T" + hourEnd + minuteEnd + "00";

        // Create links or .ics text. Note: .ics works for outlook and apple
        const googleLink = "https://calendar.google.com/calendar/r/eventedit?"
                            + "dates="+startTimeFmt+"/"+endTimeFmt+"&location="+this.props.info.location
                            +"&text="+this.props.info.title+"&details="+this.props.info.description;
        const icGenText = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:http://localhost:8000/events\nDTSTART:"
                            +startTimeFmt+"\nDTEND:"+endTimeFmt+"\nSUMMARY:"
                            +this.props.info.title+"\nDESCRIPTION:"+this.props.info.description
                            +"\nLOCATION:"+this.props.info.location+"\nEND:VEVENT\nEND:VCALENDAR";
        const icGenName = this.props.info.title + "_Calendar.ics";

        return (
            <div>
                <img src={calIcon} title={"Add Event to Your Calendar"} />

                <a href="#"
                   onClick={() => this.download(icGenName, icGenText)}
                >
                    <img src={appleIcon} title={"Add to Apple Calendar"} />
                </a>

                <a href={googleLink}
                   target="_blank"
                   rel="nofollow">
                    <img src={googleIcon} title={"Add to Google Calendar"} />
                </a>
            </div>
            )
    }

    // Download ics
    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}