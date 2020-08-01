const functions = require('firebase-functions');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const jwt = require('jsonwebtoken');

require('dotenv').config();

const admin = require('firebase-admin');
admin.initializeApp();

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return;
        }

        const mailOptions = {
            from: req.body.from,
            replyTo: req.body.from,
            to: req.body.to === undefined ? 'columbiavirtualcampus@gmail.com' : req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: `<p>${req.body.text}</p>`
        };

        mailTransport.sendMail(mailOptions)
            .then(() => {
                return res.status(200).send("success");
            }).catch((err) => {
            return res.status(500).send(err);
        });

    });

});

exports.approveEvent2 = functions.https.onRequest((req, res) => {
    cors(req,
        res, () => {
            if (req.method !== 'GET') {
                return;
            }
            if (!req.query.tok || req.query.tok !== process.env.ADMIN_EVENTS_TOKEN) {
                return;
            }
            var db = admin.firestore();
            db.collection('events').doc(req.query.eventId).update({ approved: true })
                .then(() => {
                    return res.status(200).send("Event " + req.query.eventId + " approved.");
                }).catch((err) => {
                return res.status(500).send(err);
            });
        });
});

exports.bookEvent = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return;
    }
    let decoded;
    try {
      decoded = jwt.verify(req.query.token, process.env.JWT_KEY);
    } catch(err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(500).send("Token expired! Please try signing up again.");
      }
      return res.status(500).send("Invalid token! Please try signing up again.");
    }
    
    const eventId = decoded.data.eventId;
    const name = decoded.data.name;
    const email = decoded.data.email;
    const comments = decoded.data.comments;
    const localIntervieweeStartTime = decoded.data.localIntervieweeStartTime;
    const db = admin.firestore();
    try {
      const doc = await db.collection('technical').doc(eventId.toString()).get();
      if (!doc.exists){
        return res.status(412).send("Event does not exist!");
      }
      const event = doc.data();
      if (!event.available){
        return res.status(412).send("Event already booked!");
      }
      const checkAttendance = await db.collection('technical')
        .where("attendee_email", "==", email)
        .where("available", "==", false).get();
      if (checkAttendance.size > 2){
        return res.status(412).send("You can only sign up for a maximum of 3 sessions!");
      }

      const attendeeText = `Dear ${name},<br/><br/>
        You are now confirmed to attend a Mock Interview session with the Columbia Virtual Campus Team.<br/>
        Please find the details of your appointment below:<br/><br/>
        INTERVIEWER: ${event.host_name} (${event.host_email})<br/> 
        TIME: ${localIntervieweeStartTime}<br/><br/>
        Your interviewer should reach out to you to schedule a video call within the next 24 hours.<br/>
        If you haven't heard from interviewer within 24 hours after this email, please reach out to them at ${event.host_email}.<br/><br/>
        If you wish to cancel this appointment, please notify us NO LATER than 24 hours before the appointment by responding to this email and cc'ing your interviewer.<br/>
        Please see our <a href="https://docs.google.com/document/d/1lAzdx1YNshGhYQ41sTiNDjFdU3_m_vi9BYphfZYsZyU/edit?usp=sharing">
        interview resources</a> and <a href="https://docs.google.com/document/d/1x9kL4-7PeTTY_f5W93sx7WeuSu9_7qRt_ksqkYnkCLg/edit?usp=sharing">
        guidelines</a> before the interview.<br/><br/>
        Thanks,<br/>
        CVC`;
      const timeZone = event.timezone.split("$")[0];
      const hostText = `Dear ${event.host_name},<br/><br/>
        ${name} has signed up for a mock interview with you! Please find the details of your appointment below:<br/><br/>
        INTERVIEWEE: ${name} (${email})<br/> 
        TIME: ${new Date(event.start_date).toLocaleString('en', { timeZone, timeZoneName: "short" })}<br/>
        ${comments && `COMMENTS: ${comments}<br/>`}<br/>
        IMPORTANT: reach out to ${name} at ${email} within the next 24 hours to schedule a video call.<br/><br/>
        Thanks,<br/>
        CVC`;
      const attendeeMailOptions = {
        from: "columbiavirtualcampus@gmail.com",
        replyTo: event.host_email,
        to: email,
        subject: "Your interview has been confirmed!",
        text: attendeeText,
        html: `<p>${attendeeText}</p>`
      };
      const hostMailOptions = {
        from: "columbiavirtualcampus@gmail.com",
        replyTo: email,
        to: event.host_email,
        subject: `ACTION REQUIRED: ${name} has signed up for an interview!`,
        text: hostText,
        html: `<p>${hostText}</p>`
      };
      await db.collection('technical').doc(eventId.toString()).update({
        available: false,
        attendee_email: email,
        attendee_name: name,
        interview_comments: comments
      });
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', attendeeMailOptions);
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', hostMailOptions);
      return res.status(200).send('Success! You can close this window now.');
    } catch (err){
      return res.status(500).send(err);
    }
  });
});

