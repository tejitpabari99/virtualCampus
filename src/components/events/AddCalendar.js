import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";


let formatDescription = function(desc, eve, type){
    var lineBreak = "\\n";
    var website = "https://columbiavirtualcampus.com"

    if (type === "Google") {
        lineBreak = "%0D%0A"
        website = "<a href='https://columbiavirtualcampus.com'>https://columbiavirtualcampus.com/</a>"
    }

    let d = desc + lineBreak + lineBreak;
    //d += eve.event + " link: " + eve.invite_link + lineBreak + lineBreak
    if (eve.event_link !== undefined)
        d += eve.event + " website: " + eve.event_link + lineBreak + lineBreak

    d += "Please visit "+website+" for more events like this! If you would like the zoom link to "+eve.event
        +", please enter your university email address on our website for the event you wish to attend."
    return d;
};

let download = function(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:calendar/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

const useStyles = makeStyles({
    img: {
        left: 0,
        right: 0,
        background: '#FFFFFF',
        paddingBottom: 5,
        marginRight: 7,
        marginLeft: 3
    },
    inline:{
        display: 'inline-block',
    },
    smaller: {
        paddingBottom: 6,
        marginLeft: 0,
    },
    imgDim:{
        height:26,
        width:25,
    }
});


export default function AddCalendar({info}) {
    // Get information for start time/date
    const classes = useStyles();
    const dayOfMonthStart = info.start_date.getDate() < 10
        ? "0" + info.start_date.getDate().toString()
        : info.start_date.getDate().toString();
    const monthStart = info.start_date.getMonth() + 1 < 10
        ? "0" + (info.start_date.getMonth() + 1).toString()
        : (info.start_date.getMonth() + 1).toString();
    const yearStart = info.start_date.getFullYear().toString();
    const hourStart = info.start_date.getHours() < 10
        ? "0" + info.start_date.getHours().toString()
        : info.start_date.getHours().toString();
    const minuteStart = info.start_date.getMinutes() < 10
        ? "0" + info.start_date.getMinutes().toString()
        : info.start_date.getMinutes().toString();


    // Get information for end time/date
    const dayOfMonthEnd = info.end_date.getDate() < 10
        ? "0" + info.end_date.getDate().toString()
        : info.end_date.getDate().toString();
    const monthEnd = info.end_date.getMonth() + 1 < 10
        ? "0" + (info.end_date.getMonth() + 1).toString()
        : (info.end_date.getMonth() + 1).toString();
    const yearEnd = info.end_date.getFullYear().toString();
    const hourEnd = info.end_date.getHours() < 10
        ? "0" + info.end_date.getHours().toString()
        : info.end_date.getHours().toString();
    const minuteEnd = info.end_date.getMinutes() < 10
        ? "0" + info.end_date.getMinutes().toString()
        : info.end_date.getMinutes().toString();

    // Format start/end time for calendars
    const startTimeFmt = yearStart + monthStart + dayOfMonthStart + "T" + hourStart + minuteStart + "00";
    const endTimeFmt = yearEnd + monthEnd + dayOfMonthEnd + "T" + hourEnd + minuteEnd + "00";

    let descGoogleCal = formatDescription(info.desc, info, "Google");
    let descOutlookCal = formatDescription(info.desc, info, "Outlook");
    let desciCal = formatDescription(info.desc, info, "iCal");
    let loc = info.event_link;
    // Create links or .ics text. Note: .ics works for outlook and apple
    const googleLink = "https://calendar.google.com/calendar/r/eventedit?"
        + "dates="+startTimeFmt+"/"+endTimeFmt+"&location="+loc
        +"&text="+info.event+"&details="+descGoogleCal;
    const icGenText = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:"+loc+"\nDTSTART:"
        +startTimeFmt+"\nDTEND:"+endTimeFmt+"\nSUMMARY:"
        +info.event+"\nDESCRIPTION:"+descOutlookCal
        +"\nLOCATION:"+loc+"\nEND:VEVENT\nEND:VCALENDAR";
    const iCalGenText = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:"+loc+"\nDTSTART:"
        +startTimeFmt+"\nDTEND:"+endTimeFmt+"\nSUMMARY:"
        +info.event+"\nDESCRIPTION:"+desciCal
        +"\nLOCATION:"+loc+"\nEND:VEVENT\nEND:VCALENDAR";
    const icsGenName = info.event + "_Calendar.ics";
    const icalGenName = info.event + "_Calendar.ics";

    return (
        <div className={classes.inline}>

            {/* Google GCal */}
            <a href={googleLink}
               target={'_blank'} rel="noopener noreferrer"
               title={"Add to Google Calendar"}>
                <img title={"Add to Google Calendar"} className={classNames(classes.img, classes.imgDim)} alt={"Add to Google Calendar"}
                     src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTEuOTk5IDUxMS45OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMS45OTkgNTExLjk5OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiNFNkU2RTY7IiBkPSJNNDU1LjYxNywxMC44NDZINTYuMzY3Yy0xMi40MzcsMC0yMi41MTcsMTAuMDk0LTIyLjUxNywyMi41MzF2NzQuOTEyaDQ0NC4yOTZWMzMuMzc3ICBDNDc4LjE0NywyMC45MzksNDY4LjA1MywxMC44NDYsNDU1LjYxNywxMC44NDZ6IE0xNDguMTYsNTUuOTIyYy01Ljk1MywwLTEwLjc4NC00LjgzMS0xMC43ODQtMTAuNzg0czQuODMxLTEwLjc4NCwxMC43ODQtMTAuNzg0ICBjNS45NTMsMCwxMC43ODQsNC44MzEsMTAuNzg0LDEwLjc4NFMxNTQuMTEyLDU1LjkyMiwxNDguMTYsNTUuOTIyeiBNMzY2LjY1Niw1NS45MjJjLTUuOTUzLDAtMTAuNzg0LTQuODMxLTEwLjc4NC0xMC43ODQgIHM0LjgzMS0xMC43ODQsMTAuNzg0LTEwLjc4NHMxMC43ODQsNC44MzEsMTAuNzg0LDEwLjc4NFMzNzIuNjA4LDU1LjkyMiwzNjYuNjU2LDU1LjkyMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzNBNUJCQzsiIGQ9Ik01MTEuNTA1LDExMy41MjNsLTM0LjA3NywxNzcuNzA0bDEzLjkxOCwxODQuNzkzYzEuMDIxLDEzLjU1OS05LjcwNiwyNS4xMzQtMjMuMzIyLDI1LjEzNEg0My45NiAgYy0xMy42MDIsMC0yNC4zNDMtMTEuNTc1LTIzLjMyMi0yNS4xMzRsMTMuOTMzLTE4NC43OTNMMC40OTQsMTEzLjUyM0MtMi43MTIsOTYuODE1LDEwLjA5OSw4MS4zLDI3LjEyMyw4MS4zaDQ1Ny43NCAgQzUwMS45MDEsODEuMyw1MTQuNzExLDk2LjgxNSw1MTEuNTA1LDExMy41MjN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNDY4LjAyNCw1MDEuMTUzSDQzLjk2Yy0xMy42MDIsMC0yNC4zNDMtMTEuNTc1LTIzLjMyMi0yNS4xMzRsMTMuOTMzLTE4NC43OTNoMjQ0LjQzNWgxOTguNDIzICBsMTMuOTE4LDE4NC43OTNDNDkyLjM2OCw0ODkuNTc4LDQ4MS42NDEsNTAxLjE1Myw0NjguMDI0LDUwMS4xNTN6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yNDcuMzcxLDI0NC44NTZjMC0zNC42ODctMjkuMDI2LTYyLjkwNi02NC43MDMtNjIuOTA2cy02NC43MDMsMjguMjE5LTY0LjcwMyw2Mi45MDZoMjEuNTY4ICAgYzAtMjIuNzk0LDE5LjM1MS00MS4zMzgsNDMuMTM2LTQxLjMzOHM0My4xMzYsMTguNTQ0LDQzLjEzNiw0MS4zMzhzLTE5LjM1MSw0MS4zMzgtNDMuMTM2LDQxLjMzOGgtMjAuMTN2MjEuNTY4aDIwLjEzICAgYzIzLjc4NSwwLDQzLjEzNiwxOC41NDQsNDMuMTM2LDQxLjMzOGMwLDIyLjc5NC0xOS4zNTEsNDEuMzM4LTQzLjEzNiw0MS4zMzhzLTQzLjEzNi0xOC41NDQtNDMuMTM2LTQxLjMzOGgtMjEuNTY4ICAgYzAsMzQuNjg3LDI5LjAyNiw2Mi45MDYsNjQuNzAzLDYyLjkwNnM2NC43MDMtMjguMjE5LDY0LjcwMy02Mi45MDZjMC0yMS42NjMtMTEuMzIyLTQwLjgwMi0yOC41MTMtNTIuMTIyICAgQzIzNi4wNSwyODUuNjU5LDI0Ny4zNzEsMjY2LjUxOSwyNDcuMzcxLDI0NC44NTZ6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRkZGRkZGOyIgcG9pbnRzPSIyODkuMjg5LDIxOC43MDQgMzAwLjM1MywyMzcuMjE4IDM0Mi45ODksMjExLjc0MSAzNDIuOTg5LDQwMS4yMjIgMzY0LjU1Niw0MDEuMjIyICAgIDM2NC41NTYsMTczLjcyOCAgIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
            </a>


            {/* Outlook Cal */}
            <s style={{cursor: 'pointer'}}
               href="#"
               onClick={() => download(icsGenName, icGenText)}
            >
                <img  title={"Add to Outlook Calendar"} className={classNames(classes.img, classes.imgDim)} alt={"Add to Outlook Calendar"}
                      src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojMTk3NkQyOyIgZD0iTTQ5NiwxMTIuMDExSDI3MmMtOC44MzIsMC0xNiw3LjE2OC0xNiwxNnM3LjE2OCwxNiwxNiwxNmgxNzcuMzc2bC05OC4zMDQsNzYuNDQ4bC03MC40OTYtNDQuODMyICBsLTE3LjE1MiwyNy4wMDhsODAsNTAuODhjMi41OTIsMS42NjQsNS42LDIuNDk2LDguNTc2LDIuNDk2YzMuNDU2LDAsNi45NDQtMS4xMiw5LjgyNC0zLjM2TDQ4MCwxNjAuNzE1djIwNy4yOTZIMjcyICBjLTguODMyLDAtMTYsNy4xNjgtMTYsMTZzNy4xNjgsMTYsMTYsMTZoMjI0YzguODMyLDAsMTYtNy4xNjgsMTYtMTZ2LTI1NkM1MTIsMTE5LjE3OSw1MDQuODMyLDExMi4wMTEsNDk2LDExMi4wMTF6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyMTk2RjM7IiBkPSJNMjgyLjIwOCwxOS42OTFjLTMuNjQ4LTMuMDQtOC41NDQtNC4zNTItMTMuMTUyLTMuMzkybC0yNTYsNDhDNS40NzIsNjUuNzA3LDAsNzIuMjk5LDAsODAuMDExdjM1MiAgYzAsNy42OCw1LjQ3MiwxNC4zMDQsMTMuMDU2LDE1LjcxMmwyNTYsNDhjMC45NiwwLjE5MiwxLjk1MiwwLjI4OCwyLjk0NCwwLjI4OGMzLjcxMiwwLDcuMzI4LTEuMjgsMTAuMjA4LTMuNjggIGMzLjY4LTMuMDQsNS43OTItNy41ODQsNS43OTItMTIuMzJ2LTQ0OEMyODgsMjcuMjQzLDI4NS44ODgsMjIuNzMxLDI4Mi4yMDgsMTkuNjkxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkFGQUZBOyIgZD0iTTE0NCwzNjguMDExYy00NC4wOTYsMC04MC00My4wNzItODAtOTZzMzUuOTA0LTk2LDgwLTk2czgwLDQzLjA3Miw4MCw5NiAgUzE4OC4wOTYsMzY4LjAxMSwxNDQsMzY4LjAxMXogTTE0NCwyMDguMDExYy0yNi40NjQsMC00OCwyOC43MDQtNDgsNjRzMjEuNTM2LDY0LDQ4LDY0czQ4LTI4LjcwNCw0OC02NCAgUzE3MC40NjQsMjA4LjAxMSwxNDQsMjA4LjAxMXoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
            </s>


            {/* Apple iCal */}
            <s style={{cursor: 'pointer'}}
               href="#"
               onClick={() => download(icalGenName, iCalGenText)}
            >
                <img title={"Add to Apple Calendar"} alt={"Add to Appled Calender"}
                     className={classNames(classes.smaller, classes.img, classes.imgDim)}
                     src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMjEuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxwYXRoIGQ9Ik0xODUuMjU1LDUxMmMtNzYuMjAxLTAuNDM5LTEzOS4yMzMtMTU1Ljk5MS0xMzkuMjMzLTIzNS4yMWMwLTEyOS40MDQsOTcuMDc1LTE1Ny43MzQsMTM0LjQ4Ny0xNTcuNzM0ICAgYzE2Ljg2LDAsMzQuODYzLDYuNjIxLDUwLjc0MiwxMi40OGMxMS4xMDQsNC4wODcsMjIuNTg4LDguMzA2LDI4Ljk3NSw4LjMwNmMzLjgyMywwLDEyLjgzMi0zLjU4OSwyMC43ODYtNi43MzggICBjMTYuOTYzLTYuNzUzLDM4LjA3MS0xNS4xNDYsNjIuNjUxLTE1LjE0NmMwLjA0NCwwLDAuMTAzLDAsMC4xNDYsMGMxOC4zNTQsMCw3NC4wMDQsNC4wMjgsMTA3LjQ2MSw1NC4yNzJsNy44MzcsMTEuNzc3ICAgbC0xMS4yNzksOC41MTFjLTE2LjExMywxMi4xNTgtNDUuNTEzLDM0LjMzNi00NS41MTMsNzguMjY3YzAsNTIuMDMxLDMzLjI5Niw3Mi4wNDEsNDkuMjkyLDgxLjY2NSAgIGM3LjA2MSw0LjI0OCwxNC4zNyw4LjYyOCwxNC4zNywxOC4yMDhjMCw2LjI1NS00OS45MjIsMTQwLjU2Ni0xMjIuNDE3LDE0MC41NjZjLTE3LjczOSwwLTMwLjI3OC01LjMzMi00MS4zMzgtMTAuMDM0ICAgYy0xMS4xOTEtNC43NjEtMjAuODQ1LTguODYyLTM2Ljc5Ny04Ljg2MmMtOC4wODYsMC0xOC4zMTEsMy44MjMtMjkuMTM2LDcuODgxQzIyMS40OTYsNTA1LjczLDIwNC43NTIsNTEyLDE4NS43NTMsNTEySDE4NS4yNTV6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMzUxLjM0MywwYzEuODg4LDY4LjA3Ni00Ni43OTcsMTE1LjMwNC05NS40MjUsMTEyLjM0MkMyNDcuOTA1LDU4LjAxNSwzMDQuNTQsMCwzNTEuMzQzLDB6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KCgoKCgoKCgoKCgoKCgoKPC9zdmc+Cg=="/>
            </s>

        </div>
    )

}
