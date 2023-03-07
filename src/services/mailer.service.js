import nodemailer from 'nodemailer'; 
import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "stmp.gmail.com",
  secure: false, 
  port: 587,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter; 