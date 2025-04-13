
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { PgCardProps } from "@/components/pg/PgCard";
import { generatePgData } from "@/data/pgData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Users, 
  Building
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const OwnerListings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listings, setListings] = useState<PgCardProps[]>([]);
  const [filteredListings, setFilteredListings] = useState<PgCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

    const loadListings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const data = generatePgData(8);
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [isAuthenticated, navigate, user]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = listings.filter(
        listing =>
          listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredListings(filtered);
    } else {
      setFilteredListings(listings);
    }
  }, [searchQuery, listings]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteListing = (id: string) => {
    // In a real app, this would make an API call to delete the listing
    toast.success("Listing deleted successfully");
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600">Manage your PG accommodations</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search listings..."
                className="pl-10 w-full md:w-64"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button onClick={() => navigate("/owner/create-listing")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading listings...</p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={listing.image} 
                    alt={listing.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-white bg-opacity-80 hover:bg-white">
                          <MoreVertical className="h-4 w-4 text-gray-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/pg/${listing.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/owner/edit-listing/${listing.id}`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500" 
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={`${
                      listing.gender === 'male' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                        : listing.gender === 'female' 
                        ? 'bg-pink-100 text-pink-800 hover:bg-pink-100' 
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                    }`}>
                      {listing.gender === 'male' ? 'Boys' : listing.gender === 'female' ? 'Girls' : 'Co-ed'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="pt-4 pb-0">
                  <h3 className="font-semibold text-lg">{listing.name}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm truncate">{listing.address}, {listing.city}</span>
                  </div>
                  
                  <div className="mt-3 flex justify-between">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {listing.totalBeds - listing.availability}/{listing.totalBeds} occupied
                      </span>
                    </div>
                    <span className="font-medium text-pgblue-600">₹{listing.price}/mo</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-4 pb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`/pg/${listing.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/owner/edit-listing/${listing.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <Building className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-700 font-medium">
              {searchQuery ? 'No listings found for your search' : 'No listings yet'}
            </p>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Start adding your PG accommodations'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => navigate("/owner/create-listing")}
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            )}
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default OwnerListings;
