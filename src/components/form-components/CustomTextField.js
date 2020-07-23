import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Field, ErrorMessage } from "formik"
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

// help popover
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import { Help } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '2px 4px',
        display: 'flex',
        position: 'relative',
        padding: 5,
        minHeight: 40,

        background: '#F2F2F2',
        borderRadius: '5px',
        border: '1px solid #F2F2F2'
    },
    error: {
        background: '#FFF7F7',
        border: '1px solid #FD6464'
    },
    errorMsg: {
        color: '#FD6464',
    },
    valid: {
        background: '#F2F9FD',
        border: '1px solid #F2F9FD'
    },
    dot: {
        fontSize: '16pt',
        color: '#FD6464',
        borderRadius: '50%',
        position: 'absolute',
        left: '15px',
        top: '8px'
    },
    input: {
        paddingLeft: '8px',
        // paddingTop: '2px',
        flex: 1,
    },
    required: {
        paddingLeft: '30px',
    },
    help: {
        position: "absolute",
        top: '10px',
        left: '200px'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}))

const CustomTextField = (props) => {
    const {
        name,
        onBlur,
        onChange,
        onFocus,
        value = "",
    } = props;

    const classes = useStyles();

    let dot = null
    let inputClasses = classes.input

    if (props.required) {
        dot = (
            <div className={classes.dot}>
                •
            </div>
        )
        inputClasses = [classes.input, classes.required].join(' ')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    let mark = null
    if (props.popover) {


        mark = (
            <div className={classes.help}>
                <HelpOutlineIcon
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    color="action"
                />
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography>{props.popover}</Typography>
                </Popover>
            </div>
        )
    }

    let errorDiv = null
    let wrapper = classes.root

    if (props.error) {
        wrapper = [classes.root, classes.error].join(' ')
        errorDiv = (
            <div className={classes.errorMsg}>
                REQUIRED
            </div>
        )
    }


    let valid = props.isValid
    // console.log("Value of valid: " + valid)
    if (valid) {
        wrapper = [classes.root, classes.valid].join(' ')
    }



    const InputElement = (
        <InputBase
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            className={inputClasses}
            placeholder={props.placeholder}
            multiline={props.multiline}
            rows={props.rows}
        // {...InputMore}
        // {...InputProps}
        />
    );

    return (
        <FormControl
            className={wrapper}
        >
            {dot}
            {InputElement}
            {/* {errorDiv} */}
            {mark}
        </FormControl>

    )
}

export default CustomTextField;
