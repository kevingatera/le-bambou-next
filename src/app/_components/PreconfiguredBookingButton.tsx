"use client";

import Link from "next/link";
import { type RoomType } from "~/types/booking";
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
      onClick={() =>
        setStoredBookingData({
          roomSelections: [
            {
              type: roomType,
              count: 1,
              boardType: "fullBoard",
            },
          ],
        })}
    >
      {children}
    </Link>
  );
};
