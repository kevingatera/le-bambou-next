"use client";

import Link from "next/link";
import { type RoomType } from "~/types/booking";
import { captureAnalyticsEvent } from "./analytics/posthogEvents";
import { setStoredBookingData } from "~/app/_utils/localStorage";

export const PreconfiguredBookingButton = ({
  roomType,
  href = "/booking",
  className,
  children,
}: {
  roomType: RoomType;
  href?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        captureAnalyticsEvent("room_booking_cta_click", {
          room_type: roomType,
          href,
        });
        setStoredBookingData({
          roomSelections: [
            {
              type: roomType,
              count: 1,
              boardType: "fullBoard",
            },
          ],
        });
      }}
    >
      {children}
    </Link>
  );
};
