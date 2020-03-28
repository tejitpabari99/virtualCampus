import React from "react"

import Template from "../components/template";
import WebCard from "../components/WebCard";

const CovidResource = () => (
  <Template>
    <WebCard
      imageURL={'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'}
      title={'Samaritan'}
      developer={'Anthony Krivonos | Alexan Mori + 2 More...'}
      description={'Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.'}
      btnText={'Read More'}
    />
  </Template>
);

export default CovidResource
