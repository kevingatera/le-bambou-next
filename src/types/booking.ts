export const roomTypes = ["Double", "Single", "Triple", "Twin"] as const;
export type RoomType = typeof roomTypes[number];

export interface RoomSelection {
  type: RoomType;
  count: number;
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

export const additionalServices: AdditionalService[] = [
  { id: 'transportation', name: 'Transportation', price: 100 },
  { id: 'goldenMonkey', name: 'Golden Monkey Permit', price: 100 },
  { id: 'bisokeHiking', name: 'Bisoke Hiking Permit', price: 75 },
  { id: 'boatTour', name: 'Twin Lake Burera and Ruhondo Boat Tour', price: 30 },
];
