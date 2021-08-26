var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enginengineerings@gmail.com",
    pass: "BroImLiving41_",
  },
});

var mailOptions = {
  from: "enginkaratas99@gmail.com",
  to: "",
  subject: "",
  html: ``,
};

function sendMailToWorker(workerEmail, subject, html) {
  mailOptions.to = workerEmail;
  mailOptions.subject = subject;
  mailOptions.html = html;

  transporter.sendMail(mailOptions, function (error, info) {
    console.log("🚀 ~ file: sender.js ~ line 25 ~ mailOptions", mailOptions)
    if (error) {
      console.log("🚀 ~ file: sender.js ~ line 27 ~ error", error)
    } else {
      console.log("🚀 ~ file: sender.js ~ line 31 ~ info.response email gönderildi", info.response)
    }
  });
}

function sendMailToGeneralManager(generalManagerMail, subject, html ) {
  mailOptions.to = generalManagerMail;
  mailOptions.subject = subject;
  mailOptions.html = html;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true
    }
  });
}

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

module.exports = {transporter,
    sendMailToWorker,
    sendMailToGeneralManager
};
