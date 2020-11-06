import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {CustomButton} from "../";
//import ClearIcon from '@material-ui/icons/Clear';


const styles = () => ({
  whiteOutline: {
    borderColor: 'white'
  }
});



  const WhiteTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
     
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      }
    },
  })(TextField);
  
class ResourcesSearch extends React.Component{
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
  
 

   let iconCol = this.props.iconColor === undefined ? 'white' : this.props.iconColor
   return(
      <div style={{display:'inline'}}>
        <WhiteTextField
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
                color: iconCol
              },
          }}

          placeholder={this.props.placeholder === undefined ? "Search tutors, subjects and descriptions..."
                                                            : this.props.placeholder}
          value={this.state.searchVal}
          onChange={(val) => {this.setState({searchVal:val.target.value})}}
          variant="outlined"
          onKeyDown={this.keyPress}
          InputProps={{
            
          
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
        {this.props.searchButtonColor && <CustomButton text={"SEARCH"}
                    color={this.props.searchButtonColor}
                    size={"medium"}
                    onClick={() => {this.props.onClick(this.state.searchVal)}}
                    style={{height: '47px', display: "inline-block", marginLeft: "12px", marginTop: "0px"}}
        />}
      </div>

    )
  }
}

export default withStyles(styles)(ResourcesSearch);