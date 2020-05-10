import { createMuiTheme } from "@material-ui/core/styles";
const breakpointValues = {
    xs: 0,
    sm: 700,
    md: 900,
    lg: 1200,
    xl: 1900,
};
const CustomTheme = createMuiTheme({ breakpoints: { values: breakpointValues } });

export default CustomTheme