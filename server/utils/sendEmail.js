const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com
    port: process.env.SMTP_PORT,       // e.g. 587
    secure: false,                     // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,    // your SMTP username
      pass: process.env.SMTP_PASS,    // your SMTP password or app password
    },
  });

  const mailOptions = {
    from: `"Zebaish" <${process.env.SMTP_USER}>`,  // sender address
    to: options.email,                              // recipient email
    subject: options.subject,                       // email subject
      text: options.text || "",          
    html: options.html || "",                            // plain text body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;