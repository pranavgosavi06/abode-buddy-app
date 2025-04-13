
import { PgCardProps } from '@/components/pg/PgCard';

// Generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// List of cities
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'];

// List of area names
const areas = {
  'Delhi': ['Lajpat Nagar', 'Karol Bagh', 'Rajouri Garden', 'North Campus', 'South Campus'],
  'Mumbai': ['Andheri', 'Bandra', 'Powai', 'Dadar', 'Juhu'],
  'Bangalore': ['Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City', 'Whitefield'],
  'Pune': ['Kothrud', 'Viman Nagar', 'Hinjewadi', 'Baner', 'Shivaji Nagar'],
  'Hyderabad': ['Madhapur', 'Gachibowli', 'Hitech City', 'Jubilee Hills', 'Ameerpet'],
  'Chennai': ['Adyar', 'T Nagar', 'Anna Nagar', 'Velachery', 'Porur'],
};

// List of PG names
const pgNames = [
  'Comfort Stay PG', 
  'Student Hub', 
  'Urban Nest', 
  'College Corner', 
  'Metro Living', 
  'Smart Stay', 
  'Happy Home PG', 
  'Scholars Retreat', 
  'Campus View', 
  'City Dwellers'
];

// List of amenities
const allAmenities = [
  'Wifi', 
  'AC', 
  'Power Backup', 
  'Parking', 
  'TV', 
  'Fridge', 
  'Washing Machine', 
  'Security', 
  'Food', 
  'Housekeeping', 
  'Gym', 
  'Reading Room', 
  'Lift'
];

// Function to get random elements from an array
const getRandomElements = (arr: string[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate random PG data
export const generatePgData = (count: number): PgCardProps[] => {
  const pgData: PgCardProps[] = [];
  
  for (let i = 0; i < count; i++) {
    const cityIndex = Math.floor(Math.random() * cities.length);
    const city = cities[cityIndex];
    const area = areas[city][Math.floor(Math.random() * areas[city].length)];
    
    const totalBeds = Math.floor(Math.random() * 5) + 2; // 2 to 6 beds
    const availability = Math.floor(Math.random() * (totalBeds + 1)); // 0 to totalBeds
    
    const gender = ['male', 'female', 'any'][Math.floor(Math.random() * 3)] as 'male' | 'female' | 'any';
    
    const rating = (Math.random() * 2 + 3).toFixed(1); // Rating between 3.0 and 5.0
    
    const pgNameIndex = Math.floor(Math.random() * pgNames.length);
    const pgName = pgNames[pgNameIndex];
    
    const amenitiesCount = Math.floor(Math.random() * 6) + 3; // 3 to 8 amenities
    const amenities = getRandomElements(allAmenities, amenitiesCount);
    
    const price = (Math.floor(Math.random() * 10) + 5) * 1000; // Price between 5000 and 14000
    
    // Use a more reliable image source with better caching
    const imageId = Math.floor(Math.random() * 20) + 1;
    const image = `https://source.unsplash.com/collection/1118894/600x400?sig=${imageId}`; 
    
    pgData.push({
      id: generateId(),
      name: pgName,
      address: `${Math.floor(Math.random() * 100) + 1}, ${area}`,
      city,
      price,
      rating: parseFloat(rating),
      reviewCount: Math.floor(Math.random() * 100) + 5,
      image,
      amenities,
      gender,
      availability,
      totalBeds
    });
  }
  
  return pgData;
};

// Generate a single PG detail with more information
export const generatePgDetail = (id: string) => {
  const pgData = generatePgData(1)[0];
  pgData.id = id;
  
  // Additional details
  return {
    ...pgData,
    description: `Experience comfortable and convenient living at ${pgData.name} located in the heart of ${pgData.city}. Our PG offers modern amenities and a friendly environment perfect for students and working professionals.`,
    rules: [
      'No smoking inside the premises',
      'Guests allowed only in common areas',
      'Maintain silence after 10 PM',
      'Keep the common areas clean',
      'No pets allowed'
    ],
    foodOptions: ['Breakfast', 'Lunch', 'Dinner'],
    securityDeposit: pgData.price,
    nearbyPlaces: [
      { type: 'College', name: `${pgData.city} University`, distance: '1.2 km' },
      { type: 'Hospital', name: 'City Medical Center', distance: '2.5 km' },
      { type: 'Market', name: `${pgData.city} Mall`, distance: '0.8 km' },
      { type: 'Metro Station', name: `${pgData.address.split(',')[1]} Metro`, distance: '1.5 km' }
    ],
    reviews: Array(pgData.reviewCount).fill(null).map((_, i) => ({
      id: generateId(),
      user: `User${i + 1}`,
      rating: Math.floor(Math.random() * 3) + 3, // Rating between 3 and 5
      comment: [
        'Great place to stay. Clean and well maintained.',
        'The staff is very helpful. Food quality is good.',
        'Convenient location with good amenities.',
        'Decent place with good security. Recommended.',
        'Affordable and comfortable. Will stay again.'
      ][Math.floor(Math.random() * 5)],
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    })),
    images: [
      pgData.image,
      `https://source.unsplash.com/featured/600x400?bedroom,${Math.floor(Math.random() * 1000)}`,
      `https://source.unsplash.com/featured/600x400?bathroom,${Math.floor(Math.random() * 1000)}`,
      `https://source.unsplash.com/featured/600x400?kitchen,${Math.floor(Math.random() * 1000)}`,
      `https://source.unsplash.com/featured/600x400?living,${Math.floor(Math.random() * 1000)}`
    ],
    owner: {
      id: generateId(),
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      responseRate: '95%',
      responseTime: 'Within 1 hour'
    }
  };
};

// Function to filter PG data
export const filterPgData = (data: PgCardProps[], filters: any) => {
  return data.filter(pg => {
    // Filter by city
    if (filters.city && filters.city !== 'all' && pg.city !== filters.city) {
      return false;
    }
    
    // Filter by gender
    if (filters.gender && filters.gender !== 'all' && pg.gender !== filters.gender) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && pg.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && pg.price > filters.maxPrice) {
      return false;
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      for (const amenity of filters.amenities) {
        if (!pg.amenities.includes(amenity)) {
          return false;
        }
      }
    }
    
    // Filter by availability
    if (filters.onlyAvailable && pg.availability === 0) {
      return false;
    }
    
    return true;
  });
};

// Function to get bookings for a user
export const getBookingsForUser = (userId: string, role: 'student' | 'owner') => {
  const count = Math.floor(Math.random() * 5) + 1; // 1 to 5 bookings
  const bookings = [];
  
  for (let i = 0; i < count; i++) {
    const pgData = generatePgData(1)[0];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const bookingStatus = ['pending', 'confirmed', 'cancelled', 'completed'][Math.floor(Math.random() * 4)];
    
    bookings.push({
      id: generateId(),
      pgId: pgData.id,
      pgName: pgData.name,
      pgImage: pgData.image,
      pgAddress: `${pgData.address}, ${pgData.city}`,
      bookingDate: date.toISOString().split('T')[0],
      startDate: startDate.toISOString().split('T')[0],
      status: bookingStatus,
      amount: pgData.price,
      paymentStatus: bookingStatus === 'cancelled' ? 'refunded' : bookingStatus === 'pending' ? 'pending' : 'paid',
      userId: role === 'student' ? userId : generateId(),
      userName: role === 'student' ? 'You' : 'John Smith',
      ownerId: role === 'owner' ? userId : pgData.id,
      ownerName: role === 'owner' ? 'You' : 'Jane Doe',
    });
  }
  
  return bookings;
};
