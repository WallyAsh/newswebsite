const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adm.manageit@gmail.com",
    pass: "vbtq kits xpdw xkjv",
  },
});

exports.sendEmailOnNewMessage = functions.firestore
    .document("messages/{messageId}")
    .onCreate(async (snap, context) => {
      const messageData = snap.data();
      const mailOptions = {
        from: `MANAGE IT <adm.manageit@gmail.com>`,
        // eslint-disable-next-line max-len
        to: "wallyashraf27@gmail.com", // Replace with your personal email to receive the notifications
        subject: `New message from ${messageData.email}`,
        text: `${messageData.content}`,
      };

      try {
        await mailTransport.sendMail(mailOptions);
        console.log("Email sent to admin");
      } catch (error) {
        console.error("There was an error while sending the email:", error);
      }
    });
