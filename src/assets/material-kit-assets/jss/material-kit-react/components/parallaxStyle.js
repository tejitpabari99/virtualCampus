import { createMuiTheme } from "@material-ui/core/styles";

const parallaxStyle = {
  parallax: {
    height: "100%",
    // maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
    width: '100%',
    backgroundPosition: "0% 0%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    // backgroundSize: "cover",
    margin: "0",
    paddingTop:"200",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
    backgroundColor: 'white',
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
    height: "100%"
  }
};

export default parallaxStyle;
