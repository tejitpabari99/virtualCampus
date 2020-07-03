const functions = require('firebase-functions');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

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
    const eventId = req.query.eventId;
    const name = req.query.name;
    const email = req.query.email;
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
      const attendeeText = `Dear ${name},
    Your mock interview with ${event.host_name} at ${event.start_date} has been confirmed!
    Your interviewer should reach out to you to schedule a video call within the next 24 hours,
    but if not, you can reach them at ${event.host_email}.
    Please look over our guidelines and interview resources before your start date.
    Thanks,
    CVC`
      const hostText = `Dear ${event.host_name},
    ${name} has signed up for a mock interview with you at ${event.start_date}!
    IMPORTANT: reach out to ${name} at ${email} within the next 24 hours to schedule a video call.
    Please look over our guidelines and interview resources before your start date.
    Thanks,
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
        subject: `${name} has signed up for an interview!`,
        text: hostText,
        html: `<p>${hostText}</p>`
      };
      await db.collection('technical').doc(eventId.toString()).update({ available: false, attendee_email: email, attendee_name: name });
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail',attendeeMailOptions);
      await axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', hostMailOptions);
      return res.status(200).send('Success! You can close this window now.');
    } catch (err){
      res.status(500).send(err);
    }
  });
});