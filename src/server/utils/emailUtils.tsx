import nodemailer from "nodemailer";
import {
    additionalServices,
    roomPrices,
    type RoomSelection,
} from "~/types/booking";
import { isEmail } from "validator";
import dns from "dns";
import { promisify } from "util";

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

const resolveMx = promisify(dns.resolveMx);

async function isEmailValid(email: string): Promise<boolean> {
    if (
        !isEmail(email, {
            allow_display_name: false,
            require_display_name: false,
            allow_utf8_local_part: true,
            require_tld: true,
            allow_ip_domain: false,
            domain_specific_validation: true,
        })
    ) return false;
    try {
        const domain = email.split("@")[1];
        if (!domain) return false;
        const mxRecords = await resolveMx(domain);
        return mxRecords.length > 0;
    } catch {
        return false;
    }
}

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

export async function sendBookingConfirmationEmails(
    booking: BookingEmailData | undefined,
) {
    if (!booking) {
        console.error("No booking data provided");
        return;
    }

    const isValid = await isEmailValid(booking.guestEmail);
    if (!isValid) {
        throw new Error("Invalid email address");
    }

    // Calculate total room cost
    const calculateRoomTotal = (roomSelections: RoomSelection[]) => {
        const nights = calculateNumberOfNights(booking.checkIn, booking.checkOut);
        return roomSelections.reduce((total, room) => {
            const pricePerNight = roomPrices[room.type][room.boardType];
            return total + pricePerNight * room.count * nights;
        }, 0);
    };

    // Calculate services total
    const calculateServicesTotal = (selectedServices: string[]) => {
        return selectedServices.reduce((total, serviceId) => {
            const service = additionalServices.find((s) => s.id === serviceId);
            return total + (service?.price ?? 0);
        }, 0);
    };

    const calculateNumberOfNights = (checkIn: string, checkOut: string) => {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const numberOfNights = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24),
        );
        return numberOfNights;
    };

    const roomTotal = calculateRoomTotal(booking.roomSelections);
    const servicesTotal = calculateServicesTotal(booking.selectedServices);
    const grandTotal = roomTotal + servicesTotal;

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
                        <img src="https://lebambougorillalodge.com/images/Asset-34x.png" alt="Le Bambou Gorilla Lodge" class="logo" style="display: block; margin: 0 auto; width: 100px; height: auto;">
                        <h1>Le Bambou Gorilla Lodge</h1>
                    </div>
                    <div class="content">
                        <h2>Booking Confirmation</h2>
                        <p>Dear ${booking.guestName},</p>
                        <p>Thank you for booking with Le Bambou Gorilla Lodge. Here are your booking details:</p>
                        
                        <h3 style="margin: 20px 0 10px; color: #2c2c2c;">Booking Summary</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            <li style="margin-bottom: 8px;"><strong>Booking ID:</strong> ${booking.id}</li>
                            <li style="margin-bottom: 8px;"><strong>Dates:</strong> ${booking.checkIn} to ${booking.checkOut} (${calculateNumberOfNights(booking.checkIn, booking.checkOut)
            } nights)</li>
                            <li style="margin-bottom: 8px;"><strong>Guest Type:</strong> ${booking.isEastAfricanResident
                ? "East African Resident"
                : "International Guest"
            }</li>
                        </ul>

                        <h3 style="margin: 25px 0 10px; color: #2c2c2c;">Accommodation Details</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            ${booking.roomSelections.map((r) => `
                                <li style="margin-bottom: 8px;">
                                    ${r.count} × ${r.type} (${r.boardType}) 
                                    <span style="float: right;">@ $${roomPrices[r.type][r.boardType]
                }</span>
                                </li>
                            `).join("")
            }
                            <li style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 10px;">
                                <strong>Room Total:</strong> 
                                <span style="float: right;">$${roomTotal}</span>
                            </li>
                        </ul>

                        <h3 style="margin: 25px 0 10px; color: #2c2c2c;">Guest Composition</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            <li>Adults: ${booking.adults}</li>
                            ${booking.children05 > 0
                ? `<li>Children 0-5: ${booking.children05}</li>`
                : ""
            }
                            ${booking.children616 > 0
                ? `<li>Children 6-16: ${booking.children616}</li>`
                : ""
            }
                        </ul>

                        ${booking.selectedServices.length > 0
                ? `
                            <h3 style="margin: 25px 0 10px; color: #2c2c2c;">Additional Services</h3>
                            <ul style="list-style: none; padding-left: 0;">
                                ${booking.selectedServices.map((serviceId) => {
                    const service = additionalServices.find((s) =>
                        s.id === serviceId
                    );
                    return service
                        ? `
                                        <li style="margin-bottom: 8px;">
                                            ${service.name}
                                            <span style="float: right;">$${service.price}</span>
                                        </li>
                                    `
                        : "";
                }).join("")
                }
                                <li style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 10px;">
                                    <strong>Services Total:</strong> 
                                    <span style="float: right;">$${servicesTotal}</span>
                                </li>
                            </ul>
                        `
                : ""
            }

                        <div style="margin: 30px 0; background: #f8f8f8; padding: 20px; border-radius: 8px;">
                            <h3 style="margin: 0 0 15px; color: #2c2c2c;">Total Amount Due</h3>
                            <p style="font-size: 1.4em; margin: 0;">
                                $${grandTotal}
                                <span style="font-size: 0.8em; color: #666;">(USD)</span>
                            </p>
                        </div>

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
                        <p>&copy; ${new Date().getFullYear()
            } Le Bambou Gorilla Lodge. All rights reserved.</p>
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
                    ${booking.roomSelections.map((r) => `
                        <li>${r.count} ${r.type} (${r.boardType}) - $${roomPrices[r.type][r.boardType]
            } per room</li>
                    `).join("")
            }
                </ul>
                <li>Room Total: $${roomTotal}</li>
                <li>Guests: ${booking.adults} Adults${booking.children05 > 0 || booking.children616 > 0
                ? `, ${booking.children05} Children (0-5), ${booking.children616} Children (6-16)`
                : ""
            }</li>
                <li>East African Resident: ${booking.isEastAfricanResident ? "Yes" : "No"
            }</li>
                <li>Selected Services:</li>
                <ul>
                    ${booking.selectedServices.map((serviceId) => {
                const service = additionalServices.find((s) =>
                    s.id === serviceId
                );
                if (!service) return "";
                return `<li>${service.name} - $${service.price}</li>`;
            }).join("")
            }
                </ul>
                <li>Services Total: $${servicesTotal}</li>
                <li>Grand Total: $${grandTotal}</li>
                <li>Message: ${booking.message ?? "No message provided"}</li>
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
