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

function sendMailToWorker(subject, html, workerMail) {
  mailOptions.to = workerMail;
  mailOptions.subject = subject;
  mailOptions.html = html;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendMailToGeneralManager(generalManagerMail, subject, html, ) {
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
