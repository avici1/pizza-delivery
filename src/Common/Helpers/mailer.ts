/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

dotenv.config();

type transportOptions = {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
}

type EmailToSend = [object, { to: string, subject: string }, { path: string }];

export default class Mailer {
  private transportOptions: transportOptions;

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transportOptions = {
      host: process.env.MAIL_HOST as string,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    };

    this.transporter = nodemailer.createTransport(this.transportOptions);
  }

  sendMail = (emailToSend: EmailToSend) => {
    try {
      console.log(emailToSend);
      const { path } = emailToSend[2];
      return ejs.renderFile(path, emailToSend[0], (error, data) => {
        if (error) {
          console.log(error);
        } else {
          const emailOptions = {
            from: '"Bnkle Support" <whatever@sandbox123.mailgun.org>',
            to: emailToSend[1].to,
            subject: emailToSend[1].subject,
            html: data,
          };
          this.transporter
            .sendMail(emailOptions)
            .then((success) => {
              console.log(success);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } catch (error) {
      throw error;
    }
  };
}
