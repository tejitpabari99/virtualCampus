const functions = require('firebase-functions');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const jwt = require('jsonwebtoken')

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

exports.approveEvent = functions.https.onRequest((req, res) => {
  cors(req,
    res, () => {
      if (req.method !== 'GET') {
        return;
      }
      var db = admin.firestore();
      db.collection('events').doc(req.query.eventId).update({ approved: true })
        .then(() => {
          return res.status(200).send("success");
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
      decoded = jwt.verify(req.query.token, 'ASK KEVIN FOR THE KEY');
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
    const db = admin.firestore();
    let doc;
    try {
      doc = await db.collection('technical').doc(eventId.toString()).get();
      if (!doc.exists){
        return res.status(412).send("Event does not exist!");
      }
      const event = doc.data();
      if (!event.available){
        return res.status(412).send("Event already booked!");
      }
      const attendeeText = `Dear ${name},<br/><br/>
    You are now confirmed to attend a Mock Interview session with the Columbia Virtual Campus Team.<br/>
    Please find the details of your appointment below:<br/><br/>
    INTERVIEWER: ${event.host_name} (${event.host_email})<br/> 
    TIME: ${event.start_date}<br/><br/>
    Your interviewer should reach out to you to schedule a video call within the next 24 hours.<br/>
    If you haven't heard from interviewer within 24 hours after this email, please reach out to them at ${event.host_email}.<br/><br/>
    If you wish to cancel this appointment, please notify us NO LATER than 24 hours before the appointment by responding to this email and cc'ing your interviewer.
    Please see our <a href="https://docs.google.com/document/d/1lAzdx1YNshGhYQ41sTiNDjFdU3_m_vi9BYphfZYsZyU/edit?usp=sharing">
    interview resources</a> and <a href="https://docs.google.com/document/d/1x9kL4-7PeTTY_f5W93sx7WeuSu9_7qRt_ksqkYnkCLg/edit?usp=sharing">
    guidelines</a> before the interview.<br/><br/>
    Thanks,<br/>
    CVC`
      const hostText = `Dear ${event.host_name},<br/><br/>
    ${name} has signed up for a mock interview with you! Please find the details of your appointment below:<br/><br/>
    INTERVIEWEE: ${name} (${email})<br/> 
    TIME: ${event.start_date}<br/>
    LOCATION: Virtual video call<br/>
    ${comments && `COMMENTS: ${comments}<br/>`}<br/>
    IMPORTANT: reach out to ${name} at ${email} within the next 24 hours to schedule a video call.<br/><br/>
    Thanks,<br/>
    CVC`
      const attendeeMailOptions = {
        from: "columbiavirtualcampus@gmail.com",
        replyTo: "columbiavirtualcampus@gmail.com",
        to: email,
        subject: "Your interview has been confirmed!",
        text: attendeeText,
        html: `<p>${attendeeText}</p>`
      };
      const hostMailOptions = {
        from: "columbiavirtualcampus@gmail.com",
        replyTo: "columbiavirtualcampus@gmail.com",
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
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail',attendeeMailOptions);
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', hostMailOptions);
      return res.status(200).send('Success! You can close this window now.');
    } catch (err){
      return res.status(500).send(err);
    }
  });
});