const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Relax by the beach with stunning ocean views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    latitude: 34.0259,
    longitude: -118.7798,
    category: "Trending"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 1200,
    location: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    category: "Iconic Cities"
  },
  {
    title: "Mountain Retreat",
    description: "Peaceful cabin surrounded by nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    latitude: 39.1911,
    longitude: -106.8175,
    category: "Mountains"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Explore vineyards and countryside.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    latitude: 43.7696,
    longitude: 11.2558,
    category: "Castles"
  },
  {
    title: "Beach House in Goa",
    description: "Chill near the beach in Goa.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    price: 1200,
    location: "Goa",
    country: "India",
    latitude: 15.2993,
    longitude: 74.1240,
    category: "Trending"
  },
  {
    title: "Hill Station Cottage",
    description: "Cozy stay in the mountains.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
    price: 800,
    location: "Manali",
    country: "India",
    latitude: 32.2432,
    longitude: 77.1892,
    category: "Mountains"
  },
  {
    title: "Dubai Marina Apartment",
    description: "Luxury stay in Dubai.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
    price: 4000,
    location: "Dubai",
    country: "UAE",
    latitude: 25.2048,
    longitude: 55.2708,
    category: "Iconic Cities"
  },
  {
    title: "Tokyo Apartment",
    description: "Modern apartment in Tokyo.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd" },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    category: "Rooms"
  },
  {
    title: "Sydney Harbour View",
    description: "Beautiful harbour view stay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03" },
    price: 3200,
    location: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    category: "Trending"
  },
  {
    title: "Paris Luxury Apartment",
    description: "Stay near Eiffel Tower.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    price: 3000,
    location: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    category: "Iconic Cities"
  },
  {
    title: "Berlin Studio",
    description: "Compact modern studio.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
    price: 1400,
    location: "Berlin",
    country: "Germany",
    latitude: 52.52,
    longitude: 13.405,
    category: "Rooms"
  },
  {
    title: "Rome Apartment",
    description: "Stay near historic sites.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1526481280691-7810c7e5d69f" },
    price: 2600,
    location: "Rome",
    country: "Italy",
    latitude: 41.9028,
    longitude: 12.4964,
    category: "Iconic Cities"
  },
  {
    title: "Bangkok Condo",
    description: "Modern condo in Bangkok.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365" },
    price: 1100,
    location: "Bangkok",
    country: "Thailand",
    latitude: 13.7563,
    longitude: 100.5018,
    category: "Rooms"
  },
  {
    title: "Cape Town Sea View",
    description: "Ocean-facing house.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29" },
    price: 2100,
    location: "Cape Town",
    country: "South Africa",
    latitude: -33.9249,
    longitude: 18.4241,
    category: "Trending"
  },
  {
    title: "Toronto Condo",
    description: "City life in Toronto.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad" },
    price: 1900,
    location: "Toronto",
    country: "Canada",
    latitude: 43.6532,
    longitude: -79.3832,
    category: "Rooms"
  },
  {
    title: "Singapore Apartment",
    description: "Luxury skyline view.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1508962914676-134849a727f0" },
    price: 2800,
    location: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    category: "Iconic Cities"
  },
  {
    title: "Iceland Cabin",
    description: "Northern lights experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500534623283-312aade485b7" },
    price: 2200,
    location: "Reykjavik",
    country: "Iceland",
    latitude: 64.1466,
    longitude: -21.9426,
    category: "Arctic"
  },
  {
    title: "Nepal Lodge",
    description: "Stay near Himalayas.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 500,
    location: "Kathmandu",
    country: "Nepal",
    latitude: 27.7172,
    longitude: 85.324,
    category: "Camping"
  },
  {
    title: "Rio Beach Apartment",
    description: "Beach stay in Brazil.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    price: 1800,
    location: "Rio de Janeiro",
    country: "Brazil",
    latitude: -22.9068,
    longitude: -43.1729,
    category: "Trending"
  },
  {
    title: "Houseboat Stay",
    description: "Live on water in a beautiful houseboat.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e" },
    price: 1600,
    location: "Kerala",
    country: "India",
    latitude: 9.9312,
    longitude: 76.2673,
    category: "HouseBoat"
  }
];

module.exports = { data: sampleListings };