// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  integer,
  boolean,
  jsonb,
  text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `le-bambou-next_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const rooms = createTable(
  "room",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 50 }).notNull(),
    description: varchar("description", { length: 1000 }),
    availableCount: integer("available_count").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const bookings = createTable(
  "booking",
  {
    id: serial("id").primaryKey(),
    roomSelections: jsonb("room_selections").notNull(),
    checkIn: date("check_in").notNull(),
    checkOut: date("check_out").notNull(),
    isFlexibleDates: boolean("is_flexible_dates").notNull(),
    guestName: varchar("guest_name", { length: 256 }).notNull(),
    guestEmail: varchar("guest_email", { length: 256 }).notNull(),
    adults: integer("adults").notNull(),
    children05: integer("children_0_5").notNull(),
    children616: integer("children_6_16").notNull(),
    isEastAfricanResident: boolean("is_east_african_resident").notNull(),
    selectedServices: jsonb("selected_services").notNull(),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (table) => ({
    checkInIndex: index("check_in_idx").on(table.checkIn),
    checkOutIndex: index("check_out_idx").on(table.checkOut),
  })
);