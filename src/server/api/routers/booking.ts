import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { bookings } from "~/server/db/schema";
import { type BookingEmailData, sendBookingConfirmationEmails } from "~/server/utils/emailUtils";

const roomTypeEnum = z.enum(["Double", "Single", "Triple", "Twin"]);

export const bookingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      roomSelections: z.array(z.object({
        type: roomTypeEnum,
        count: z.number().int().positive(),
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
        console.error('Error creating booking', error);
        throw new Error('Error creating booking');
      }
    }),

  getAvailableRooms: publicProcedure
    .input(z.object({
      checkIn: z.string(),
      checkOut: z.string(),
    }))
    .query(async ({ ctx }) => {
      // TODO: Simplified query. Later need to check against existing bookings.
      const availableRooms = await ctx.db.query.rooms.findMany({
        where: (rooms, { gt }) => gt(rooms.availableCount, 0),
      });

      return availableRooms;
    }),
});