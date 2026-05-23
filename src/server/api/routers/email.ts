import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
    lodgeInboxAddress,
    sendLodgeEmail,
} from "~/server/utils/emailDelivery";

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

            try {
                await sendLodgeEmail({
                    to: lodgeInboxAddress,
                    replyTo: lodgeInboxAddress,
                    subject: `New Contact Form Submission from ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                    html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
                });
                return { success: true };
            } catch (error) {
                console.error("Error sending email:", error);
                throw new Error("Failed to send email");
            }
        }),
});
