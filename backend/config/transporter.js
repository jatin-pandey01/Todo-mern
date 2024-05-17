import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
});

export default transporter;