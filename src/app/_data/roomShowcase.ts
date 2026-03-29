import type { RoomType } from "~/types/booking";

type RoomShowcaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type RoomShowcase = {
  type: RoomType;
  title: string;
  description: string;
  images: RoomShowcaseImage[];
};

export const standardRoomShowcases: RoomShowcase[] = [
  {
    type: "Double",
    title: "Double Room",
    description:
      "A warm, spacious room for couples or two guests, with a comfortable double bed, private bathroom, and calm lodge interiors that make it easy to unwind after a day in Volcanoes National Park.",
    images: [
      {
        src: "/images/gallery/rooms/double/lebambou-doubleroom-002.webp",
        alt: "Double room 2",
        width: 2104,
        height: 1744,
      },
      {
        src: "/images/gallery/rooms/double/lebambou-doubleroom-005.webp",
        alt: "Double room 5",
        width: 2230,
        height: 2600,
      },
      {
        src: "/images/gallery/rooms/double/lebambou-doubleroom-003.webp",
        alt: "Double room 3",
        width: 2600,
        height: 1950,
      },
    ],
  },
  {
    type: "Single",
    title: "Single Room",
    description:
      "A quiet retreat for solo travelers, with a well-appointed single bed, private bathroom, and a bright, restful layout suited to short stays and longer lodge stopovers alike.",
    images: [
      {
        src: "/images/gallery/rooms/single/lebambou-singleroom-001.webp",
        alt: "Single room 1",
        width: 2600,
        height: 1950,
      },
      {
        src: "/images/gallery/rooms/single/lebambou-singleroom-002.webp",
        alt: "Single room 2",
        width: 2600,
        height: 1950,
      },
      {
        src: "/images/gallery/rooms/single/lebambou-singleroom-005.webp",
        alt: "Single room 5",
        width: 2600,
        height: 1950,
      },
    ],
  },
  {
    type: "Triple",
    title: "Triple Room",
    description:
      "A practical, comfortable choice for small groups and shared stays, offering three beds, a private bathroom, and enough space to settle in without feeling crowded.",
    images: [
      {
        src: "/images/gallery/rooms/triple/lebambou-tripleroom-002.webp",
        alt: "Triple room 2",
        width: 2600,
        height: 1950,
      },
      {
        src: "/images/gallery/rooms/triple/lebambou-tripleroom-003.webp",
        alt: "Triple room 3",
        width: 2600,
        height: 1950,
      },
      {
        src: "/images/gallery/rooms/triple/lebambou-tripleroom-005.webp",
        alt: "Triple room 5",
        width: 2600,
        height: 2510,
      },
    ],
  },
  {
    type: "Twin",
    title: "Twin Room",
    description:
      "Ideal for friends, colleagues, or travelers sharing, with two separate beds, a private bathroom, and a clean, comfortable setup designed for easy rest between excursions.",
    images: [
      {
        src: "/images/gallery/rooms/twin/lebambou-twinroom-002.webp",
        alt: "Twin room 2",
        width: 1950,
        height: 2600,
      },
      {
        src: "/images/gallery/rooms/twin/lebambou-twinroom-007.webp",
        alt: "Twin room 7",
        width: 2600,
        height: 1950,
      },
      {
        src: "/images/gallery/rooms/twin/lebambou-twinroom-006.webp",
        alt: "Twin room 6",
        width: 2600,
        height: 1950,
      },
    ],
  },
];

export const familyCottageShowcase: RoomShowcase = {
  type: "Family",
  title: "Family Cottage",
  description:
    "A larger family-friendly cottage with generous sleeping space, a private bathroom, and a more spacious layout that works well for parents, children, or longer stays together.",
  images: [
    {
      src: "/images/gallery/rooms/family-cottage/lebambou-familycottage-015.webp",
      alt: "Family cottage 15",
      width: 2600,
      height: 1950,
    },
    {
      src: "/images/gallery/rooms/family-cottage/lebambou-familycottage-014.webp",
      alt: "Family cottage 14",
      width: 1950,
      height: 2600,
    },
    {
      src: "/images/gallery/rooms/family-cottage/lebambou-familycottage-010.webp",
      alt: "Family cottage 10",
      width: 2600,
      height: 1950,
    },
  ],
};

export const roomShowcases: RoomShowcase[] = [
  ...standardRoomShowcases,
  familyCottageShowcase,
];
