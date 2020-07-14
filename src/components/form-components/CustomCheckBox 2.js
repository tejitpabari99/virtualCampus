import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const BlueCheckbox = withStyles({
    root: {
        color: '#F2F2F2',
        '&$checked': {
            color: '#0072CE',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(() => ({
    root: {
        flex: 1
    },
    error: {
        background: '#FFF7F7',
        border: '1px solid #FD6464'
    },
    errorMsg: {
        color: '#FD6464',
        float: 'left',
        paddingTop: '10px'
    },
    hidden: {
        position: 'absolute',
        visibility: 'hidden',
        opacity: 0
    },

}))

const CustomCheckBox = (props) => {
    const classes = useStyles();

    let errorMsg
    if (props.error != null) {
        // console.log(props.error)
        errorMsg = (
            <div className={classes.errorMsg}>
                REQUIRED
            </div>
        )
    }


    return (
        // < div className={classes.root}>
        //     <FormControlLabel
        //         control={
        //             <BlueCheckbox
        //                 icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        //                 checkedIcon={<CheckBoxIcon fontSize="small" />}
        //                 name={props.name}
        //                 color='primary'
        //             />
        //         }
        //         label={props.label}
        //         style={{ float: 'left' }}
        //     />
        //     {errorMsg}
        // </div>
        <div>
            <input type="checkbox" className={classes.hidden} name='cb'></input>
            <label for='cb'>{props.label}</label>
        </div>
    )
}

export default CustomCheckBox