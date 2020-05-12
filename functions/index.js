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

exports.contactUs = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return;
    }

    const mailOptions = {
      from: req.body.from,
      replyTo: req.body.from,
      to: 'columbiavirtualcampus@gmail.com',
      subject: "CONTACT US: "+req.body.subject,
      text: req.body.text,
      html: `<p>${req.body.text}</p>`
    };

    mailTransport.sendMail(mailOptions)
      .then(()=>{
        return res.status(200).send("sucess");
      }).catch((err)=>{
      return res.status(500).send(err);
    });

  });

});
