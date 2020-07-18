import React from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(() => ({
    root: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
    },
    title: {
        color: "#0072CE",
        fontSize: "36px",
        lineHeight: "54px",
    },
    smallTitle: {
        color: "#0072CE",
        fontSize: "24px",
        lineHeight: "32px"
    },
    subtitle: {
        fontSize: "14px",
        lineHeight: "21px"
    },
    topBuffer: {
        marginTop: 66
    }

}))

const FormTitle = (props) => {
    const classes = useStyles()

    const info = (
        <div>
            <div className={classNames(classes.root, classes.title)}>
                {props.title}
            </div>
            <div className={classNames(classes.root, classes.subtitle)}>
                {props.desc}
            </div>
            <div className={classNames(classes.root, classes.subtitle, classes.topBuffer)}>
                Questions? Contact us at <br />
                <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
            </div>
            <div className={classNames(classes.root, classes.smallTitle, classes.topBuffer)}>
                View a Live Preview of Your Event at the Bottom of Page Before You Submit!
            </div>
        </div>
    )

    let wrapper = info

    if (props.desktop) {
        wrapper = (
            <Grid item xs={4}>
                {info}
            </Grid>
        )
    }

    return wrapper
}

export default FormTitle