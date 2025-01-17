import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendMail(email: string, resetPasswordLink: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      // host: 'smtp.ethereal.com',
      host: 'smtp.ethream.com',
      port: 465,
      secure: true,
      auth: {
        user: 'vishfkesender@gmail.com',
        pass: 'fkyi ects habo hqsz',
      },
      tls: {
        ciphers: 'TLSv1.2',
      },
    });

    const info = await transporter.sendMail({
      from: '"Why the heel is password not reseting" <vishfkesender@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Reset Password', // Subject line
      text: `Click on thi following link to reset your password: ${resetPasswordLink}`, // plain text body
      // html: '<b>Hello world?</b>', // html body
    });
    // console.log('indonfo', info);
    return info;
  }
}
