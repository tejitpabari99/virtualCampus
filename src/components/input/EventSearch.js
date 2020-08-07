import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {CustomButton} from "../";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class EventSearch extends React.Component{
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
    //
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
            defaultOrganization: 'All clubs / organizations', defaultDate: "All dates", filter: false})
        this.props.resetFilter()
    }


    render(){
        let iconCol = this.props.iconColor === undefined ? 'black' : this.props.iconColor
        if (this.state.filter) {
            return(
                // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>
                //<div style={{backgroundColor: "#F2F9FD", paddingTop: "20px", paddingBottom: "20px"}}>
                //<div style={{display:'inline'}}>
                <GridContainer style={{ width: "100%", margin: '0', marginTop: "10px", marginBottom: "10px",
                    backgroundColor: "#F2F9FD", paddingTop: "20px", paddingBottom: "20px"}}>

                    <GridItem xs={8} sm={8} md={8}>
                    <TextField
                        style={{
                            width: "105%",
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
                                <button type="button" style={{
                                    height: "55px",
                                    width: "163px",
                                    background: "#0072CE",
                                    borderColor: "#f2f9fd",
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    color: "#f2f9fd",
                                    boxShadow: 0,
                                    paddingRight: 0
                                }}
                                        onClick={() => {this.setState({filter : false})}}>Filter</button>
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
                    </GridItem>

                    <GridItem xs={4} sm={4} md={4}>
                    <CustomButton  onClick={() => {this.props.onClick(this.state.searchVal, this.state.hiddenSearch)}}
                                   text={"Search"}
                                   style={{ fontSize: "20px", borderRadius: "5px", marginLeft: "34px", marginTop: "0px", width: "139px"}}
                                   color={"blue"} size={"large"}
                    />
                    </GridItem>
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

                    <br/>

                    <Autocomplete
                        options={this.props.organizationList}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 466, marginTop: "20px", marginLeft: "20px", display: "inline-block"}}
                        onChange={this.updateClubs}
                        renderInput={(params) => <TextField {...params} label={this.state.defaultOrganization} variant="outlined" />}
                    />

                    <Autocomplete
                        options={this.props.dateList}
                        getOptionLabel={(option) => option.date}
                        style={{ width: 466, marginTop: "20px", marginLeft: "16px", display: "inline-block"}}
                        onChange={this.updateDate}
                        renderInput={(param) => <TextField {...param} label={this.state.defaultDate} variant="outlined" />}
                    />

                    <div onClick={this.reset}
                         style={{marginLeft: "27px", marginTop: "20px", cursor: "pointer", color: "#0072CE", fontSize: "18px",
                             display: "inline-block", verticalAlign: "middle"}}>
                        Reset
                    </div>
                </GridContainer>
                //</div>
                //</div>

            )
        } else {
            return(
                // <div style={{display:'inline', backgroundColor: '#F2F9FD', padding: '18px', height: "100%", width: "100%"}}>
                //<div style={{display:'inline', padding: '18px'}}>
                <GridContainer style={{ width: "100%", margin: '0', marginTop: "10px", marginBottom: "10px", paddingRight: "10px"}}>
                    <GridItem xs={8} sm={8} md={8}>
                    <TextField
                        style={{
                            width: "115%",
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
                                <button type="button" style={{
                                    height: "55px",
                                    width: "163px",
                                    background: "#f2f9fd",
                                    borderColor: "#f2f9fd",
                                    fontFamily: "Poppins",
                                    fontSize: "20px",
                                    color: "#0072CE",
                                    boxShadow: 0,
                                    paddingRight: 0
                                }}
                                        onClick={() => {this.setState({filter : true})}}>Filter</button>
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
                    </GridItem>

                    <GridItem xs={4} sm={4} md={4}>
                    <CustomButton  onClick={() => {this.props.onClick(this.state.searchVal)}}
                                   text={"Search"}
                                   style={{ fontSize: "20px", borderRadius: "5px", marginLeft: "130px", marginTop: "1px", width: "139px"}}
                                   color={"blue"} size={"large"}
                    />
                    </GridItem>


                </GridContainer>
            )
        }
    }
}
