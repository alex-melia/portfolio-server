const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
dotenv.config({ path: './config.env' });

app.post('/send-email', (req, res) => {
  const { f_name, l_name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: 'visitor@alexmelia.dev',
    to: 'alexmelia41@gmail.com',
    replyTo: email,
    subject: subject,
    text: `Name: ${f_name} ${l_name}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res
        .status(200)
        .json({ success: true, message: 'Email sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
