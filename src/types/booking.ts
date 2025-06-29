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
}

export const additionalServices: AdditionalService[] = [
  { id: "airportTransfer", name: "Airport Transfer Kigali ↔ Kinigi (one-way)", price: 100 },
  { id: "transportFullDay", name: "Transportation Full-Day (driver & vehicle)", price: 250 },
  { id: "boatTour", name: "Twin Lake Burera and Ruhondo Boat Tour", price: 30 },
  { id: "bisokeHiking", name: "Bisoke Hiking Permit", price: 75 },
  { id: "goldenMonkey", name: "Golden Monkey Permit", price: 100 },
  { id: "gorillaPermit", name: "Gorilla Permit", price: 1500 },
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
