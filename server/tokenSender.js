const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const token = jwt.sign(
  {
    data: "Token Data",
  },
  process.env.SESSION_SECRET,
  { expiresIn: "10m" }
);

const mailConfigurations = {
  // It should be a string of sender/server email
  from: process.env.NODEMAILER_EMAIL,

  to: "collinskhalil@hotmail.com",

  // Subject of Email
  subject: "Email Verification",

  // This would be the text of email body
  text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/verify/${token} 
           Thanks`,
};

transporter.sendMail(mailConfigurations, function (error, info) {
  if (error) throw Error(error);
  console.log("Email Sent Successfully");
  console.log(info);
});
