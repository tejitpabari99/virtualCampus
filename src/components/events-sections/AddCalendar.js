import React from "react";
import AddToCalendar from "react-add-to-calendar";
import Button from "../material-kit-components/CustomButtons/Button";
import {withStyles} from "@material-ui/styles";

/*
.react-add-to-calendar {
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .004);
    position: relative;
    display: inline-block;
    margin: 0 auto;

    &__wrapper {
         zoom: 1;
         cursor: pointer;
     }

    &__button {
     }

    &__icon {
    &--right {
         padding-left: 5px;
     }

    &--left {
         padding-right: 5px;
     }
    }

    &__dropdown {
         position: absolute;
         top: 20px;
         width: 100%;
         text-align: left;
         box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
         background-color: #fff8f2;
         z-index: 200;

        ul {
                list-style: none;
                margin: 0;
                padding-top:5px;

            li {
                display: flex;
                position: relative;
                box-sizing: border-box;
                text-align: left;
                align-items: center;
                padding-bottom: 8px;
                justify-content: flex-start;
                text-decoration: none;

                a {
                    font-family: Poppins, Roboto, Helvetica, Arial, sans-serif;
                    color: rgb(66, 132, 200);
                    text-decoration: none;

                    i {
                        padding-right: 0px;
                    }
                }
            }
        }
    }
}
 */

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
                        buttonLabel={"Add to Calendar"}
                        listItems={isiOS ? calItemsMobile : calItems}
                    />
                </Button>
            </div>)
    }
}
