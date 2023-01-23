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

export default class EventSearchMobile extends React.Component{
  constructor(props) {
    super(props);
      this.state={
          searchVal:'',
          data:this.props.data,
          filter: false,
          tagList: this.props.tagList,
          organizationList: this.props.organizationList,
          activeTagList: [],
          hiddenSearch: '',
          defaultOrganization: 'All clubs / organizations',
          defaultDate: 'All dates'
      }
      this.keyPress = this.keyPress.bind(this);
      this.reset = this.reset.bind(this);
      this.updateClubs = this.updateClubs.bind(this);
      this.updateDate = this.updateDate.bind(this);
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


    addActiveTag(n)
    {
        if(this.state.activeTagList.includes(n)) {
            this.setState({activeTagList: this.state.activeTagList.filter(arrayItem => arrayItem !== n)})
        } else {
            this.setState({activeTagList: this.state.activeTagList.concat(n)})
        }
        this.setState({hiddenSearch : this.state.activeTagList.join(" ")})
        this.props.updateTags(n)
    }

    updateClubs(data) {
        const dataText = data.currentTarget.innerText
        this.setState({defaultOrganization: dataText})
        this.props.updateClub(dataText)
    }
    updateDate(data) {
        const dataText = data.currentTarget.innerText
        this.setState({defaultDate: dataText})
        this.props.updateDate(dataText)
    }


    reset() {
        this.setState({activeTagList: [], searchVal: '', hiddenSearch: '',
            defaultOrganization: 'All clubs / organizations', defaultDate: "All dates"})
        this.props.resetFilter()
    }

  render(){
   let iconCol = this.props.iconColor === undefined ? 'black' : this.props.iconColor
    if (this.state.filter) {
      return(
        // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>
        <div style={{backgroundColor: "#F2F9FD", paddingTop: "20px", paddingBottom: "20px"}}>
        <div style={{display:'inline', padding: '18px'}}>
          <TextField
            style={{
              width: "90%",
              border: "solid 1.5px #0072CE",
              borderRadius: "12px",
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
                <div style={{marginLeft: "-15px"}}>
                  <InputAdornment position="start">
                    <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}>
                        <SearchIcon style={{color:iconCol}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
                endAdornment: (
                <button type="button" style={{
                    height: "60px",
                    width: "65px",
                    background: "#0072CE",
                    border: "solid 1px #0072CE",
                    borderRadius: "10px",
                    borderShadow: "0px",
                    color: "#f2f9fd",
                    boxShadow: "0px",
                    padding: 0,
                    fontAlign: "center"
                }}
                onClick={() => {this.setState({filter : false})}}>
                    <IconButton onClick={() => {this.setState({filter : false})}} >
                        <FilterIcon style={{color: "#f2f9fd"}} />
                    </IconButton>
                </button>
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
          <br/>
          <span style={{marginLeft: "20px", marginTop: "27px"}}>Tags</span>

            {this.props.tagList.map(n => {
                    return(
                        <CustomButton
                            onClick={() => {this.addActiveTag(n)}}
                            text={n}
                            style={{height: "30px", fontSize: "12px", borderRadius: "5px", marginLeft: "10px", borderColor:"#0072CE"}}
                            color={this.state.activeTagList.includes(n) ? "blueInvert" : "blue"} size={"small"}/>)
                }
            )}
            <br />
            <Autocomplete
                options={this.props.organizationList}
                getOptionLabel={(option) => option.name}
                style={{ width: "90%", marginTop: "20px", marginLeft: "10px", display: "inline-block",
                backgroundColor: "white", border: "solid 1px #0072CE", borderRadius: "10px"}}
                onChange={this.updateClubs}
                renderInput={(params) => <TextField {...params} label={this.state.defaultOrganization} variant="outlined" />}
            />

            <Autocomplete
                options={this.props.dateList}
                getOptionLabel={(option) => option.date}
                style={{ width: "90%", marginTop: "20px", marginLeft: "10px", display: "inline-block",
                backgroundColor: "white", border: "solid 1px #0072CE", borderRadius: "10px"}}
                onChange={this.updateDate}
                renderInput={(param) => <TextField {...param} label={this.state.defaultDate} variant="outlined" />}
            />

            <div onClick={this.reset}
                 style={{marginLeft: "10px", marginTop: "20px", cursor: "pointer", color: "#0072CE", fontSize: "18px",
                     display: "inline-block", verticalAlign: "middle"}}>
                Reset
            </div>
        </div>
        </div>
      )
    } else {
      return(
        // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>

        <div style={{display:'inline', padding: '18px'}}>
          <TextField
            style={{
              width: "90%",
              border: "solid 1.5px #0072CE",
              borderRadius: "12px",
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
                <div style={{marginLeft: "-15px"}}>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.props.onClick(this.state.searchVal)}}>
                        <SearchIcon style={{color:iconCol}}/>
                    </IconButton>
                  </InputAdornment>
                </div>
              ),
            endAdornment: (
                <button type="button" style={{
                    height: "60px",
                    width: "60px",
                    backgroundColor: "#F2F9FD",
                    border: "solid 1px #F2F9FD",
                    borderRadius: "10px",
                    borderShadow: "0px",
                    color: "#f2f9fd",
                    boxShadow: "0px",
                    padding: 0,
                    marginBottom: "1px",
                    fontAlign: "center"
                  }}
                onClick={() => {this.setState({filter : true})}}>
                  <InputAdornment position="end">
                    <IconButton onClick={() => {this.setState({filter : false})}}>
                      <FilterIcon style={{color: "#0072CE"}}/>
                    </IconButton>
                  </InputAdornment>
                </button>
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
      </div>

      )
    }
  }
}
