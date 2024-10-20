import nodemailer from "nodemailer";
import { type RoomSelection, additionalServices } from "~/types/booking";
import fs from 'fs';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === "development";

const transporter = nodemailer.createTransport(
    isDevelopment
        ? {
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: "kevin@deployitwith.me",
                pass: process.env.ZOHO_EMAIL_PASSWORD,
            },
        }
        : {
            host: "mail.lebambougorillalodge.com",
            port: 465,
            secure: true,
            auth: {
                user: "info@lebambougorillalodge.com",
                pass: process.env.SITEGROUND_EMAIL_PASSWORD,
            },
        }
);

export interface BookingEmailData {
    id: number;
    roomSelections: RoomSelection[];
    checkIn: string;
    checkOut: string;
    isFlexibleDates: boolean;
    guestName: string;
    guestEmail: string;
    adults: number;
    children05: number;
    children616: number;
    isEastAfricanResident: boolean; 
    selectedServices: string[];
    message: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export async function sendBookingConfirmationEmails(booking: BookingEmailData | undefined) {
    if (!booking) {
        console.error('No booking data provided');
        return;
    }

    // Read and encode the logo image
    const logoPath = path.join(process.cwd(), 'public', 'images', 'Asset-34x.png');
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });

    const guestMailOptions = {
        from: isDevelopment
            ? "kevin@deployitwith.me"
            : "info@lebambougorillalodge.com",
        to: booking.guestEmail,
        subject: "Booking Confirmation - Le Bambou Gorilla Lodge",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
                    body {
                        font-family: 'Varela Round', sans-serif;
                        background-color: #b9c5c4;
                        color: #2c2c2c;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        padding: 20px;
                    }
                    .header {
                        background-color: rgba(121,98,90,0.89);
                        padding: 20px;
                        text-align: center;
                        color: #fff;
                        border-radius: 10px;
                    }
                    .content {
                        background-color: #d7dfde;
                        padding: 20px;
                        margin-top: 20px;
                        border-radius: 10px;
                    }
                    .content h2 {
                        color: #2c2c2c;
                    }
                    .content p, .content li {
                        color: #2c2c2c;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        font-size: 12px;
                        color: #2c2c2c;
                        border-radius: 10px;
                    }
                    a {
                        color: #2c2c2c;
                        text-decoration: none;
                    }
                    a:hover {
                        background-color: #d7dfde;
                    }
                    .logo {
                        max-width: 100px;
                        max-height: 100px;
                        height: auto;
                        margin: 0 auto;
                        display: block;
                        margin-bottom: 40px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="data:image/png;base64,${logoBase64}" alt="Le Bambou Gorilla Lodge" class="logo">
                    <div class="header">
                        <h1>Le Bambou Gorilla Lodge</h1>
                    </div>
                    <div class="content">
                        <h2>Booking Confirmation</h2>
                        <p>Dear ${booking.guestName},</p>
                        <p>Thank you for booking with Le Bambou Gorilla Lodge. Your booking details are as follows:</p>
                        <ul>
                            <li><strong>Booking ID:</strong> ${booking.id}</li>
                            <li><strong>Check-in:</strong> ${booking.checkIn}</li>
                            <li><strong>Check-out:</strong> ${booking.checkOut}</li>
                            <li><strong>Room(s):</strong> ${(booking.roomSelections).map(r => `${r.count} ${r.type}`).join(', ')}</li>
                            <li><strong>Guests:</strong> ${booking.adults} adults${booking.children05 > 0 || booking.children616 > 0 ? `, ${booking.children05} children (0-5), ${booking.children616} children (6-16)` : ''}</li>
                            <li><strong>Selected Services:</strong> ${(booking.selectedServices).map(serviceId => {
                                const service = additionalServices.find(s => s.id === serviceId);
                                return service ? service.name : serviceId;
                            }).join(', ')}</li>
                        </ul>
                        <p>We look forward to welcoming you to Le Bambou Gorilla Lodge!</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Le Bambou Gorilla Lodge. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    const adminMailOptions = {
        from: isDevelopment
            ? "kevin@deployitwith.me"
            : "info@lebambougorillalodge.com",
        to: isDevelopment
            ? "kevin@deployitwith.me"
            : "info@lebambougorillalodge.com",
        subject: `New Booking - ${booking.guestName}`,
        replyTo: booking.guestEmail,
        html: `
      <h2>New Booking Received</h2>
      <p>A new booking has been made with the following details:</p>
      <ul>
        <li>Booking ID: ${booking.id}</li>
        <li>Guest Name: ${booking.guestName}</li>
        <li>Guest Email: ${booking.guestEmail}</li>
        <li>Check-in: ${booking.checkIn}</li>
        <li>Check-out: ${booking.checkOut}</li>
        <li>Room(s): ${(booking.roomSelections).map(r => `${r.count} ${r.type}`).join(', ')}</li>
        <li>Guests: ${booking.adults} adults${booking.children05 > 0 || booking.children616 > 0 ? `, ${booking.children05} children (0-5), ${booking.children616} children (6-16)` : ''}</li>
        <li>East African Resident: ${booking.isEastAfricanResident ? 'Yes' : 'No'}</li>
        <li>Selected Services: ${(booking.selectedServices).map(serviceId => {
            const service = additionalServices.find(s => s.id === serviceId);
            return service ? service.name : serviceId; // Display service name
        }).join(', ')}</li>
        <li>Message: ${booking.message ?? 'No message provided'}</li>
      </ul>
    `,
    };

    await transporter.sendMail(guestMailOptions);
    await transporter.sendMail(adminMailOptions);
}