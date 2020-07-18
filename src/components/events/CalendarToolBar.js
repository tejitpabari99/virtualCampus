import moment from "moment";
import LeftArrowIcon from "@material-ui/icons/ChevronLeft";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import React from "react";

export default function CustomToolbar(toolbar) {
    const goToBack = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1);
        toolbar.onNavigate('prev');
    };

    const goToNext = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1);
        toolbar.onNavigate('next');
    };

    const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span style={{display: "inline-block", float: "left", fontFamily: "Poppins", fontWeight: "normal",
                fontStyle: "normal", lineHeight: "133%", color: "#0072CE", fontSize:"2.3em", paddingBottom:".2em",
                paddingLeft: "1em"}}>
            <span> {date.format('MMMM')} </span>
            <span> {date.format('YYYY')} </span>
          </span>
        );
    };

    return (
        <div>
            <label>
                {label()}
            </label>

            <div style={{display: "inline-block", float: "right", paddingTop: ".8em", paddingRight: "1em"}}>
                <div style={{display: "inline-block", cursor: "pointer"}} onClick={goToBack}>
                    <LeftArrowIcon style={{ fontSize: "1.5em", color:"#959595" }}/>
                </div>
                <div  style={{display: "inline-block", cursor: "pointer"}} onClick={goToNext}>
                    <RightArrowIcon style={{ fontSize: "1.5em", color:"#959595" }}/>
                </div>
            </div>
        </div >
    );
};