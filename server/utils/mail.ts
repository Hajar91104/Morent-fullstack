import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dadasovsuleyman126@gmail.com",
    pass: "wqww lbjn enng evnd",
  },
});
