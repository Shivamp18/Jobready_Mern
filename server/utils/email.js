const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send verification email
exports.sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// Send password reset email
exports.sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset',
    html: `
      <h1>Reset Your Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};
