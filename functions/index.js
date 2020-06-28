const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
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

exports.bookEvent = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'GET') {
      return;
    }

    const eventId = req.query.eventId;
    const name = req.query.name;
    const email = req.query.email;
    const db = admin.firestore();
    db.collection('technical').doc(eventId).get()
    .then((doc) => {
      if (!doc.exists){
        return res.status(412).send("Event does not exist!");
      }
      if (!doc.data().available){
        return res.status(412).send("Event already booked!");
      }
      const event = doc.data();
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

      return db.collection('technical').doc(eventId).update({ available: false, attendee_email: email, attendee_name: name })
        .then(()=>{
          return mailTransport.sendMail(attendeeMailOptions)
          .then(() => {
            return mailTransport.sendMail(hostMailOptions)
            .then(() => {
              return res.status(200).send("success");
            })
            .catch((err) => {
              return res.status(500).send(err, "1");
            });
          })
          .catch((err) => {
            return res.status(500).send(err, "2");
          });
        })
        .catch((err) => {
          return res.status(500).send(err, "3");
        });
    })
    .catch((err) => {
      return res.status(500).send(err, "4");
    });
  });
});