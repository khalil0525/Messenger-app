const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { upload } = require("../../app");
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

router.post("/register", async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password, and email required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: "30m" }
    );
    const tempLoginToken = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: "30m" }
    );

    const mailConfigurations = {
      // It should be a string of sender/server email
      from: process.env.NODEMAILER_EMAIL,

      to: user.email,

      // Subject of Email
      subject: "Email Verification",

      // This would be the text of email body
      text: `Hi! There, You have recently visited 
                   our website and entered your email.
                   Please follow the given link to verify your email
                   http://${
                     process.env.env === "development"
                       ? "localhost:5000"
                       : "ec2-54-224-72-128.compute-1.amazonaws.com"
                   }/verify?token=${token} 
                   Thanks`,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    });

    res.json({
      ...user.dataValues,
      token: tempLoginToken,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
      res.json({
        ...user.dataValues,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  res.sendStatus(204);
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

router.post("/verify/resend", (req, res) => {
  const { user } = req.body;
  console.log(user);
  const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET, {
    expiresIn: "10m",
  });

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.NODEMAILER_EMAIL,

    to: user.email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
                 our website and entered your email.
                 Please follow the given link to verify your email
                 http://localhost:3000/verify?token=${token} 
                 Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send verification email." });
    } else {
      console.log("Email Sent Successfully");
      console.log(info);
      res.status(200).json({ message: "Verification resent successfully." });
    }
  });
});

router.get("/verify", async (req, res) => {
  const { token } = req.query; // Use req.query to get the token from the query parameter
  if (!token) {
    return res.status(400).json({ error: "No token found" });
  }
  // Verifying the JWT token
  jwt.verify(token, process.env.SESSION_SECRET, async function (err, decoded) {
    if (err) {
      console.log(err);
      res.send(
        "Email verification failed, possibly the link is invalid or expired"
      );
    } else {
      try {
        // Extract the user's identifier from the decoded token
        const userId = decoded.id;
        console.log(userId);
        // Now you can use the userId to retrieve the user record from your database
        const user = await User.findByPk(userId); // Replace this with your actual database query

        if (user) {
          // Update the user's email verification status in the database
          user.active = true;
          await user.save();
          const updatedUser = await User.findByPk(userId);

          // Generate a new token
          const newToken = jwt.sign(
            { id: user.id },
            process.env.SESSION_SECRET,
            { expiresIn: 84600 } // Set the expiration time as needed
          );

          res.json({
            ...updatedUser.dataValues,
            token: newToken,
          });
        } else {
          res.send("User not found");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

router.post("/password/recover", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    console.log(user);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: "10m" }
    );

    const mailConfigurations = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Reset your password",
      text: `Hi there, here is the link for you to change your password.
             Please follow the given link to reset your password:
             http://localhost:3000/change-password?token=${token} 
             Thanks`,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send recovery email." });
      } else {
        console.log("Email Sent Successfully");
        console.log(info);
        res
          .status(200)
          .json({ message: "Password recovery email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/password/set/:token", async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    // Verify the token and extract the user's ID
    const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);
    const userId = decodedToken.id;

    // Find the user by their ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
});

// User profile changes

// Add a route to handle updating user's photo

module.exports = router;
