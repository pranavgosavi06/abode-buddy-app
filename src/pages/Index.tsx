
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/PageContainer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Home, Key, MessageSquare, Star, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(user?.role === 'owner' ? '/owner/dashboard' : '/student/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="py-12 md:py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find Your Perfect <span className="text-gradient">PG Accommodation</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with the best PG accommodations tailored for students. Easy booking, verified listings, and a seamless experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted} 
                  className="font-semibold"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/student/search')} 
                  className="font-semibold"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search PGs
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Modern PG accommodation" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AbodeBuddy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make finding and booking PG accommodations simple, secure, and stress-free.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find the perfect PG with advanced filters for location, price, amenities, and more.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                Every PG is verified to ensure you get exactly what you see on our platform.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <Key className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
              <p className="text-gray-600">
                Book your accommodation instantly with our secure payment system.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Chat directly with PG owners to get all your questions answered before booking.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from students who have stayed at the PG before.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border feature-card">
              <div className="w-12 h-12 bg-pgblue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pgblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Your security is our priority with secure payments and data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pgblue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Are you a PG owner?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            List your property on AbodeBuddy and connect with thousands of students looking for accommodations like yours.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')} 
            className="font-semibold"
          >
            List Your Property
          </Button>
        </div>
      </section>
    </PageContainer>
  );
};

export default Index;
