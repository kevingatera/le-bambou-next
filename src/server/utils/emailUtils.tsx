import nodemailer from "nodemailer";
import { type RoomSelection, additionalServices, roomPrices } from "~/types/booking";
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

    // Calculate total room cost
    const calculateRoomTotal = (roomSelections: RoomSelection[]) => {
        return roomSelections.reduce((total, room) => {
            const price = roomPrices[room.type][room.boardType];
            return total + (price * room.count);
        }, 0);
    };

    // Calculate services total
    const calculateServicesTotal = (selectedServices: string[]) => {
        return selectedServices.reduce((total, serviceId) => {
            const service = additionalServices.find(s => s.id === serviceId);
            return total + (service?.price ?? 0);
        }, 0);
    };

    const roomTotal = calculateRoomTotal(booking.roomSelections);
    const servicesTotal = calculateServicesTotal(booking.selectedServices);
    const grandTotal = roomTotal + servicesTotal;

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
                        margin-bottom: 40px;
                    }
                    .logo {
                        max-width: 150px;
                        height: auto;
                    }
                    .content {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        font-size: 0.9em;
                        color: #555555;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="data:image/png;base64,${logoBase64}" alt="Le Bambou Gorilla Lodge" class="logo">
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
                            <li><strong>Room(s):</strong></li>
                            <ul>
                                ${booking.roomSelections.map(r => `
                                    <li>${r.count} ${r.type} (${r.boardType}) - $${roomPrices[r.type][r.boardType]} per room</li>
                                `).join('')}
                            </ul>
                            <li><strong>Room Total:</strong> $${roomTotal}</li>
                            <li><strong>Guests:</strong> ${booking.adults} Adults${booking.children05 > 0 || booking.children616 > 0 ? `, ${booking.children05} Children (0-5), ${booking.children616} Children (6-16)` : ''}</li>
                            <li><strong>East African Resident:</strong> ${booking.isEastAfricanResident ? 'Yes' : 'No'}</li>
                            <li><strong>Selected Services:</strong></li>
                            <ul>
                                ${booking.selectedServices.map(serviceId => {
                                    const service = additionalServices.find(s => s.id === serviceId);
                                    return service ? `<li>${service.name} - $${service.price}</li>` : '';
                                }).join('')}
                            </ul>
                            <li><strong>Services Total:</strong> $${servicesTotal}</li>
                            <li><strong>Grand Total:</strong> $${grandTotal}</li>
                        </ul>

                        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                            <h3 style="color: #2c2c2c; margin-bottom: 10px;">Payment Information</h3>
                            <p>Your total amount of <strong>$${grandTotal}</strong> can be paid through the following methods:</p>
                            <ol style="margin-left: 20px;">
                                <li><strong>Bank Transfer:</strong> Bank details will be communicated separately upon receipt of this booking.</li>
                                <li><strong>Card Payment:</strong> Available upon arrival at the lodge.</li>
                            </ol>
                            <p style="margin-top: 10px; font-style: italic;">Please note: To secure your booking, we recommend arranging payment before arrival.</p>
                        </div>

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
                <li>Room(s):</li>
                <ul>
                    ${booking.roomSelections.map(r => `
                        <li>${r.count} ${r.type} (${r.boardType}) - $${roomPrices[r.type][r.boardType]} per room</li>
                    `).join('')}
                </ul>
                <li>Room Total: $${roomTotal}</li>
                <li>Guests: ${booking.adults} Adults${booking.children05 > 0 || booking.children616 > 0 ? `, ${booking.children05} Children (0-5), ${booking.children616} Children (6-16)` : ''}</li>
                <li>East African Resident: ${booking.isEastAfricanResident ? 'Yes' : 'No'}</li>
                <li>Selected Services:</li>
                <ul>
                    ${booking.selectedServices.map(serviceId => {
                        const service = additionalServices.find(s => s.id === serviceId);
                        return service ? `<li>${service.name} - $${service.price}</li>` : '';
                    }).join('')}
                </ul>
                <li>Services Total: $${servicesTotal}</li>
                <li>Grand Total: $${grandTotal}</li>
                <li>Message: ${booking.message ?? 'No message provided'}</li>
            </ul>

            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                <h3 style="color: #2c2c2c; margin-bottom: 10px;">Payment Information</h3>
                <p>The total amount of <strong>$${grandTotal}</strong> can be paid through the following methods:</p>
                <ol style="margin-left: 20px;">
                    <li><strong>Bank Transfer:</strong> Bank details will be communicated separately upon receipt of this booking.</li>
                    <li><strong>Card Payment:</strong> Available upon arrival at the lodge.</li>
                </ol>
                <p style="margin-top: 10px; font-style: italic;">Please ensure payment is arranged to secure the booking.</p>
            </div>
        `,
    };

    await transporter.sendMail(guestMailOptions);
    await transporter.sendMail(adminMailOptions);
}