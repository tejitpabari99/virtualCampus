import React from "react"
import Template from "../components/template";
import Timeline from "@material-ui/icons/Timeline";
import Info from "@material-ui/icons/Info";
import InfoArea from "../components/material-kit-components/InfoArea/InfoArea.js";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";

const IndexPage = () => (
  <Template>
      <link href="../assets/material-kit-assets/css/material-kit-react.css.map" rel="stylesheet" />
      <Card>
          <CardBody>
              <h3><strong>About Us</strong></h3>
              <div style={{minHeight:'10px'}}/>
              <div>
                  Virtual Campus is an inclusive, vibrant hub of Columbia student voices designed to address the need
                  for community during the COVID-19 pandemic.  <br/><br/>

                  Even though Columbia and Barnard students are now spread out all over the world, we are still a
                  community - here to support, engage, and enrich each other’s lives. In light of recent events, most
                  of the normal campus activities have been suspended, but we can still maintain our community through
                  virtual campus experiences. <br/><br/>

                  We welcome any and all creative contributions by the student body to be proudly displayed on our
                  landing page. Please feel free to shoot any of the founders a message, or submit your project here.
              </div>
              <div style={{minHeight:'30px'}}/>
          </CardBody>
      </Card>
      <Card>
          <CardBody>
              <h3><strong>Our Mission</strong></h3>
              <div style={{minHeight:'10px'}}/>
              <div>
                  Let’s come together to:
                  <ol>
                      <li>Help students cope with social isolation (eg. fun activities, communication portals, articles,
                  videos, etc) </li>
                      <li>Help students continue to learn, work and live to the best of their abilities.</li>
                      <li>Maintain and adapt campus activities that support the community.</li>
                  </ol>
              </div>
              <div style={{minHeight:'30px'}}/>
          </CardBody>
      </Card>
      <Card>
          <CardBody>
              <h3><strong>COVID-19 Design Challenge</strong></h3>
              <div style={{minHeight:'10px'}}/>
              <div>
                  Join us April 4-6 for a three-day design challenge to discover, design, and build solutions for the
                  challenges of remote living. Being remote poses big challenges to mental health, motivation, concentration,
                  and seeking help. Many of us worry about the present as well as the near and far-term future.<br/><br/>

                  Students from all majors are welcome to participate. No experience necessary. We have faculty and student
                  mentors to help you get your ideas off the ground. If you have an idea for an app, we can connect you to
                  students eager to build things.<br/><br/>

                  To learn more about the website, check out our group: <a href="https://bit.ly/virtual-campus-group">https://bit.ly/virtual-campus-group</a><br/>
                  To RSVP or get more information about the event: <a href="https://bit.ly/design-challenge-rsvp">https://bit.ly/design-challenge-rsvp</a><br/>
                  Also, please join the Slack to get updates and share your ideas: <a href="https://bit.ly/virtual-campus-slack">https://bit.ly/virtual-campus-slack</a>
              </div>
              <div style={{minHeight:'30px'}}/>
          </CardBody>
      </Card>
      <Card>
          <CardBody>
              <h3><strong>The Team Behind the Scenes</strong></h3>
              <div className="info">
                  <div className="icon icon-primary">
                      <img style={{width:'15%', borderRadius: '90%'}} src = 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/91165531_2517330971817818_7190617028439310336_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=OWaYq8pPx3MAX80uMOo&_nc_ht=scontent-lga3-1.xx&oh=d8ec6ed71842f3f067fbb6b899d3b4f3&oe=5EA6D1C1'/>
                  </div>
                  <h4 className="info-title">Free Chat</h4>
                  <p>Divide details about your product or agency work into parts. Write a few lines about each one. A
                      paragraph describing a feature will be enough.</p>
              </div>
              <InfoArea
              title="Marketing"
              description="We've created the marketing campaign of the website. It was a very interesting collaboration."
              icon={Timeline}
              iconColor="rose"
              />
          </CardBody>
      </Card>
      <div style={{minHeight:'60px'}}/>


  </Template>
);


export default IndexPage