exports.scheduleEvents = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return;
    }
    const startDate = new Date(Date.UTC(2020, 7, 3));
    const endDate = new Date(Date.UTC(2020, 7, 24));
  
    const processTime = (start_time, end_time) => {
      const start = new Date(start_time);
      const end = new Date(end_time);
      const range = Math.round((end - start) / (1000 * 60 * 60));

      let slots = [];
      let stime_1 = new Date(start_time);
      slots.push(stime_1.toString());
      
      let time_1;
      let temp;
      for(let i = 0; i < range; i++){
        time_1 = stime_1;
        temp = new Date(time_1);
        temp.setHours(temp.getHours()+1);
        slots.push(temp.toString());
        stime_1 = temp;
      }
      return slots;
    }
  
    // day is an int representing day of week, 0 = sunday
    const getDatesFromDay = day => {
      let temp = new Date(startDate);
      while(temp.getDay() !== day){
        temp.setDate(temp.getDate() + 1);
      }
      let dates = [[temp.getDate(), temp.getMonth(), temp.getFullYear()]];
      while(temp < endDate){
        const temp_res = new Date(temp.setDate(temp.getDate() + 7));
        if (temp > endDate){
          break;
        }
        dates.push([temp_res.getDate(), temp_res.getMonth(), temp_res.getFullYear()]);
      }
      return dates;
    }

    const getDatesTimesOfDay = (day, values) => {
      let events = [];
      const dates = getDatesFromDay(day);
      const start_time = new Date(values.start_time);
      const end_time = new Date(values.end_time);

      dates.forEach( date => {
        let temp_date = date[0], temp_month = date[1], temp_year = date[2];
        // set start_time and end_time with correct date, month, year
        start_time.setDate(temp_date);
        start_time.setMonth(temp_month);
        start_time.setFullYear(temp_year);

        // CAREFUL: USER CANNOT PASS IN END TIME BEFORE START TIME
        // THIS LOGIC DOESNT WORK
        if (start_time.getHours() > end_time.getHours()){
          end_time.setDate(temp_date+1);
        } else {
          end_time.setDate(temp_date);
        }

        end_time.setMonth(temp_month);
        end_time.setFullYear(temp_year);

        // split start_time and end_time range into hours sessions
        events.push(processTime(start_time, end_time));
      });
      return events
    }

    let decoded;
    try {
      decoded = jwt.verify(req.query.token, process.env.JWT_KEY);
    } catch(err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(500).send("Token expired! Please try signing up again.");
      }
      return res.status(500).send("Invalid token! Please try signing up again.");
    }
    
    const host_name = decoded.data.host_name;
    const host_email = decoded.data.host_email;
    const host_bio = decoded.data.host_bio;
    const host_interviewExp = decoded.data.host_interviewExp;
    const day_1 = decoded.data.day_1;
    const start_time_1 = new Date(decoded.data.start_time_1);
    const end_time_1 = new Date(decoded.data.end_time_1);
    const day_2 = decoded.data.day_2;
    const start_time_2 = day_2 !== "" ? new Date(decoded.data.start_time_2): decoded.data.start_time_2;
    const end_time_2 = day_2 !== "" ? new Date(decoded.data.end_time_2): decoded.data.end_time_2;
    const day_3 = decoded.data.day_3;
    const start_time_3 = day_3 !== "" ? new Date(decoded.data.start_time_3): decoded.data.start_time_3;
    const end_time_3 = day_3 !== "" ? new Date(decoded.data.end_time_3): decoded.data.end_time_3;
    const timezone = decoded.data.timezone;
    const time_comments = decoded.data.time_comments;
    const resume = decoded.data.resume;
    const week_availability = decoded.data.week_availability;
    const db = admin.firestore();
    
    try{
      const doc = await db.collection('technical')
        .where("host_email", "==", host_email).get();
      if(doc.size > 1){
        return res.status(412).send("You have already signed-up to be an interviewer.");
      }
    } catch(err){
        return res.status(500).send(err)
    }
    
    // combine all arrays of dates
    let all_dates = getDatesTimesOfDay(day_1, {start_time: start_time_1, end_time: end_time_1});
    if(day_2 !== ""){
      getDatesTimesOfDay(day_2, {start_time: start_time_2, end_time: end_time_2}).forEach(
        arr => all_dates.push(arr));
    }
    if(day_3 !== ""){
      getDatesTimesOfDay(day_3, {start_time: start_time_3, end_time: end_time_3}).forEach(
        arr => all_dates.push(arr));
    }
    try {
      let scheduled = 0;
      all_dates.forEach((slots) => {
        for (let i = 0; i < slots.length - 1; i++){
          db.collection("technical").add({
            host_name,
            host_email,
            attendee_email: "",
            attendee_name: "",
            available: true,
            host_bio,
            host_interviewExp,
            interview_comments: "",
            timezone,
            time_comments,
            resume,
            approved: false,
            week_availability,
            start_date: slots[i],
            end_date: slots[i+1]
          });

          if(scheduled++ === 60){
            break;
          }
        }
      });
      return res.status(200).send('Success! You can close this window now.');
    } catch (err){
      return res.status(500).send(err); 
    }
  });
});

exports.sendZoomRequest = functions.https.onRequest(async (req, res) => {

    cors(req, res, async () => {
        console.log(req.body);
        const request = require('request-promise');

        request.post(req.body,
            function (err, httpResponse, body) {
                console.log(err);
                if (body.error) {
                    return res.status(403).send("failed posting to call zoom api: " + body.error);
                }

                return res.status(200).send(body);
            }
        );
    })
});