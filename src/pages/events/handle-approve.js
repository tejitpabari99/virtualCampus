//Make Zoom API call
import React from "react";
import Axios from "axios";
import queryString from 'query-string';
import firebase from "../../firebase";

class HandleApprove extends React.Component {

    constructor(props) {

        super(props);
        this.state={
            state: -1,
            response: "Begin",
            code: null,
            myEventsId: null,
            myEventsList: null,
            headings: null,
            params: queryString.parse(this.props.location.search),
            eventInfo: 0
        };


        this.run = this.run.bind(this);
    }


    async getEventById(id) {
        var db = firebase.firestore();
        var approvedEvents = await db.collection("events")
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    this.setState({ eventInfo: 0 });
                    return 0;
                }

                snapshot.forEach(doc => {
                    if (doc.id === id) {
                        this.setState({ eventInfo: doc.data() });
                        return doc.data();
                    }
                });
            })
            .catch(err => {
                this.setState({ eventInfo: 0 });
                return 0;
            });
    }
    async updateZoomLink(id, zoomLink, hostLink, pass) {
        var db = firebase.firestore();
        var approvedEvents = await db.collection("events")
            .doc(id).update({zoomLink: zoomLink})
            .then(() => {
                this.setState({response: "Zoom link created and zoom link put into database successfully! "
                        + "\nJoin url: " + zoomLink
                        + "\n Host Link: " + hostLink
                        + "\n PW: " + pass
                        + "\n\nSUCCESS: put into Database!"})
            }).catch((err) => {
                this.setState({response: "Zoom link created but could not put into event in database."
                        + "\nJoin url: " + zoomLink
                        + "\n Host Link: " + hostLink
                        + "\n PW: " + pass
                        + "\n\nFAILURE: putting into Database!"})
            });
    }

    verify() {
        return false
    }

    // NOTE: white-list real url and redirect to real url!!! Then update redirect link url
    run(redir_uri) {
        if (this.state.params === undefined || this.state.params.code === undefined) {
            return;
        } else {
            const urlTokenAuth = 'https://zoom.us/oauth/token'
            const urlCreateMeeting = 'https://api.zoom.us/v2/users/columbiavirtualcampus@gmail.com/meetings'
            const requestUrl = 'https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendZoomRequest'

            const body = {
                grant_type: "authorization_code",
                code: this.state.params.code,
                redirect_uri: redir_uri
            }
            const requestTokenInfo = {
                url: urlTokenAuth,
                method: 'POST',
                send: body,
                qs: body,
                headers: {
                    "Authorization": "Basic T0Fwd2tXQ1RzYVYzQzRhZk1wSGhROnJKV0thY3dRajQ0bHNoTFRUbmdvSDNIMFRrRnk0ZXRI"
                },
                json: true
            }
            this.setState({response: "Processing..."})

            // First get token
            Axios.post(requestUrl, requestTokenInfo)
                .then(res => {

                    // Check if we should create a meeting for event:
                    this.getEventById(this.state.params.state).then(r => {
                        const event = this.state.eventInfo;

                        if (event === 0) {
                            this.setState({response: "Event does not exist."})
                        } else
                        if (event.zoomLink === true) {
                            const date = new Date(event.start_date.split("GMT")[0]);
                            var options = {
                                method: 'POST',
                                url: urlCreateMeeting,
                                redirect_uri: redir_uri,
                                headers: {
                                    'content-type': 'application/json',
                                    authorization: 'Bearer ' + res.data.access_token
                                },
                                query: {
                                    createMeetingForExistingEvent: true,
                                    updateDatabase: true,
                                    eventId: this.state.params.state
                                },
                                body: {
                                    type: 2,
                                    start_time: date.getFullYear() + "-" + (date.getMonth() + 1)
                                        + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes()
                                        + ":" + date.getSeconds(),
                                    timezone: event.timezone.split("$")[0],
                                    topic: event.event,
                                    agenda: event.desc,
                                    password: Math.floor(1000000 + Math.random() * 8000000)
                                },
                                json: true
                            };
                            // Second create zoom meeting with API
                            Axios.post(requestUrl, options)
                                .then(res => {
                                    this.setState({response: "Success. Created zoom meeting:"
                                                        + "\nJoin url: " + res.data.join_url
                                                        + "\n Host Link: " + res.data.start_url
                                                        + "\n PW: " + options.body.password
                                                        + "\n\nAttempting to put into database..."});
                                    this.updateZoomLink(this.state.params.state, res.data.join_url, res.data.start_url,
                                                            options.body.password);
                                })
                                .catch(error => {
                                    this.setState({response: "Failure! Could not add meeting: " + error})
                                });
                        } else {
                            this.setState({response: "This meeting did not request a zoom link or they have already been given one."})
                        }

                    });
                })
                .catch(error => {
                    this.setState({response: "Failure! Could not authenticate: " + error})
                });
        }
        this.setState({state: 2})
    }



    async getEvents() {
        var db = firebase.firestore()
        let options = []
        var approvedEvents = await db.collection("events").get()
        let approvedEventsMap = [];
        let approvedEventsId = []
        if(approvedEvents){
            approvedEventsMap = approvedEvents.docs.map(doc => doc.data());
            approvedEventsId = approvedEvents.docs.map(doc => doc.id);
        }
        this.setState({ myEventsList: approvedEventsMap, state: 0, myEventsId: approvedEventsId });
        this.setState({state: 0});
    }

    async componentDidMount() {
        await this.getEvents();
        this.setHeading();
        if (this.state.params !== undefined && this.state.params.code !== undefined)
            this.run(window.location.href.split("?")[0]);
    }

    renderTableData() {
        if (this.state.headings !== null) {
            var even = false
            return this.state.myEventsList.map((event, index) => {

                var zoomLink = "#"
                var zoomLinkText = "Not Requested"
                var approveText = "Approved"
                var approveLink = "#"
                even = !even

                if (event["zoomLink"] === true) {

                    zoomLink = "https://zoom.us/oauth/authorize?response_type=code&client_id=OApwkWCTsaV3C4afMpHhQ&redirect_uri=http%3A%2F%2Fdesktop-hnqifrq%3A3000%2Fevents%2Fhandle-approve%2F&state="
                        + this.state.myEventsId[index];
                    zoomLinkText = "Generate Zoom Meeting"
                }

                if (event["approved"] == false) {
                    approveText = "Click to Approve"
                    //approveLink = "..."
                               // + this.state.myEventsId[index]
                }

                return (
                    <tr key={this.state.myEventsId[index]} style={even ? {backgroundColor: "#dddddd"} : {}}>
                        <td style={{border: "1px solid #dddddd", textAlign: "left", width:"50px", borderSpacing: "0px"}}>
                            <a  style={{color: "black"}}
                                href={approveLink}>
                                {approveText}
                            </a>
                        </td>
                        <td style={{border: "1px solid #dddddd", textAlign: "left", width:"50px"}}>
                            <a style={{color: "black"}} href={zoomLink}>
                                {zoomLinkText}
                            </a>
                        </td>
                        {
                            this.state.headings.map((num, j) => {
                                if (num === "tags") {
                                    return (<td key={j}
                                                style={{border: "1px solid #dddddd", textAlign: "left", width:"50px",
                                                        borderSpacing: "0px", color: "black"}}>
                                        {JSON.stringify(event[num])}</td>)
                                } else if (num !== "approved" && num !== "zoomLink") {
                                        return (<td key={j}
                                                    style={{border: "1px solid #dddddd", textAlign: "left", width:"50px",
                                                            borderSpacing: "0px", color: "black"}}>
                                            {event[num]}</td>)
                                }
                            })
                        }
                    </tr>
                )
            })
        } else {
            return (
                <tr />
            )
        }
    }


    getHeading() {
        if (this.state.headings !== null) {
            var temp = this.state.headings
            return (
                <tr key="Heading" >
                    {/*<td style={{border: "1px solid black", width: "50px"}}>ID</td>*/}
                    <td style={{border: "1px solid #dddddd", textAlign: "left", width:"50px",
                                borderSpacing: "0px", color: "black"}}>
                        <b>Approve Link</b></td>
                    <td style={{border: "1px solid #dddddd", textAlign: "left", width:"50px",
                                borderSpacing: "0px", color: "black"}}>
                        <b>Generate Zoom Link</b></td>
                    {
                        temp.map((num, j) => {
                            if (num !== "zoomLink" && num !== "approved")
                                return (<td key={j}
                                            style={{border: "1px solid #dddddd", textAlign: "left", width:"50px",
                                                    borderSpacing: "0px", color: "black"}}>
                                    <b>{num}</b></td>)
                        })
                    }
                </tr>
            )
        } else {
            return (
                <tr />
            )
        }
    }
    setHeading() {
        if (this.state.headings === null) {
            var max = 0
            var headings = null
            this.state.myEventsList.map((event, index) => {
                var arr = [];
                var size = 0
                Object.keys(event).forEach(function (key) {
                    arr.push(key);
                    size = size + 1
                });
                arr.push("zoomLink")
                if (size > max) {
                    headings = arr
                }
            })

            this.setState({headings: headings});
        }
    }
    submitHandler() {
        console.log(btoa("test"))
        console.log(atob(btoa("test")))


        fetch('/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => console.log(res.json())) //returns array of data
            .then(res => this.setState({ res })); //assign state to array res
    }
    render() {

        /*if (this.verify() === false) {
            return (<div>
                        <form action="#" onSubmit={this.submitHandler} method="post">
                            <input type="text" id="typed" name="typed" /><br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>)
        } else*/
        if (this.state.state === -1) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if (this.state.state === 0) {
            return (
                <div style={{background: "white", fontSize:"1rem", paddingLeft:"1%"}}>
                    <table id='events'>
                        <tbody>
                            {this.getHeading()}
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            )
        } else
        if (this.state.state === 1) {
            return (
                <div>
                    Contacting server...
                </div>
            );
        } else if (this.state.state === 2) {
            return (
                <div>
                    {this.state.response}
                </div>
            );
        }
    }
}

export default HandleApprove;