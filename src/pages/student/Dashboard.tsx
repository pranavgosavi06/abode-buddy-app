
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PgCardProps } from "@/components/pg/PgCard";
import { generatePgData, getBookingsForUser } from "@/data/pgData";
import { Building, Search, Calendar, MapPin, Clock } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [featuredPGs, setFeaturedPGs] = useState<PgCardProps[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== 'student') {
      navigate("/owner/dashboard");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls
        const pgs = generatePgData(3);
        const bookings = getBookingsForUser(user?.id || "", 'student');
        
        setFeaturedPGs(pgs);
        setRecentBookings(bookings.slice(0, 3));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return '';
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Manage your accommodations and bookings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/student/search")}>
              <Search className="h-4 w-4 mr-2" />
              Search PGs
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
              <CardDescription>Your recent PG bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <p>Loading bookings...</p>
                </div>
              ) : recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={booking.pgImage} 
                          alt={booking.pgName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{booking.pgName}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{booking.pgAddress}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{booking.startDate}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => navigate("/student/bookings")}
                  >
                    View All Bookings
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Building className="h-10 w-10 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-600">No bookings yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => navigate("/student/search")}
                  >
                    Find PGs
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Featured PGs</CardTitle>
              <CardDescription>Recommended accommodations for you</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                  <p>Loading recommendations...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {featuredPGs.map((pg) => (
                    <div 
                      key={pg.id} 
                      className="flex items-start space-x-3 border-b pb-3 last:border-b-0 cursor-pointer"
                      onClick={() => navigate(`/pg/${pg.id}`)}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={pg.image} 
                          alt={pg.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{pg.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{pg.address}, {pg.city}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-pgblue-500 font-semibold">₹{pg.price}/month</span>
                          <Badge className={`${
                            pg.gender === 'male' 
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                              : pg.gender === 'female' 
                              ? 'bg-pink-100 text-pink-800 hover:bg-pink-100' 
                              : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                          }`}>
                            {pg.gender === 'male' ? 'Boys' : pg.gender === 'female' ? 'Girls' : 'Co-ed'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => navigate("/student/search")}
                  >
                    View More PGs
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
              <CardDescription>Recent activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-pgblue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-pgblue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Account created</span>
                    </p>
                    <p className="text-xs text-gray-500">Welcome to AbodeBuddy!</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Search className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">New PGs available</span>
                    </p>
                    <p className="text-xs text-gray-500">10 new PGs added in your area</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Building className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Special offer</span>
                    </p>
                    <p className="text-xs text-gray-500">Get 10% off on your first booking</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentDashboard;
