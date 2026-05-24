import nodemailer from "nodemailer";
import { Resend } from "resend";

const isDevelopment = process.env.NODE_ENV === "development";
const devSenderAddress = "kevin@deployitwith.me";
const prodSenderAddress =
  process.env.EMAIL_FROM ?? "Le Bambou Gorilla Lodge <noreply@lebambougorillalodge.com>";
const prodInboxAddress = process.env.EMAIL_TO ?? "info@lebambougorillalodge.com";

export const lodgeSenderAddress = isDevelopment ? devSenderAddress : prodSenderAddress;
export const lodgeInboxAddress = isDevelopment ? devSenderAddress : prodInboxAddress;

const smtpTransporter = isDevelopment
  ? nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: devSenderAddress,
        pass: process.env.EMAIL_PASSWORD_DEV,
      },
    })
  : null;

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SendLodgeEmailOptions {
  to: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
}

export async function sendLodgeEmail(options: SendLodgeEmailOptions) {
  if (smtpTransporter) {
    await smtpTransporter.sendMail({
      from: lodgeSenderAddress,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return;
  }

  if (!resend) {
    throw new Error("RESEND_API_KEY is required to send production email");
  }

  const { error } = await resend.emails.send({
    from: lodgeSenderAddress,
    to: Array.isArray(options.to) ? options.to : [options.to],
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
