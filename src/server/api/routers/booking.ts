import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { bookings } from "~/server/db/schema";
import {
  type BookingEmailData,
  sendBookingConfirmationEmails,
} from "~/server/utils/emailUtils";
import dns from "dns";
import { promisify } from "util";
import { isEmail } from "validator";

const resolveMx = promisify(dns.resolveMx);

async function isEmailValid(email: string): Promise<boolean> {
  if (!isEmail(email)) return false;
  try {
    const domain = email.split("@")[1];
    if (!domain) return false;
    const mxRecords = await resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

const roomTypeEnum = z.enum(["Double", "Single", "Triple", "Twin"]);
const boardTypeEnum = z.enum(["fullBoard", "halfBoard", "bedAndBreakfast"]);

export const bookingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      roomSelections: z.array(z.object({
        type: roomTypeEnum,
        count: z.number().int().positive(),
        boardType: boardTypeEnum,
      })),
      checkIn: z.string(),
      checkOut: z.string(),
      isFlexibleDates: z.boolean(),
      guestName: z.string(),
      guestEmail: z.string().email(),
      adults: z.number().int().positive(),
      children05: z.number().int().nonnegative(),
      children616: z.number().int().nonnegative(),
      isEastAfricanResident: z.boolean(),
      selectedServices: z.array(z.string()),
      message: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const isValid = await isEmailValid(input.guestEmail);
        if (!isValid) {
          throw new Error("Invalid email address");
        }

        const booking = await ctx.db.insert(bookings).values({
          roomSelections: input.roomSelections,
          checkIn: input.checkIn,
          checkOut: input.checkOut,
          isFlexibleDates: input.isFlexibleDates,
          guestName: input.guestName,
          guestEmail: input.guestEmail,
          adults: input.adults,
          children05: input.children05,
          children616: input.children616,
          isEastAfricanResident: input.isEastAfricanResident,
          selectedServices: input.selectedServices,
          message: input.message,
        }).returning();

        // Send confirmation emails
        await sendBookingConfirmationEmails(booking[0] as BookingEmailData);

        return booking[0];
      } catch (error) {
        console.error("Error creating booking", error);
        throw new Error(
          error instanceof Error ? error.message : "Error creating booking",
        );
      }
    }),

  getAvailableRooms: publicProcedure
    .input(z.object({
      checkIn: z.string(),
      checkOut: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { checkIn, checkOut } = input;

      // Get all bookings that overlap with the requested dates
      const overlappingBookings = await ctx.db.query.bookings.findMany({
        where: (bookings, { and, lte, gte }) =>
          and(
            lte(bookings.checkIn, checkOut),
            gte(bookings.checkOut, checkIn)
          ),
      });

      // Get total room inventory
      const allRooms = await ctx.db.query.rooms.findMany();

      // Calculate booked rooms by type from overlapping bookings
      const bookedCounts: Record<string, number> = {};
      overlappingBookings.forEach(booking => {
        booking.roomSelections.forEach(selection => {
          bookedCounts[selection.type] = (bookedCounts[selection.type] ?? 0) + selection.count;
        });
      });

      // Calculate available rooms by type
      const availableRooms = allRooms.filter(room => {
        const booked = bookedCounts[room.type] ?? 0;
        return room.availableCount > booked;
      });

      return availableRooms;
    }),
});
