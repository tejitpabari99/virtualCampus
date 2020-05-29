import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const manualSt = makeStyles(() => ({
  heading: {
    lineHeight: "min(2em, 2.1vw)",
    fontSize: 'min(1.1em, 1.3vw)',
    textAlign:'center'
  },
  orange:{
    color: '#FB750D !important',
  },
  blue: {
    color: '#0072CE !important'
  },
  black: {
    color:'#000000 !important'
  }
}));

export default function Subtitle({children, color, className, ...rest}) {
  const manual = manualSt();
  const headingClasses = classNames({
    [className]: className,
    [manual.heading]: true,
    [manual[color]]: color
  });
  return(
    <h1 className={headingClasses} {...rest}> {children} </h1>
  )
}

Subtitle.propTypes = {
  color: PropTypes.oneOf(["orange", "blue", "black"]),
  className: PropTypes.string
};

Subtitle.defaultProps = {
  color: "black",
};
