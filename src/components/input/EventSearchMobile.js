import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {CustomButton} from "../";
import ClearIcon from '@material-ui/icons/Clear';
import FilterIcon from '@material-ui/icons/TuneRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';

const clubs = [
  { name: "Latinx Professional and Educational Network" },
  { name: "CU Generation"},
  { name: "Ecoreps"},
]
const eventDates = [
  { date: "July 3" },
  { date: "July 30"},
  { date: "August 2"},
]


export default class EventSearchMobile extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      searchVal:'',
      data:this.props.data,
      filter: false,
    }
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.props.onClick(this.state.searchVal)
    }
  }

  // filterHandler = () => {
  //   const changeFilter = ! this.state.filter
  //   console.log("working")
  //   console.log(changeFilter)
  //   this.setState({filter : changeFilter})
  // }


  render(){
   let iconCol = this.props.iconColor === undefined ? 'black' : this.props.iconColor
    if (this.state.filter) {
      return(
        // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>
        <div style={{display:'inline', padding: '18px'}}>
          <TextField
            style={{
              width: "85%",
              borderColor: "#0072CE",
              backgroundColor: "white",
              marginBottom: "20px",
            }}
            id="input-with-icon-textfield"
            placeholder={this.props.placeholder === undefined ? "Search tutors, subjects and descriptions..."
                                                              : this.props.placeholder}
            value={this.state.searchVal}
            onChange={(val) => {this.setState({searchVal:val.target.value})}}
            variant="outlined"
            onKeyDown={this.keyPress}
            InputProps={{
              style: {
                paddingRight: "0px",
                borderColor: "#0072CE"
              },
              startAdornment: (
                <div>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}>
                        <SearchIcon style={{color:iconCol}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
              endAdornment: (
                <div>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.setState({filter : false})}}>
                        <FilterIcon style={{color: "#f2f9fd"}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
              classes: {
                notchedOutline: {
                  borderWidth: '1px',
                  borderColor: '#0072CE',
                  border: 'solid'
                },
              }
            }}
            InputLabelProps={{
              classes: {
                root: {
                  color : 'green'
                },
              }
            }}
          />

          <CustomButton  onClick={() => {this.props.onClick(this.state.searchVal)}}
                text={"Search"}
                style={{ fontSize: "20px", borderRadius: "5px", marginLeft: "34px", marginTop: "0px", width: "139px"}}
                color={"blue"} size={"large"}
          />

          <br/>
          <span style={{marginLeft: "20px", marginTop: "27px"}}>Tags</span>
          <CustomButton
                text={"Finance"}
                style={{width: "80px", height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px"}}
                color={"blue"} size={"small"}
          />
          <CustomButton
                text={"Columbia"}
                style={{width: "80px", height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px"}}
                color={"blue"} size={"small"}
          />
          <CustomButton
                text={"Basic Needs"}
                style={{width: "110px", height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px"}}
                color={"blue"} size={"small"}
          />
          <CustomButton
                text={"Social"}
                style={{width: "80px", height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px"}}
                color={"blue"} size={"small"}
          />
          <CustomButton
                text={"COVID-19"}
                style={{width: "85px", height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px"}}
                color={"blue"} size={"small"}
          />
          <br/>

        <Autocomplete
          options={clubs}
          getOptionLabel={(option) => option.name}
          style={{ width: 466, marginTop: "20px", marginLeft: "20px", display: "inline-block"}}
          renderInput={(params) => <TextField {...params} label="All clubs / organizations" variant="outlined" />}
        />

        <Autocomplete
          options={eventDates}
          getOptionLabel={(option) => option.date}
          style={{ width: 466, marginTop: "20px", marginLeft: "16px", display: "inline-block"}}
          renderInput={(param) => <TextField {...param} label="All dates" variant="outlined" />}
        />

        <div style={{marginLeft: "27px", marginTop: "20px", color: "#0072CE", fontSize: "18px", display: "inline-block", verticalAlign: "middle"}}>Reset</div>

        </div>

      )
    } else {
      return(
        // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>
        <div style={{display:'inline', padding: '18px'}}>
          <TextField
            style={{
              width: "85%",
              borderColor: "#0072CE",
              backgroundColor: "white",
              marginBottom: "20px",
            }}
            id="input-with-icon-textfield"
            placeholder={this.props.placeholder === undefined ? "Search tutors, subjects and descriptions..."
                                                              : this.props.placeholder}
            value={this.state.searchVal}
            onChange={(val) => {this.setState({searchVal:val.target.value})}}
            variant="outlined"
            onKeyDown={this.keyPress}
            InputProps={{
              style: {
                paddingRight: "0px",
                borderColor: "#0072CE"
              },
              startAdornment: (
                <div>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}>
                        <SearchIcon style={{color:iconCol}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
              endAdornment: (
                <div>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.setState({filter : false})}}>
                        <FilterIcon style={{color: "#f2f9fd"}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
              classes: {
                notchedOutline: {
                  borderWidth: '1px',
                  borderColor: '#0072CE',
                  border: 'solid'
                },
              }
            }}
            InputLabelProps={{
              classes: {
                root: {
                  color : 'green'
                },
              }
            }}
          />

          <CustomButton  onClick={() => {this.props.onClick(this.state.searchVal)}}
                text={"Search"}
                style={{ fontSize: "20px", borderRadius: "5px", marginLeft: "34px", marginTop: "0px", width: "139px"}}
                color={"blue"} size={"large"}
          />
      </div>
      )
    }
  }
}
