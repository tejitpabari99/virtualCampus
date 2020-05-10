import React from "react"
import {MetaData, TeamSection, Template} from "../components";

export default function IndexPage() {
    return (
        <Template active={'about-us'}>
            <MetaData title={'About Us'}/>
            <div style={{textAlign:'center', width:'60%', marginLeft:'auto', marginRight:'auto', marginTop:'5%'}}>
                <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}> ABOUT US
                </h3>
                <div>
                    <div style={{minHeight: '20px'}}/>
                    <h6 style={{textAlign:'center', color:"#999", fontSize: "18px", textTransform:"none"}}>
                        We created Columbia Virtual Campus at time when remote living posed challenges for many students across
                        the world who no longer had access to the resources and liveliness that one finds on campus.
                        Through this website, we hope to recreate a sense of community, purpose, and normalcy for students
                        that are now spread across the world.
                    </h6>
                </div>
            </div>

            <div style={{minHeight: '80px'}}/>

            <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}> OUR TEAM</h3>
            <TeamSection ></TeamSection>
            <div style={{minHeight: '60px'}}/>
        </Template>
    );
}
