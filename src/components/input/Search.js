import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {CustomButton} from "../";
import ClearIcon from '@material-ui/icons/Clear';

export default class Search extends React.Component{
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
    return(
      <div style={{display:'inline'}}>
      <TextField
        style={{ width: "100%"}}
        id="input-with-icon-textfield"
        placeholder="Search tutors, subjects and descriptions..."
        value={this.state.searchVal}
        onChange={(val) => {this.setState({searchVal:val.target.value})}}
        variant="outlined"
        onKeyDown={this.keyPress}
        InputProps={{
          endAdornment: (
            <div>
              <InputAdornment position="end">
                <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}><SearchIcon style={{color:'black'}}/></IconButton>
              </InputAdornment>
            </div>
          )
        }}
      />
      </div>

    )
  }
}