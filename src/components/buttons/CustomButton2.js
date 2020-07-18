import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import React from "react";
import PropTypes from "prop-types";

const manualSt = makeStyles(() => ({
  buttonSpan:{
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  button:{
    padding: "1.5vh 1.8vw",
    margin: "0.5vh 0 0 0",
    willChange: "box-shadow, transform",
    transition:
        "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    background: "#FFFFFF",
    boxSizing: "border-box",
    borderRadius: "10px",
  },
  large:{
    fontSize: 'min(2.5vw, 20px)',
    padding: "1vh min(2.5vw,15px)",
  },
  medium:{
    fontSize: 'min(2.2vw, 13px)',
    padding: "1vh min(2.3vw,13px)",
  },
  small:{
    fontSize: 'min(2vw, 15px)',
    padding: "1vh min(2vw,10px)",
  },
  blue:{
    color: '#0072CE !important',
    border: "1px solid #0072CE",
  },
  white:{
    color: 'white !important',
    border: "1px solid white",
    backgroundColor: '#0072CE',
  },
  rounded: {
    borderRadius: "30px"
  },
}));

export default function CustomButton2({href, text, color, size, rounded, onClick, className, newTab, ...rest}) {
  const manual = manualSt();
  const btnClasses = classNames({
    [manual[color]]: color,
    [manual.button]: true,
    [className]: className,
    [manual.rounded]: rounded,
    [manual[size]]: size,
  });

  return (
      <Button {...rest} className={btnClasses} onClick={onClick}
              target={newTab?'_blank':''} rel="noopener noreferrer"
              href={href}>
        <span className={classNames(manual.buttonSpan)}>{text}</span>
      </Button>
  )
}

CustomButton2.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["white", "blue"]),
  size: PropTypes.oneOf(["large","small", "medium"]),
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

CustomButton2.defaultProps = {
  color: "orange",
  size: "small"
};