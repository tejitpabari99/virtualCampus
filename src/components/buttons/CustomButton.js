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
  orange:{
    color: '#FB750D !important',
    border: "1px solid #FB750D",
    "&:hover": {
      color: 'white !important',
      backgroundColor: '#F1945B',
      boxShadow: "0 14px 26px -12px #FB750D50"
    },
  },
  orangeInvert:{
    color: 'white !important',
    backgroundColor: '#FB750D',
    border: "1px solid #FB750D",
    "&:hover": {
      color: '#FB750D !important',
      backgroundColor: 'white',
      boxShadow: "0 14px 26px -12px #FB750D50"
    },
  },
  blue:{
    color: '#0072CE !important',
    border: "1px solid #0072CE",
    "&:hover": {
      color: 'white !important',
      backgroundColor: '#0072CE',
      boxShadow: "0 14px 26px -12px #0072CE50"
    },
  },
  black:{
    color: 'black !important',
    border: "1px solid black",
    backgroundColor: '#F6C09F',
    "&:hover": {
      color: '#F6C09F !important',
      backgroundColor: 'black',
      boxShadow: "0 14px 26px -12px #F6C09F50"
    },
  },
  white:{
    color: 'white !important',
    border: "1px solid white",
    backgroundColor: '#82B7E8',
    "&:hover": {
      color: '#82B7E8 !important',
      backgroundColor: 'white',
      boxShadow: "0 14px 26px -12px #82B7E850"
    },
  },
  white2: {
    color: 'white !important',
    border: "1px solid white",
    backgroundColor: "rgba(0,0,0,0.1)",
    "&:hover": {
      color: '#0072CE !important',
      backgroundColor: 'white',
      boxShadow: "0 14px 26px -12px gray"
    }
  },
  blueInvert:{
    color: 'white !important',
    backgroundColor: '#0072CE',
    border: "1px solid #FB750D",
    "&:hover": {
      color: '#0072CE !important',
      backgroundColor: 'white',
      boxShadow: "0 14px 26px -12px #0072CE50"
    },
  },
  blackWhite:{
    color: 'white !important',
    backgroundColor: 'black',
    border: "1px solid white",
    "&:hover": {
      color: 'black !important',
      backgroundColor: 'white',
      boxShadow: "0 14px 26px -12px black"
    },
  },
  whiteNoHover:{
    color: 'white !important',
    border: "1px solid white",
    backgroundColor: '#0072CE',
  },
  rounded: {
    borderRadius: "30px"
  },
}));

export default function CustomButton({href, text, color, size, rounded, onClick, className, newTab, ...rest}) {
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

CustomButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["white", "white2", "black", "orange", "blue",
    "blueInvert", "orangeInvert", "whiteNoHover"]),
  size: PropTypes.oneOf(["large","small", "medium"]),
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

CustomButton.defaultProps = {
  color: "orange",
  size: "small"
};