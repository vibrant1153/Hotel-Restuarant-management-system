//importing the prisma and and bcyptjs
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main(){
    console.log('🌱 Seeding Auralis database...');

    //hashing admin password
    const adminPassword = await bcrypt.hash('admin123', 12);

    // creating admin email
  await prisma.user.upsert({
    where: { email: 'admin@auralis.com' },
    update: {},
    create: { name: 'Auralis Admin', email: 'admin@auralis.com', hashedPassword: adminPassword, role: 'ADMIN' },
  });

    //hashing guest password
   const guestPassword = await bcrypt.hash('guest123', 12);

   //inserting guest email
  await prisma.user.upsert({
    where: { email: 'guest@auralis.com' },
    update: {},
    create: { name: 'John Doe', email: 'guest@auralis.com', hashedPassword: guestPassword, role: 'GUEST', phone: '+1 234 567 8900' },
  });

  //confirming if created 
  console.log('✅ Users created');

    //rooms collection
  const rooms = [
    { name: 'Classic Standard Room', type: 'STANDARD', price: 199, description: 'A beautifully appointed standard room with modern furnishings and stunning city views.', images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800'], amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Safe', 'Room Service'], status: 'AVAILABLE', capacity: 2, floor: 3, bedType: 'King Bed', size: 35 },
    { name: 'Garden View Standard', type: 'STANDARD', price: 219, description: 'Wake up to serene garden views in this elegantly designed standard room with a private balcony.', images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'], amenities: ['Free WiFi', 'Balcony', 'Garden View', 'Air Conditioning', 'TV', 'Coffee Maker'], status: 'OCCUPIED', capacity: 2, floor: 2, bedType: 'Queen Bed', size: 38 },
    { name: 'Twin Standard Room', type: 'STANDARD', price: 179, description: 'Perfect for colleagues or friends with two premium single beds and ample storage space.', images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800'], amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Work Desk', 'Safe'], status: 'AVAILABLE', capacity: 2, floor: 4, bedType: 'Twin Beds', size: 32 },
    { name: 'Deluxe City View', type: 'DELUXE', price: 349, description: 'Floor-to-ceiling windows, a separate seating area, and premium amenities redefine luxury comfort.', images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], amenities: ['Free WiFi', 'City View', 'Jacuzzi', 'Mini Bar', 'Lounge Chair', 'Nespresso Machine', 'Bathrobe & Slippers'], status: 'AVAILABLE', capacity: 2, floor: 8, bedType: 'King Bed', size: 55 },
    { name: 'Deluxe Ocean Panorama', type: 'DELUXE', price: 429, description: 'Breathtaking ocean panoramas from this sumptuously appointed deluxe room with balcony.', images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'], amenities: ['Free WiFi', 'Ocean View', 'Balcony', 'Spa Bath', 'Champagne Welcome', 'Butler Service'], status: 'AVAILABLE', capacity: 3, floor: 12, bedType: 'King Bed', size: 62 },
    { name: 'Deluxe Garden Terrace', type: 'DELUXE', price: 379, description: 'Step onto your private garden terrace and breathe in the fragrance of tropical flowers.', images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'], amenities: ['Free WiFi', 'Private Terrace', 'Garden Access', 'Rain Shower', 'Soaking Tub'], status: 'MAINTENANCE', capacity: 2, floor: 1, bedType: 'King Bed', size: 68 },
    { name: 'Executive Suite', type: 'SUITE', price: 699, description: 'Separate living room, dining area, and master bedroom for the discerning traveler.', images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800'], amenities: ['Free WiFi', 'Separate Living Room', 'Dining Area', 'Executive Lounge', 'Butler Service', 'Two Bathrooms'], status: 'AVAILABLE', capacity: 4, floor: 15, bedType: 'King Bed', size: 120 },
    { name: 'Honeymoon Suite', type: 'SUITE', price: 849, description: 'Romance crafted into every detail with rose petal turndown service and champagne terrace.', images: ['https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?w=800'], amenities: ['Free WiFi', 'Private Pool', 'Rose Petal Service', 'Champagne', 'Couples Spa', 'Butler Service'], status: 'AVAILABLE', capacity: 2, floor: 18, bedType: 'Canopy King Bed', size: 140 },
    { name: 'Family Suite', type: 'SUITE', price: 799, description: 'Two connected bedrooms, a playroom for little ones, and a family-sized terrace.', images: ['https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800'], amenities: ['Free WiFi', 'Two Bedrooms', 'Kids Playroom', 'Family Terrace', 'PlayStation'], status: 'OCCUPIED', capacity: 6, floor: 10, bedType: 'King + Twin Beds', size: 180 },
    { name: 'The Auralis Presidential Suite', type: 'PRESIDENTIAL', price: 2499, description: 'The crown jewel of Auralis spanning the entire top floor with a private infinity pool and dedicated staff team.', images: ['https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800'], amenities: ['Private Infinity Pool', 'Dedicated Butler Team', 'Gourmet Kitchen', '360° Views', 'Private Elevator', 'Home Theater', 'Gym', 'Rolls Royce Transfer'], status: 'AVAILABLE', capacity: 8, floor: 25, bedType: 'Emperor Bed', size: 650 },
    { name: 'Royal Penthouse', type: 'PRESIDENTIAL', price: 1999, description: 'An architectural masterpiece with a wraparound terrace, hot tub, and bespoke artisan furniture.', images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], amenities: ['Private Terrace', 'Hot Tub', 'Original Artwork', 'Personal Chef', 'Library', 'Private Entrance'], status: 'AVAILABLE', capacity: 6, floor: 24, bedType: 'King Bed', size: 480 },
    { name: 'Sky Villa', type: 'PRESIDENTIAL', price: 1799, description: 'Suspended between sky and sea with a glass-floored terrace, private spa, and curated luxury.', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'], amenities: ['Glass Floor Terrace', 'Private Spa', 'Sauna', 'Panoramic Bathtub', 'Concierge', 'Limousine Service'], status: 'AVAILABLE', capacity: 4, floor: 23, bedType: 'King Bed', size: 420 },
  ];

    //creating rooms in the db 
  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }
  console.log(`✅ Created ${rooms.length} rooms`);

  //collection of food items 
  const foodItems = [
    { name: 'Auralis Signature Breakfast', description: 'Eggs Benedict with smoked salmon on brioche, fresh fruit and OJ', price: 28, category: 'BREAKFAST', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400', available: true },
    { name: 'French Toast Royale', description: 'Thick-cut brioche with maple syrup, fresh berries, and whipped cream', price: 22, category: 'BREAKFAST', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400', available: true },
    { name: 'Continental Basket', description: 'Freshly baked pastries, croissants, fruit preserves, and artisan cheeses', price: 18, category: 'BREAKFAST', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', available: true },
    { name: 'Avocado Toast Supreme', description: 'Sourdough with smashed avocado, poached eggs, microgreens, and truffle oil', price: 24, category: 'BREAKFAST', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400', available: true },
    { name: 'Wagyu Beef Burger', description: 'Premium Wagyu beef with aged cheddar, caramelized onions, and truffle aioli', price: 42, category: 'LUNCH', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', available: true },
    { name: 'Grilled Mediterranean Salad', description: 'Grilled halloumi, heirloom tomatoes, olives, and lemon-herb dressing', price: 28, category: 'LUNCH', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', available: true },
    { name: 'Lobster Bisque', description: 'Velvety lobster bisque with crème fraîche and crusty artisan bread', price: 36, category: 'LUNCH', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', available: true },
    { name: 'Club Sandwich Classic', description: 'Triple-decker with roasted chicken, crispy bacon, avocado, and sun-dried tomato mayo', price: 32, category: 'LUNCH', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?w=400', available: false },
    { name: 'Prime Ribeye Steak', description: '300g dry-aged prime ribeye with truffle butter and seasonal vegetables', price: 89, category: 'DINNER', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400', available: true },
    { name: 'Pan-Seared Sea Bass', description: 'Atlantic sea bass with saffron risotto, capers, and white wine reduction', price: 68, category: 'DINNER', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400', available: true },
    { name: 'Mushroom Truffle Risotto', description: 'Arborio rice with wild mushrooms, black truffle, and aged Parmesan', price: 52, category: 'DINNER', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400', available: true },
    { name: 'Rack of Lamb', description: 'Herb-crusted rack with mint jus, dauphinoise potatoes, and roasted garlic', price: 76, category: 'DINNER', image: 'https://images.unsplash.com/photo-1544025162-d76538b2a681?w=400', available: true },
    { name: 'Artisan Cheese Board', description: 'Five artisan cheeses with honeycomb, candied walnuts, and seasonal fruits', price: 38, category: 'SNACKS', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', available: true },
    { name: 'Truffle Fries', description: 'Crispy hand-cut fries with black truffle oil and aged Parmesan', price: 18, category: 'SNACKS', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', available: true },
    { name: 'Canapé Selection', description: "Chef's selection of six seasonal canapés for evening indulgence", price: 32, category: 'SNACKS', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', available: true },
    { name: 'Gold Rush Cocktail', description: 'Auralis signature with aged bourbon, honey syrup, and edible gold flakes', price: 24, category: 'DRINKS', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400', available: true },
    { name: 'Dom Pérignon Champagne', description: '2015 Dom Pérignon Vintage, chilled and delivered with crystal flutes', price: 320, category: 'DRINKS', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', available: true },
    { name: 'Fresh Juice Trio', description: 'Cold-pressed green, beet-ginger, and classic orange juices', price: 16, category: 'DRINKS', image: 'https://images.unsplash.com/photo-1622597467836-f3e6d0a52f0b?w=400', available: true },
    { name: 'Single Origin Coffee', description: 'Ethiopian single origin beans brewed as espresso, pour-over, or cold brew', price: 12, category: 'DRINKS', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', available: true },
    { name: 'Matcha Ceremony', description: 'Ceremonial grade matcha whisked tableside with wagashi sweets', price: 18, category: 'DRINKS', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400', available: true },
  ];


  //creating fooditems in db
  for (const item of foodItems) {
    await prisma.foodItem.create({ data: item });
  }
  console.log(`✅ Created ${foodItems.length} food items`);
  console.log('🎉 Seeding complete! Admin: admin@auralis.com / admin123');
}
main().catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });