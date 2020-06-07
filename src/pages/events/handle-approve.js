//Make Zoom API call
import React from "react";
import Axios from "axios";
import queryString from 'query-string';
import firebase from "../../firebase";

class HandleApprove extends React.Component {

    constructor(props) {

        super(props);
        this.state={
            state: 1,
            response: "Begin",
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
                    console.log('No matching documents.');
                    this.setState({ eventInfo: 0 });
                    return 0;
                }

                snapshot.forEach(doc => {
                    if (doc.id === id) {
                        console.log("here 2");
                        console.log(doc.data())
                        this.setState({ eventInfo: doc.data() });
                        return doc.data();
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
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

    // TODO: Email user the start_url?
    // TODO: Make sure the zoom redirect uri is correct once pushed to live website
    run() {
        if (this.state.params === undefined || this.state.params.code === undefined) {
            this.setState({response: "404 Not Found"});
        //} else if (this.state.params.state === undefined) {
         //   this.setState({response: "Event not specified."});
        } else {
            const urlTokenAuth = 'https://zoom.us/oauth/token'
            const urlCreateMeeting = 'https://api.zoom.us/v2/users/columbiavirtualcampus@gmail.com/meetings'
            const redir_uri = window.location.href.split("?")[0];
            console.log(redir_uri);
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
                        console.log("event info: " + event)

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
                            console.log(JSON.stringify(options));
                            // Second create zoom meeting with API
                            Axios.post(requestUrl, options)
                                .then(res => {
                                    this.setState({response: "Success. Created zoom meeting:"
                                                        + "\nJoin url: " + res.data.join_url
                                                        + "\n Host Link: " + res.data.start_url
                                                        + "\n PW: " + options.body.password
                                                        + "\n\nAttempting to put into database..."});
                                    console.log(JSON.stringify(res.data))
                                    this.updateZoomLink(this.state.params.state, res.data.join_url, res.data.start_url,
                                                            options.body.password);
                                })
                                .catch(error => {
                                    console.log("error: " + error);
                                    this.setState({response: "Failure! Could not add meeting: " + error})
                                });
                        } else {
                            this.setState({response: "This meeting did not request a zoom link or they have already been given one."})
                        }

                    });
                })
                .catch(error => {
                    console.log("error: " + error);
                    this.setState({response: "Failure! Could not authenticate: " + error})
                });
        }

        this.setState({state: 2})

    }
    componentDidMount() {
        this.run();
    }
    render() {
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