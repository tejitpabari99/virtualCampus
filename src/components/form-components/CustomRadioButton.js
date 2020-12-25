import CustomButton from "../buttons/CustomButton";
import React, {useState, useEffect} from "react";



export default function CustomRadioButton(props) {
const [isPressed, setIsPressed] = useState(false);
const [color, setColor] = useState("whiteNoHover");
const formStyles = {//display: "inline", 
//marginLeft: "5px"
};

  useEffect(() => {
    if (props.isPressed === false || props.isPressed === undefined)
      {setIsPressed(false);
       setColor("blue");
      }
    else
    {
      setIsPressed(true);
      setColor("whiteNoHover");
    }
    //console.log(isPressed + color);
  }, [props.isPressed])
 

  const handleClick = () => {
    props.onClick(props.idx);
  }; 


  return (
      <div style={{display: "inline", marginLeft: "5px"}}>
    <CustomButton
      onClick={handleClick}
      color={
       color
      }
      style={{textTransform: "capitalize",  fontSize: 'min(1.5vw, 14px)', padding: "8px 4px 8px 4px"}}
      text={props.val}
    /> 
    </div>
  );
}