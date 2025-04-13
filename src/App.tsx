
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/Dashboard";
import StudentSearch from "./pages/student/Search";
import StudentBookings from "./pages/student/Bookings";
import StudentProfile from "./pages/student/Profile";
import PgDetail from "./pages/student/PgDetail";
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerListings from "./pages/owner/Listings";
import OwnerBookings from "./pages/owner/Bookings";
import OwnerProfile from "./pages/owner/Profile";
import CreateListing from "./pages/owner/CreateListing";
import EditListing from "./pages/owner/EditListing";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/search" element={<StudentSearch />} />
            <Route path="/student/bookings" element={<StudentBookings />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/pg/:id" element={<PgDetail />} />
            
            {/* Owner Routes */}
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/listings" element={<OwnerListings />} />
            <Route path="/owner/bookings" element={<OwnerBookings />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
            <Route path="/owner/create-listing" element={<CreateListing />} />
            <Route path="/owner/edit-listing/:id" element={<EditListing />} />
            
            {/* Common Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
