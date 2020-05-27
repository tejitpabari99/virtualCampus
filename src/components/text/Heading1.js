import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const manualSt = makeStyles(() => ({
  heading: {
    lineHeight: '3vw',
    fontSize: 'min(2.2vw, 28px)',
    color:'#0072CE',
    margin: 0
  },
  orange:{
    color: '#FB750D !important',
  },
  blue: {
    color: '#0072CE !important'
  },
  black: {
    color:'#000000 !important'
  },
  left: {
    textAlign:'left'
  },
  center:{
    textAlign:'center'
  }
}));

export default function Heading({children, color, left, center, className, ...rest}) {
  const manual = manualSt();
  const headingClasses = classNames({
    [manual.heading]: true,
    [manual[color]]: color,
    [manual[left]]:left,
    [className]: className,
  });
  return(
    <h1 className={headingClasses} {...rest}> {children} </h1>
  )
}

Heading.propTypes = {
  color: PropTypes.oneOf(["orange", "blue", "black"]),
  className: PropTypes.string,
  center: PropTypes.bool,
  left: PropTypes.bool
};

Heading.defaultProps = {
  color: "blue",
};
