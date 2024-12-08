import { type RoomSelection } from "~/types/booking";

interface BookingFormData {
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
  message: string;
}

export const getStoredBookingData = (): BookingFormData | null => {
  if (typeof window === "undefined") return null;
  const savedData = localStorage.getItem("bookingFormData");
  return savedData ? (JSON.parse(savedData) as BookingFormData) : null;
};

export const setStoredBookingData = (data: Partial<BookingFormData>) => {
  if (typeof window === "undefined") return;
  const currentData = getStoredBookingData() ?? {};
  const updatedData = { ...currentData, ...data };
  localStorage.setItem("bookingFormData", JSON.stringify(updatedData));
};

export const clearStoredBookingData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("bookingFormData");
};
