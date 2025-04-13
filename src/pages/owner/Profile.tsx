
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Building, FileText } from "lucide-react";

const OwnerProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    businessName: user?.businessName || "",
    address: user?.address || "",
    description: user?.description || "",
    gstNumber: user?.gstNumber || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, this would call an API
      await updateUserProfile(formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <PageContainer className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Owner Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-center">Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-xl">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500 mb-1">{user?.email}</p>
              <p className="text-gray-500 font-medium mb-4">{formData.businessName || "PG Owner"}</p>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Profile" : "Business Information"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <Mail className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={true}
                        className="border-0 bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <Phone className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <Building className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Business Address</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <MapPin className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <div className="flex items-center border rounded-md">
                      <div className="px-3 py-2 bg-gray-50 border-r">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="border-0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Describe your PG business..."
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default OwnerProfile;
