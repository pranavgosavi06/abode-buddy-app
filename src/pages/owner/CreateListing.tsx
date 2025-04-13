
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  MapPin, 
  Home, 
  User, 
  BedDouble, 
  Building, 
  Banknote, 
  UploadCloud 
} from "lucide-react";

const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "ac", label: "Air Conditioning" },
  { id: "tv", label: "TV" },
  { id: "fridge", label: "Refrigerator" },
  { id: "washing_machine", label: "Washing Machine" },
  { id: "geyser", label: "Geyser" },
  { id: "power_backup", label: "Power Backup" },
  { id: "food", label: "Food" },
  { id: "parking", label: "Parking" },
  { id: "security", label: "Security" },
  { id: "cleaning", label: "Cleaning" },
];

const rules = [
  { id: "no_smoking", label: "No Smoking" },
  { id: "no_alcohol", label: "No Alcohol" },
  { id: "no_guests", label: "No Overnight Guests" },
  { id: "no_pets", label: "No Pets" },
  { id: "curfew", label: "Curfew Time" },
];

const CreateListing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    propertyType: "pg",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gender: "all",
    totalRooms: "",
    occupancy: "single",
    rentSingle: "",
    rentDouble: "",
    rentTriple: "",
    description: "",
    depositAmount: "",
    noticePeriod: "1",
    selectedAmenities: [] as string[],
    selectedRules: [] as string[],
    curfewTime: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedAmenities: [...prev.selectedAmenities, amenityId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedAmenities: prev.selectedAmenities.filter((id) => id !== amenityId),
      }));
    }
  };

  const handleRulesChange = (ruleId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedRules: [...prev.selectedRules, ruleId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedRules: prev.selectedRules.filter((id) => id !== ruleId),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to save the listing
      // For demo, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Listing created successfully!");
      navigate("/owner/listings");
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Create New PG Listing</h1>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Building className="mr-2 h-5 w-5" /> 
                  Basic Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">PG Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Sunrise PG"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select 
                      value={formData.propertyType}
                      onValueChange={(value) => handleSelectChange("propertyType", value)}
                      required
                    >
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pg">PG (Paying Guest)</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="coliving">Co-living Space</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <MapPin className="mr-2 h-5 w-5" /> 
                  Location
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g., Bangalore"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g., Karnataka"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g., 560001"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* PG Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Home className="mr-2 h-5 w-5" /> 
                  PG Details
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">PG For</Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Boys</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Girls</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="cursor-pointer">Co-ed</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      value={formData.totalRooms}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="occupancy">Room Types Available</Label>
                    <Select 
                      value={formData.occupancy}
                      onValueChange={(value) => handleSelectChange("occupancy", value)}
                      required
                    >
                      <SelectTrigger id="occupancy">
                        <SelectValue placeholder="Select room types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Occupancy Only</SelectItem>
                        <SelectItem value="double">Double Sharing Only</SelectItem>
                        <SelectItem value="triple">Triple Sharing Only</SelectItem>
                        <SelectItem value="multiple">Multiple Options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {(formData.occupancy === "single" || formData.occupancy === "multiple") && (
                    <div className="space-y-2">
                      <Label htmlFor="rentSingle">Single Room Rent (₹/month)</Label>
                      <Input
                        id="rentSingle"
                        name="rentSingle"
                        type="number"
                        value={formData.rentSingle}
                        onChange={handleChange}
                        min="1000"
                        required={formData.occupancy === "single" || formData.occupancy === "multiple"}
                      />
                    </div>
                  )}
                  
                  {(formData.occupancy === "double" || formData.occupancy === "multiple") && (
                    <div className="space-y-2">
                      <Label htmlFor="rentDouble">Double Sharing Rent (₹/month)</Label>
                      <Input
                        id="rentDouble"
                        name="rentDouble"
                        type="number"
                        value={formData.rentDouble}
                        onChange={handleChange}
                        min="1000"
                        required={formData.occupancy === "double" || formData.occupancy === "multiple"}
                      />
                    </div>
                  )}
                  
                  {(formData.occupancy === "triple" || formData.occupancy === "multiple") && (
                    <div className="space-y-2">
                      <Label htmlFor="rentTriple">Triple Sharing Rent (₹/month)</Label>
                      <Input
                        id="rentTriple"
                        name="rentTriple"
                        type="number"
                        value={formData.rentTriple}
                        onChange={handleChange}
                        min="1000"
                        required={formData.occupancy === "triple" || formData.occupancy === "multiple"}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your PG, its surroundings, nearby landmarks, etc."
                    rows={4}
                    required
                  />
                </div>
              </div>
              
              {/* Payment Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Banknote className="mr-2 h-5 w-5" /> 
                  Payment Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Security Deposit (₹)</Label>
                    <Input
                      id="depositAmount"
                      name="depositAmount"
                      type="number"
                      value={formData.depositAmount}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="noticePeriod">Notice Period</Label>
                    <Select 
                      value={formData.noticePeriod}
                      onValueChange={(value) => handleSelectChange("noticePeriod", value)}
                      required
                    >
                      <SelectTrigger id="noticePeriod">
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Notice Period</SelectItem>
                        <SelectItem value="1">1 Month</SelectItem>
                        <SelectItem value="2">2 Months</SelectItem>
                        <SelectItem value="3">3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Amenities & Rules */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Amenities & Rules</h2>
                
                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenities.map((amenity) => (
                      <div className="flex items-center space-x-2" key={amenity.id}>
                        <Checkbox 
                          id={`amenity-${amenity.id}`}
                          checked={formData.selectedAmenities.includes(amenity.id)}
                          onCheckedChange={(checked) => {
                            handleAmenitiesChange(amenity.id, checked === true);
                          }}
                        />
                        <Label 
                          htmlFor={`amenity-${amenity.id}`}
                          className="cursor-pointer"
                        >
                          {amenity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Rules</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {rules.map((rule) => (
                      <div className="flex items-center space-x-2" key={rule.id}>
                        <Checkbox 
                          id={`rule-${rule.id}`}
                          checked={formData.selectedRules.includes(rule.id)}
                          onCheckedChange={(checked) => {
                            handleRulesChange(rule.id, checked === true);
                          }}
                        />
                        <Label 
                          htmlFor={`rule-${rule.id}`}
                          className="cursor-pointer"
                        >
                          {rule.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {formData.selectedRules.includes("curfew") && (
                    <div className="mt-2">
                      <Label htmlFor="curfewTime">Curfew Time</Label>
                      <Input
                        id="curfewTime"
                        name="curfewTime"
                        type="time"
                        value={formData.curfewTime}
                        onChange={handleChange}
                        required={formData.selectedRules.includes("curfew")}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Photos */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <UploadCloud className="mr-2 h-5 w-5" /> 
                  Upload Photos
                </h2>
                
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <UploadCloud className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">Upload PG photos (max 10 photos)</p>
                  <div className="flex justify-center">
                    <Label 
                      htmlFor="images" 
                      className="bg-pgblue-500 text-white px-4 py-2 rounded hover:bg-pgblue-600 cursor-pointer"
                    >
                      Select Files
                    </Label>
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">{formData.images.length} file(s) selected</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate("/owner/listings")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Listing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CreateListing;
