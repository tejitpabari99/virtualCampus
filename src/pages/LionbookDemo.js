import React from "react"
import Search from "../components/input/Search";
import firebase from "../firebase";
import Fuse from 'fuse.js';
import {withStyles} from "@material-ui/core/styles";
//can be found under http://localhost:8000/LionbookDemo/


const useStyles = () => ({
  text: {
    marginTop: "20px",
    marginLeft: "6%",
    color:"white",
    textAlign: "left",
    width:"40%"
  },
  mainBox: {
    backgroundColor: "#3B5998",
    height: "600px",
    width: "104%",
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    marginLeft: "-4%"
  },
  subBox: {
    backgroundColor: "#FB750D",
    marginTop: "-5px",
    height: "550px",
    width: "57.8%",
    marginLeft: "13%",
    marginRight: "-0.32%",
    borderColor: "#FB750D",
    borderRadius: "0px 0px 0px 102px"
  },
  cardList: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "-130px",
    marginTop: "25px"
  },
  card: {
    flexDirection: "column",
    display: "flex",
    marginLeft: "40px",
    marginTop: "10px",
    justifyContent: "center"
  }
}); 


class SearchLionbook extends React.Component {
constructor(props){
    super(props);
    this.state = {
      people: [],
      done: "",
      output: [],
      flag: ""
    };
    this.getResources = this.getResources.bind(this);
    this.searchFunc = this.searchFunc.bind(this);
    this.formatData = this.formatData.bind(this);
    this.displayOutput = this.displayOutput.bind(this);
   
  }
  
  componentDidMount() {
    this.getResources(); //retrieves data from firestore 
  }  
  
     /**
      * Search function for looking up Resources with error messages
      * @param  {String} val: Query that's typed into the search bar
      */
     
  searchFunc(val) {
      let people = [];
      let allPeople = this.state.people;
      let error = "";
      let newOutput = [];
      if(!val || val.length === 0){
        people = allPeople;
      }
      else if (val.length <= 2) {
        error = "ERROR: Search term must be more than 2 characters";
        newOutput.push(error);
      }
      else {
        let fuse = new Fuse(allPeople,
            {threshold: 0.2,
                      distance: 1000,
                      keys: ['uni', 'contact', 'department', 'name', 'phone', 'title'],
                      ignoreLocation: true});
        let output = fuse.search(val);

        for (let i=0; i<output.length; i+=1){
            people.push(output[i]['item']);
        }
        if(output.length === 0){
          error = "No results found";
          newOutput.push(error);
        }
      }
      
      people.forEach((p) => {
        /*newOutput.push([]);
        Object.values(p).forEach((val) => {
          newOutput[newOutput.length - 1].push(val);
        }); */
        newOutput.push(Object.values(p)); //array of values added as element to output array
      });
      this.setState({output: newOutput, flag: "searched"});
      //console.log(newOutput);
    } 
   
 displayOutput(prop) {
    /*this.state.output.forEach((person) => {
    return (
    <div> 
      {person.forEach((val) => <span>{val}</span>)}
    </div>)
    }); */
    this.state.output.forEach((person) => {
      return (<div>{person}</div>);
    });
 }

 formatData(prop) {
    let person = {};
    person.uni = prop.data().UNI;
    person.contact = prop.data().contact;
    person.department = prop.data().department;
    person.name = prop.data().name;
    person.phone = prop.data().phone;
    person.title = prop.data().title;
    //person.id = prop.id;
    this.setState((state) => ({people: [...state.people, person]}));
 } 

async getResources() {
  try {
        const self = this;
        const db = firebase.firestore();
        var docRef = db.collection("lionbook").where("name", "==", "Abad, Abdul Bryant");
        docRef.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            self.formatData(doc);
        });
        self.setState({done: "downloaded"});
      });
    } catch (e) {
      console.log('Progress Error', e);
    } 
    
  }

  render() {
    //console.log("rerender");
    const { classes } = this.props;
      return(
        <div style={{height: "100vh"}}>
          <div style={{textAlign: "center", margin: "auto", padding: "20px 20px 0px 20px"}}>Lionbook Prototype</div>
          <div style={{width: "500px", paddingTop: "20px", paddingBottom: "20px", margin: "auto"}}>
            <Search 
                  data={this.state.data}
                  ref={input => this.inputElement = input}
                  onClick={(val) => { this.searchFunc(val) }}
                  onCancel={() => { this.searchFunc('') }}
                  placeholder={"Search Columbia"}
                  iconColor={"#0072CE"}
            />
          </div>
          <div style={{textAlign: "center", margin: "auto"}}>{this.state.done}</div>
          <div style={{textAlign: "center", margin: "auto"}}>{this.state.flag}</div>
          <div>
          {this.state.output.map((person) => {
            return(
              <div> 
                <div>{
                  person.map((trait) => {
                    return (
                      <div>{trait}</div>
                    )})
                }</div>
                <div> </div>
              </div>
            );
          })}
          </div>
        </div>
      );
  }
}

export default withStyles(useStyles)(SearchLionbook);


