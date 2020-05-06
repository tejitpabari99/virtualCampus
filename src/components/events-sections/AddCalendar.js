import React from "react";
import AddToCalendar from "react-add-to-calendar";
import "./AddCalendarStyles.scss";

export default class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render()
    {
        const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // non-mobile calendar items: actual websites
        const GoogleCalItems =          [
                                        { google: '' }
                                        ];

        // mobile calendar items: apps (ex outlook)
        const GoogleCalItemsMobile =    [
                                        { google: '' }
                                        ];
        return (
            <div>
                <AddToCalendar
                    id={"cal"}
                    event={this.props.info}
                    optionsOpen={true}
                    buttonLabel={""}
                    buttonClassOpen={"buttonClassOthers"}
                    buttonClassClosed={"buttonClassOthers"}
                    buttonWrapperClass={"buttonClassOthers"}
                    dropdownClass={"buttonClassDrop"}
                    rootClass={"myCal"}
                    listItems={isiOS ? GoogleCalItemsMobile : GoogleCalItems}/>

                <AddToCalendar
                    id={"cal"}
                    event={this.props.info}
                    optionsOpen={true}
                    buttonLabel={""}
                    buttonClassOpen={"buttonClassOthers"}
                    buttonClassClosed={"buttonClassOthers"}
                    buttonWrapperClass={"buttonClassOthers"}
                    dropdownClass={"buttonClassDrop"}
                    rootClass={"myCal2"}
                    listItems={isiOS ? GoogleCalItemsMobile : GoogleCalItems}/>
            </div>
            )
    }
}
