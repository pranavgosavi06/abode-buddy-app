
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

export interface PgCardProps {
  id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  gender: 'male' | 'female' | 'any';
  availability: number;
  totalBeds: number;
}

const PgCard = ({
  id,
  name,
  address,
  city,
  price,
  rating,
  reviewCount,
  image,
  amenities,
  gender,
  availability,
  totalBeds
}: PgCardProps) => {
  return (
    <Link to={`/pg/${id}`}>
      <Card className="overflow-hidden h-full pg-card">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-48"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "https://source.unsplash.com/featured/600x400?apartment,interior";
              target.onerror = null; // Prevent infinite loop if fallback also fails
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${
              gender === 'male' 
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                : gender === 'female' 
                ? 'bg-pink-100 text-pink-800 hover:bg-pink-100' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
            }`}>
              {gender === 'male' ? 'Boys' : gender === 'female' ? 'Girls' : 'Co-ed'}
            </Badge>
          </div>
          {availability === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-bold text-xl">FULLY BOOKED</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating} ({reviewCount})</span>
            </div>
          </div>
          <div className="flex items-start mt-2">
            <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <span className="text-gray-500 text-sm">{address}, {city}</span>
          </div>
          
          <div className="flex items-center mt-3 text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {availability} of {totalBeds} beds available
            </span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {amenity === 'Wifi' && <Wifi className="h-3 w-3 mr-1" />}
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <div>
              <span className="font-bold text-lg">₹{price}</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
            <Badge className="bg-pgblue-500 hover:bg-pgblue-600">View Details</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PgCard;
