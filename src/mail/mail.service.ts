import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  async sendMail(email: string, resetPasswordLink: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      // host: 'smtp.ethereal.com',
      // host: 'smtp.ethream.com',
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        ciphers: 'TLSv1.2',
      },
    });

    const info = await transporter.sendMail({
      from: `"Why the heel is password not reseting" <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: 'Reset Password', // Subject line
      text: `Click on this following link to reset your password: ${resetPasswordLink}`, // plain text body
    });
    // console.log('indonfo', info);
    return info;
  }
}
