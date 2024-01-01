import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production" ? true : false, // `true` for port 465, `false` for all other ports
    auth: {
      user: "mohammadrobin636@gmail.com",
      pass: "okln bawc ssat kppj",
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: "mohammadrobin636@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Reset your password for PH-University within 10 minutes", // Subject line
    text: "Forgot your password? Don't worry.. Click to the below link and write your new password.", // plain text body
    html: html, // html body
  });
};
