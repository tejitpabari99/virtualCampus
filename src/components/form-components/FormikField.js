import React from "react";

import { Field, ErrorMessage } from "formik"

import CustomTextField from './CustomTextField'


const FormikField = (props) => {

    const errorMsg = <ErrorMessage name={props.name} />
    const multiline = props.multiline

    // error state handling
    let error = props.error
    let touched = props.touch
    let valid = false

    let toggle = false
    if (touched == true) {
        if (error != null) {
            toggle = true
        }
        else {
            valid = true
        }
    }

    let multiTog = false
    if (multiline != null) {
        multiTog = true
    }


    return (
        <div style={{ margin: '2px 0 8px 0' }}>
            <Field
                fullWidth
                as={CustomTextField}
                // label={props.label}
                name={props.name}
                helperText={errorMsg}
                required={props.required}
                error={toggle}
                multiline={multiTog}
                rows={props.rows}
                placeholder={props.label}
                isValid={valid}
                popover={props.popover}
            />
        </div>
    )
}

export default FormikField