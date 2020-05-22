import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const manualSt = makeStyles(() => ({
  heading: {
    lineHeight: 'min(3.1rem, 5vw)',
    fontSize: 'min(4.5vw, 36px)',
    color:'#0072CE',
    textAlign:'center'
  },
  orange:{
    color: '#FB750D !important',
  },
  blue: {
    color: '#0072CE !important'
  }
}));

export default function Heading({children, color, className, ...rest}) {
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

Heading.propTypes = {
  color: PropTypes.oneOf(["orange", "blue", "black"]),
  className: PropTypes.string
};

Heading.defaultProps = {
  color: "blue",
};
