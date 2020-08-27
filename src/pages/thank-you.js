import React from "react";
import { CustomButton, CustomHeader, Template, Title } from "../components";

// Basically took off chunks of the contact-us page to write this
class ThankYouPage extends React.Component {
    

    render() {
        return (
            <Template active={"resources"} title={"Thank You"}>
                <Title color={'blue'}>Thank You!</Title>
                <div style={{ minHeight: "20px" }} />
                <div style={{ textAlign: "center" }}>
                    <section>We look forward to promoting your resource on CVC!</section>
                    <section>If there is anything that needs to be updated, please reach out to us.</section>
                    <div className="contact">
                        Questions? Contact us at: <a style={{ textAlign: "center", color: "#4284C8" }}
                        href={"mailto:columbiavirtualcampus@gmail.com"}>columbiavirtualcampus@gmail.com</a>
                    </div>
                    <div />
                        Our Facebook: <a style={{ textAlign: "center", color: "#4284C8" }}
                                     href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                
                
                    </div>
                
                <div style={{ minHeight: "20px" }} />

                <div style={{textAlign: "center"}}>
                    <CustomButton text={"Add Another Resource!"} href={"../resources/add-new-resource" }
                        color={"orange"} size={"large"} style={{marginTop: 25, marginBottom: 15}}/>
                </div>
                                             
            </Template>
        );
    }
}

export default ThankYouPage;
