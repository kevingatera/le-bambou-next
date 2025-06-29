export const roomTypes = ["Double", "Single", "Triple", "Twin"] as const;
export type RoomType = typeof roomTypes[number];

export interface RoomSelection {
  type: RoomType;
  count: number;
  boardType: BoardType;
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  allowQuantity?: boolean;
}

export const additionalServices: AdditionalService[] = [
  { id: "airportTransfer", name: "Airport Transfer (one-way)", price: 100, allowQuantity: true },
  { id: "transportFullDay", name: "Full-Day Transport (driver & vehicle)", price: 250, allowQuantity: true },
  { id: "boatTour", name: "Twin Lakes Boat Tour", price: 30, allowQuantity: true },
  { id: "bisokeHiking", name: "Bisoke Hiking Permit", price: 75, allowQuantity: true },
  { id: "goldenMonkey", name: "Golden Monkey Permit", price: 100, allowQuantity: true },
  { id: "gorillaPermit", name: "Gorilla Permit", price: 1500, allowQuantity: true },
];

export interface RoomPricing {
  fullBoard: number;
  halfBoard: number;
  bedAndBreakfast: number;
}

export const roomPrices: Record<RoomType, RoomPricing> = {
  Single: {
    fullBoard: 250,
    halfBoard: 220,
    bedAndBreakfast: 200,
  },
  Double: {
    fullBoard: 300,
    halfBoard: 280,
    bedAndBreakfast: 250,
  },
  Twin: {
    fullBoard: 300,
    halfBoard: 280,
    bedAndBreakfast: 250,
  },
  Triple: {
    fullBoard: 400,
    halfBoard: 380,
    bedAndBreakfast: 350,
  },
};

export type BoardType = "fullBoard" | "halfBoard" | "bedAndBreakfast";
