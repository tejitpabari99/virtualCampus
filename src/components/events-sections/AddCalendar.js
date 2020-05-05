import React from "react";
import AddToCalendar from "react-add-to-calendar";
import Button from "../material-kit-components/CustomButtons/Button";

export default class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render()
    {
        const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // non-mobile calendar items: actual websites
        const calItems =        [
                                    { outlookcom: 'Outlook' },
                                    { yahoo: 'Yahoo' },
                                    { google: 'Google' },
                                ];

        // mobile calendar items: apps (ex outlook)
        const calItemsMobile =  [
                                    { apple: 'Apple Calendar' },
                                    { google: 'Google' },
                                    { outlook: 'Outlook' },
                                    { yahoo: 'Yahoo' },
                                ];
        return (
            <div>
                <Button color="vcColor" size="sm" round>
                    <AddToCalendar
                        event={this.props.info}
                        //button={this.icon}
                        listItems={isiOS ? calItemsMobile : calItems}
                    />
                </Button>
            </div>)
    }
}

