
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PgCardProps } from "@/components/pg/PgCard";
import PgCard from "@/components/pg/PgCard";
import { generatePgData, filterPgData } from "@/data/pgData";
import { Search as SearchIcon, Filter, X } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [pgData, setPgData] = useState<PgCardProps[]>([]);
  const [filteredPgData, setFilteredPgData] = useState<PgCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "all",
    gender: "all",
    minPrice: 0,
    maxPrice: 20000,
    amenities: [] as string[],
    onlyAvailable: false,
  });

  // List of amenities for filter
  const amenitiesList = [
    'Wifi', 'AC', 'Food', 'Parking', 'Security', 'TV', 'Washing Machine'
  ];

  // List of cities for filter
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'];

  useEffect(() => {
    // For this demo, we're not enforcing authentication for the search page
    // to allow guests to browse PGs
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to get PG data
        const pgs = generatePgData(20);
        setPgData(pgs);
        setFilteredPgData(pgs);
      } catch (error) {
        console.error("Error loading PG data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...pgData];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pg => 
        pg.name.toLowerCase().includes(query) || 
        pg.address.toLowerCase().includes(query) || 
        pg.city.toLowerCase().includes(query)
      );
    }
    
    // Apply other filters
    filtered = filterPgData(filtered, filters);
    
    setFilteredPgData(filtered);
  }, [searchQuery, filters, pgData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return { 
          ...prev, 
          amenities: amenities.filter(a => a !== amenity) 
        };
      } else {
        return { 
          ...prev, 
          amenities: [...amenities, amenity] 
        };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      city: "all",
      gender: "all",
      minPrice: 0,
      maxPrice: 20000,
      amenities: [],
      onlyAvailable: false,
    });
    setSearchQuery("");
  };

  const FiltersSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearFilters}
          className="w-full flex items-center justify-center"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      </div>
      
      <div>
        <Label htmlFor="city" className="text-sm font-medium">City</Label>
        <Select
          value={filters.city}
          onValueChange={(value) => handleFilterChange("city", value)}
        >
          <SelectTrigger id="city" className="w-full mt-1">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="gender" className="text-sm font-medium">Gender Preference</Label>
        <Select
          value={filters.gender}
          onValueChange={(value) => handleFilterChange("gender", value)}
        >
          <SelectTrigger id="gender" className="w-full mt-1">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Boys</SelectItem>
            <SelectItem value="female">Girls</SelectItem>
            <SelectItem value="any">Co-ed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Price Range</Label>
          <span className="text-sm text-gray-500">
            ₹{filters.minPrice} - ₹{filters.maxPrice}
          </span>
        </div>
        <Slider
          defaultValue={[filters.minPrice, filters.maxPrice]}
          max={20000}
          step={500}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={(values) => {
            handleFilterChange("minPrice", values[0]);
            handleFilterChange("maxPrice", values[1]);
          }}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Amenities</Label>
        <div className="space-y-2 mt-2">
          {amenitiesList.map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox 
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label 
                htmlFor={amenity} 
                className="text-sm font-normal cursor-pointer"
              >
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="onlyAvailable"
          checked={filters.onlyAvailable}
          onCheckedChange={(checked) => 
            handleFilterChange("onlyAvailable", checked)
          }
        />
        <Label 
          htmlFor="onlyAvailable" 
          className="text-sm font-normal cursor-pointer"
        >
          Show only available PGs
        </Label>
      </div>
    </div>
  );

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect PG</h1>
            <p className="text-gray-600">Browse through our verified listings</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden mr-2"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="relative flex-1 md:w-80">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, location..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FiltersSection />
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
              <div className="relative bg-white w-80 max-w-[80%] h-full overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FiltersSection />
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* PG Listings */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading PG listings...</p>
              </div>
            ) : filteredPgData.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredPgData.length} result{filteredPgData.length !== 1 && 's'}
                  </p>
                  <Select
                    defaultValue="relevance"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPgData.map((pg) => (
                    <PgCard key={pg.id} {...pg} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Filter className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter parameters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
