import { container, title, cardTitle } from "../../material-kit-react.js";
import imagesStyles from "../../material-kit-react/imagesStyles.js";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "black",
    padding: "5px",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "absolute",
    top:"100%",
    width: '100%',
    // zIndex: "3"
  },
  mainOther: {
    background: "#FFFFFF",
    position: "relative",
  },
  mainRaised: {
    margin: "10px 30px 0px 30px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  cardTitle: {...cardTitle},
  imagesStyles: {...imagesStyles},
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "20px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    marginTop: "20px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    }
  },
};

export default landingPageStyle;
