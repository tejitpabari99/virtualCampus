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
        style={{ width: "70%", marginRight: 10 }}
        id="input-with-icon-textfield"
        placeholder="Search Tutor Names, Descriptions, Subjects"
        value={this.state.searchVal}
        onChange={(val) => {this.setState({searchVal:val.target.value})}}
        variant="outlined"
        onKeyDown={this.keyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color:'#F1945B'}}/>
            </InputAdornment>
          ),
          endAdornment: (
            <div>
              {this.state.searchVal && <InputAdornment position="end">
                <IconButton onClick={() => {this.setState({searchVal: ''}); this.props.onCancel()}}><ClearIcon/></IconButton>
              </InputAdornment>}
            </div>
          )
        }}
      />
      <CustomButton color={'blue'} text={'Search'} size={'small'} onClick={() => {this.props.onClick(this.state.searchVal)}}/>
      </div>

    )
  }
}