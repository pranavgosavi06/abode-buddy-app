
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MessageSquare, Calendar, Home, ChevronRight } from "lucide-react";

// Mock data - in a real app, this would come from an API
const bookingsData = [
  {
    id: "bk1",
    pgId: "pg1",
    pgName: "Sunrise PG",
    ownerName: "Raj Kumar",
    location: "Koramangala, Bangalore",
    checkIn: "2023-09-01",
    checkOut: "2023-12-31",
    amount: 45000,
    status: "confirmed",
    roomType: "Single Sharing",
    paymentStatus: "paid",
    createdAt: "2023-08-15",
  },
  {
    id: "bk2",
    pgId: "pg2",
    pgName: "Green Valley PG",
    ownerName: "Priya Singh",
    location: "HSR Layout, Bangalore",
    checkIn: "2023-10-01",
    checkOut: "2024-03-31",
    amount: 60000,
    status: "pending",
    roomType: "Double Sharing",
    paymentStatus: "partially_paid",
    createdAt: "2023-09-20",
  },
  {
    id: "bk3",
    pgId: "pg3",
    pgName: "Blue Moon PG",
    ownerName: "Amit Sharma",
    location: "Indiranagar, Bangalore",
    checkIn: "2023-05-01",
    checkOut: "2023-07-31",
    amount: 30000,
    status: "completed",
    roomType: "Single Sharing",
    paymentStatus: "paid",
    createdAt: "2023-04-10",
  },
];

const StudentBookings = () => {
  const [bookings] = useState(bookingsData);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "partially_paid":
        return <Badge className="bg-blue-500">Partially Paid</Badge>;
      case "unpaid":
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCancelBooking = (id: string) => {
    toast.success(`Booking ${id} cancelled successfully`);
  };

  const handleMessageOwner = (ownerName: string) => {
    toast.success(`Opening chat with ${ownerName}`);
  };

  return (
    <PageContainer className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Past Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking}
                  onCancel={handleCancelBooking}
                  onMessage={handleMessageOwner}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">You don't have any bookings yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="space-y-6">
            {bookings.filter(b => b.status === "confirmed").map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onCancel={handleCancelBooking}
                onMessage={handleMessageOwner}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6">
            {bookings.filter(b => b.status === "pending").map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onCancel={handleCancelBooking}
                onMessage={handleMessageOwner}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {bookings.filter(b => b.status === "completed").map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                onCancel={handleCancelBooking}
                onMessage={handleMessageOwner}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

interface BookingCardProps {
  booking: typeof bookingsData[0];
  onCancel: (id: string) => void;
  onMessage: (ownerName: string) => void;
}

const BookingCard = ({ booking, onCancel, onMessage }: BookingCardProps) => {
  const formattedCheckIn = new Date(booking.checkIn).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const formattedCheckOut = new Date(booking.checkOut).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{booking.pgName}</CardTitle>
            <p className="text-gray-500 text-sm">{booking.location}</p>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(booking.status)}
            {getPaymentStatusBadge(booking.paymentStatus)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium">{formattedCheckIn}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium">{formattedCheckOut}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Home className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Room Type</p>
              <p className="font-medium">{booking.roomType}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between">
            <p className="text-gray-600">Amount</p>
            <p className="font-semibold">₹{booking.amount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">Owner: {booking.ownerName}</p>
        </div>
        <div className="flex gap-2">
          {booking.status !== "completed" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCancel(booking.id)}
              disabled={booking.status === "cancelled"}
            >
              Cancel
            </Button>
          )}
          <Button 
            size="sm"
            onClick={() => onMessage(booking.ownerName)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentBookings;
