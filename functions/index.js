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