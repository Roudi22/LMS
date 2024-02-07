require("dotenv").config();
import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

interface EMailOptions {
    email: string;
    subject: string;
    template: string;
    data: {[key:string]: any};
}

const sendMail = async (options:EMailOptions) => {
    const transporter:Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const html = await ejs.renderFile(path.join(__dirname, `../mails/${options.template}.ejs`), options.data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html
    };
    await transporter.sendMail(mailOptions);
}

export default sendMail;