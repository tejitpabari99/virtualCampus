import React from "react"
import Template from "../components/all/Template";
import { ResourcesList, CustomButton, Title} from "../components";

export default function Resources() {
    return (
        <Template active={'resources'} title={'Resources'}>
          <Title color={'blue'}>Resources</Title>
            <div style={{textAlign:'center'}}>
              <CustomButton text={"ADD NEW RESOURCES"} href={"https://forms.gle/WWjyroMcnMsyp7Lv9"}
                            color={"orange"} size={"large"} style={{marginTop: 10, marginBottom: 25}}/>
            </div>
            <ResourcesList />
        </Template>
    );
}
