
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PgCardProps } from "@/components/pg/PgCard";
import { generatePgData, getBookingsForUser } from "@/data/pgData";
import {
  Building,
  Plus,
  Users,
  DollarSign,
  Home,
  Calendar,
  ChevronRight,
  BarChart,
  Clock,
} from "lucide-react";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [myListings, setMyListings] = useState<PgCardProps[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    occupiedBeds: 0,
    totalBeds: 0,
    revenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== 'owner') {
      navigate("/student/dashboard");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls
        const listings = generatePgData(4);
        const bookings = getBookingsForUser(user?.id || "", 'owner');
        
        // Calculate stats
        const totalListings = listings.length;
        const totalBeds = listings.reduce((acc, pg) => acc + pg.totalBeds, 0);
        const occupiedBeds = listings.reduce((acc, pg) => acc + (pg.totalBeds - pg.availability), 0);
        const revenue = bookings
          .filter(booking => booking.paymentStatus === 'paid')
          .reduce((acc, booking) => acc + booking.amount, 0);
        
        setMyListings(listings);
        setRecentBookings(bookings.slice(0, 3));
        setStats({
          totalListings,
          occupiedBeds,
          totalBeds,
          revenue,
        });
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

  const getOccupancyRate = () => {
    if (stats.totalBeds === 0) return 0;
    return Math.round((stats.occupiedBeds / stats.totalBeds) * 100);
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Manage your properties and bookings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/owner/create-listing")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <Building className="h-6 w-6 text-pgblue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Listings</p>
                  <h4 className="text-2xl font-bold">{stats.totalListings}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                  <h4 className="text-2xl font-bold">{getOccupancyRate()}%</h4>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <Home className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Beds</p>
                  <h4 className="text-2xl font-bold">
                    {stats.occupiedBeds}/{stats.totalBeds}
                  </h4>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <h4 className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
              <CardDescription>Manage your property bookings</CardDescription>
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
                        <p className="text-sm text-gray-500 truncate">
                          Booked by: {booking.userName}
                        </p>
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
                    onClick={() => navigate("/owner/bookings")}
                  >
                    View All Bookings
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="h-10 w-10 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-600">No bookings yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
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
                      <Building className="h-4 w-4 text-pgblue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">New listing created</span>
                    </p>
                    <p className="text-xs text-gray-500">You added a new PG listing.</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">New booking request</span>
                    </p>
                    <p className="text-xs text-gray-500">A student sent a new booking request.</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Payment received</span>
                    </p>
                    <p className="text-xs text-gray-500">You received a payment for booking #1234.</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Listings</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/owner/listings")}
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <p>Loading listings...</p>
            </div>
          ) : myListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myListings.map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-md transition" onClick={() => navigate(`/owner/edit-listing/${listing.id}`)}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={listing.image} 
                      alt={listing.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.name}</h3>
                    <p className="text-sm text-gray-500">{listing.address}, {listing.city}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span>
                          {listing.totalBeds - listing.availability}/{listing.totalBeds} occupied
                        </span>
                      </div>
                      <span className="font-semibold text-pgblue-600">₹{listing.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Building className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-4 text-gray-700 font-medium">No listings yet</p>
              <p className="text-gray-500 mb-6">Start adding your PG accommodations</p>
              <Button 
                onClick={() => navigate("/owner/create-listing")}
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default OwnerDashboard;
