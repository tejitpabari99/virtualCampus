import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {CustomButton} from "../";
import ClearIcon from '@material-ui/icons/Clear';


const styles = () => ({
  whiteOutline: {
    borderColor: 'white',
  },
  blackOutline: {
    borderColor: 'black',
  },
  blueOutline: {
    borderColor: '#0072CE',
  },
});

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      searchVal:'',
      data:this.props.data
    }
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.props.onClick(this.state.searchVal)
    }
  }

  render(){
   // height of the TextField
   const height = 47;
   // magic number which must be set appropriately for height
   const labelOffset = -6;
   const { classes } = this.props;

   let iconCol = this.props.iconColor === undefined ? 'black' : this.props.iconColor
    return(
      <div style={{display:'inline'}}>
        <TextField
          style={{ width: "100%", height}}
          id="input-with-icon-textfield"

          /* styles the label component */
          InputLabelProps={{
            style: {
              height,
              ...({ top: `${labelOffset}px` }),
            },
          }}

          /* styles the input component */
          inputProps={{
              style: {
                height,
                padding: '0 14px',
                color: this.props.iconColor === undefined ? 'black' : this.props.iconColor
              },
          }}

          placeholder={this.props.placeholder === undefined ? "Search tutors, subjects and descriptions..."
                                                            : this.props.placeholder}
          value={this.state.searchVal}
          onChange={(val) => {this.setState({searchVal:val.target.value})}}
          variant="outlined"
          onKeyDown={this.keyPress}
          InputProps={{
            classes: { notchedOutline: this.props.iconColor === undefined ? classes.blackOutline :
                    this.props.iconColor === "white" ? classes.whiteOutline :
                    classes.blueOutline},
            startAdornment: (
              <div>
                <InputAdornment position="end">
                  <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}>
                      <SearchIcon style={{color:iconCol}}/>
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
      </div>

    )
  }
}

export default withStyles(styles)(Search);