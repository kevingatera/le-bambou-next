import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import nodemailer from "nodemailer";

const isDevelopment = process.env.NODE_ENV === "development";

const transporter = nodemailer.createTransport(
    isDevelopment
        ? {
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: "kevin@deployitwith.me",
                pass: process.env.EMAIL_PASSWORD_DEV,
            },
        }
        : {
            host: "smtp.purelymail.com",
            port: 465,
            secure: true,
            auth: {
                user: "info@lebambougorillalodge.com",
                pass: process.env.EMAIL_PASSWORD_PROD,
            },
        },
);

export const emailRouter = createTRPCRouter({
    sendContactEmail: publicProcedure
        .input(
            z.object({
                name: z.string().min(1),
                email: z.string().email(),
                message: z.string().min(1),
            }),
        )
        .mutation(async ({ input }) => {
            const { name, email, message } = input;

            const mailOptions = {
                from: isDevelopment
                    ? "kevin@deployitwith.me"
                    : "info@lebambougorillalodge.com",
                to: isDevelopment
                    ? "kevin@deployitwith.me"
                    : "info@lebambougorillalodge.com",
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
            };

            try {
                await transporter.sendMail(mailOptions);
                return { success: true };
            } catch (error) {
                console.error("Error sending email:", error);
                throw new Error("Failed to send email");
            }
        }),
});
