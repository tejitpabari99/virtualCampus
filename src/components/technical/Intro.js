import React from "react";
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import interview from "../../assets/images/technical/interview.png";


export default function TeamSection(){
    return(
        <div>
            <GridContainer
            style={{marginTop:0, paddingTop: 0, paddingBottom: 0, marginBottom:0, textAlign:'center'}}>
                <GridItem xs={12} sm={12} md={4}>
                    <img src={interview} style={{width: "350px", height: "300px" }}></img>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                    <p style={{fontSize: "25px", fontWeight: "bold", textAlign: "left"}}>Are you preparing for tech internships and full time positons? 
                    Do you want to practice your technical interview skills?</p>
                    <p style={{fontSize : "20px", textAlign: "left"}}> Columbia Virtual Campus is offerring the opportunity to particiapte in one-on-one mock technical interviews with Columbia Univeristy students who have interned at Company1, Company2, Company3, and more.  
                    These one hour tutoring sessions will allow you to pratice real technical interview questions in a setting that resembles a real interview.</p>
                    <p style={{fontSize : "15px", textAlign: "left"}}><strong>Interested in giving mock interviews?</strong> Email us with your interview!</p>
                </GridItem>
            </GridContainer>
        </div>
        
    );
}
