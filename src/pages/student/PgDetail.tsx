
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatePgDetail } from "@/data/pgData";
import { toast } from "sonner";
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Phone, 
  Wifi, 
  Tv, 
  Coffee, 
  Car, 
  ShieldCheck, 
  ChevronRight, 
  Building,
  Clock,
  User,
  Mail,
  Check,
} from "lucide-react";

const PgDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [pgData, setPgData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    if (!id) {
      navigate("/student/search");
      return;
    }

    const loadPgData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const pgDetail = generatePgDetail(id);
        setPgData(pgDetail);
        setImagesLoaded(new Array(pgDetail.images.length).fill(false));
      } catch (error) {
        console.error("Error loading PG details:", error);
        toast.error("Failed to load PG details");
      } finally {
        setIsLoading(false);
      }
    };

    loadPgData();
  }, [id, navigate]);

  const handleImageError = (index: number) => {
    if (pgData && pgData.images) {
      const newImages = [...pgData.images];
      newImages[index] = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
      
      const updatedPgData = { ...pgData, images: newImages };
      setPgData(updatedPgData);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this PG");
      navigate("/login");
      return;
    }

    // In a real app, you would redirect to a booking page
    // or open a booking modal
    toast.success("Booking initiated!");
    // For demo purposes, we're just showing a toast
  };

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      toast.error("Please login to contact the owner");
      navigate("/login");
      return;
    }

    // In a real app, you would redirect to a chat page
    navigate("/messages");
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p>Loading PG details...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!pgData) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p>PG not found</p>
            <Button 
              onClick={() => navigate("/student/search")} 
              className="mt-4"
            >
              Back to Search
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Wifi':
        return <Wifi className="h-4 w-4" />;
      case 'TV':
        return <Tv className="h-4 w-4" />;
      case 'Food':
        return <Coffee className="h-4 w-4" />;
      case 'Parking':
        return <Car className="h-4 w-4" />;
      case 'Security':
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return <Check className="h-4 w-4" />;
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PG Name and Location */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pgData.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{pgData.address}, {pgData.city}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={handleContactOwner}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            </div>
          </div>
        </div>

        {/* PG Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="rounded-lg overflow-hidden h-[400px]">
                <img 
                  src={pgData.images[currentImage]} 
                  alt={pgData.name} 
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(currentImage)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {pgData.images.slice(1, 5).map((image: string, index: number) => (
                <div 
                  key={index} 
                  className={`overflow-hidden rounded-lg cursor-pointer h-[120px] md:h-[92px] ${
                    currentImage === index + 1 ? 'ring-2 ring-pgblue-500' : ''
                  }`}
                  onClick={() => setCurrentImage(index + 1)}
                >
                  <img 
                    src={image} 
                    alt={`${pgData.name} - ${index + 1}`} 
                    className="w-full h-full object-cover hover:opacity-90 transition"
                    onError={() => handleImageError(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-600">{pgData.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">PG Rules</h2>
                  <ul className="space-y-2">
                    {pgData.rules.map((rule: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Food</h2>
                  <div className="flex flex-wrap gap-2">
                    {pgData.foodOptions.map((option: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        <Coffee className="h-3 w-3 mr-1" />
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(showAllAmenities ? pgData.amenities : pgData.amenities.slice(0, 6)).map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-pgblue-100 flex items-center justify-center mr-3">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  {pgData.amenities.length > 6 && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowAllAmenities(!showAllAmenities)}
                      className="mt-4"
                    >
                      {showAllAmenities ? 'Show Less' : `Show All (${pgData.amenities.length})`}
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{pgData.rating}</span>
                      <span className="text-gray-500 ml-1">({pgData.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {(showAllReviews ? pgData.reviews : pgData.reviews.slice(0, 3)).map((review: any, index: number) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <User className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{review.rating}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  {pgData.reviews.length > 3 && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="mt-2"
                    >
                      {showAllReviews ? 'Show Less' : `Show All Reviews (${pgData.reviews.length})`}
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Location</h2>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-12 w-12 text-gray-400" />
                    <p className="ml-2 text-gray-600">Map view not available in demo</p>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">Nearby Places</h3>
                  <div className="space-y-3">
                    {pgData.nearbyPlaces.map((place: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <Building className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{place.name}</p>
                            <p className="text-sm text-gray-500">{place.type}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{place.distance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking and Owner Info */}
          <div>
            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    ₹{pgData.price}
                    <span className="text-gray-500 text-base font-normal">/month</span>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{pgData.rating} · {pgData.reviewCount} reviews</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-medium">₹{pgData.securityDeposit}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <span>
                      {pgData.availability} of {pgData.totalBeds} beds available
                    </span>
                  </div>
                  
                  <div>
                    <Badge className={`${
                      pgData.gender === 'male' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                        : pgData.gender === 'female' 
                        ? 'bg-pink-100 text-pink-800 hover:bg-pink-100' 
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                    }`}>
                      {pgData.gender === 'male' ? 'Boys PG' : pgData.gender === 'female' ? 'Girls PG' : 'Co-ed PG'}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleBookNow}
                    disabled={pgData.availability === 0}
                  >
                    {pgData.availability === 0 ? 'Fully Booked' : 'Book Now'}
                  </Button>
                </CardContent>
              </Card>
              
              {/* Owner Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Contact the Owner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{pgData.owner.name}</p>
                      <p className="text-sm text-gray-500">PG Owner</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{pgData.owner.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{pgData.owner.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Response time: {pgData.owner.responseTime}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleContactOwner}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Owner
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PgDetailPage;
