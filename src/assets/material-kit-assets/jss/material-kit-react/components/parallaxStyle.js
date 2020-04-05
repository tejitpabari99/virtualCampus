import { createMuiTheme } from "@material-ui/core/styles";

const parallaxStyle = {
  parallax: {
    height: "90vh",
    maxHeight: "700px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "50% 30%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    // backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
    backgroundColor: 'white'
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  small: {
    height: "700px"
  }
};

export default parallaxStyle;
