import CustomRadioButton from "./CustomRadioButton";
import React from "react";



//try removing this stage entirely?
class CustomRadioButtonSet extends React.Component{
    constructor(props) {
        super(props);
        
        
        this.state={
          pressed: this.props.state
        };
        this.onClick = this.onClick.bind(this);
        
      }

      onClick(idx) {
        let copyObj = JSON.parse(JSON.stringify(this.state.pressed));
        copyObj["other"] = false;
        Object.keys(copyObj).forEach(ele => copyObj[ele] = false);          
           if (idx === "other")
              copyObj[idx] = true;
           else     
              copyObj[this.props.categories[idx]] = true; 
        this.setState({pressed: copyObj}); 
        this.props.onClick(copyObj, idx);
       
      }

     

      render(){
        
          return(
            <div>
            {
              this.props.categories.map((cat, idx) => {
                return (
                  <CustomRadioButton 
                                idx={idx}
                                style={{marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    fontSize: 'min(1.5vw, 9px)'
                                    
                                }}
                                onClick={this.onClick}
                                isPressed={this.state.pressed[this.props.categories[idx]]}
                                val={cat.replace('_','/')}
                  />
                  
                )
              }, this)
            } 
              <CustomRadioButton 
                                idx={"other"}
                                style={{marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    fontSize: 'min(1.5vw, 9px)'        
                                }}
                                onClick={this.onClick}
                                isPressed={this.state.pressed["other"]} 
                                val={"Other"}
                  />
              </div>
          )
      }
}

export default CustomRadioButtonSet;
