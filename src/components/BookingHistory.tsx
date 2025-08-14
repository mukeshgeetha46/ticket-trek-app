import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BookingHistoryProps {
  onBack: () => void;
}

interface BookingData {
  id: string;
  movieTitle: string;
  poster: string;
  theater: string;
  location: string;
  date: string;
  time: string;
  seats: string[];
  total: number;
  status: "confirmed" | "cancelled" | "completed";
  bookingDate: string;
}

const dummyBookings: BookingData[] = [
  {
    id: "BMS1734234567890",
    movieTitle: "Avengers: Infinity",
    poster: "/src/assets/movie-avengers-infinity.jpg",
    theater: "PVR Phoenix Mills",
    location: "Lower Parel, Mumbai",
    date: "Dec 12, 2024",
    time: "7:00 PM",
    seats: ["F12", "F13"],
    total: 680,
    status: "confirmed",
    bookingDate: "Dec 10, 2024"
  },
  {
    id: "BMS1734134567890",
    movieTitle: "Inception Dreams",
    poster: "/src/assets/movie-inception-dreams.jpg",
    theater: "INOX Megaplex",
    location: "Inorbit Mall, Mumbai",
    date: "Dec 8, 2024",
    time: "9:30 PM",
    seats: ["H8", "H9", "H10"],
    total: 870,
    status: "completed",
    bookingDate: "Dec 6, 2024"
  },
  {
    id: "BMS1733234567890",
    movieTitle: "The Crown Legacy",
    poster: "/src/assets/movie-crown-legacy.jpg",
    theater: "Cinepolis Fun Cinemas",
    location: "Andheri West, Mumbai",
    date: "Nov 28, 2024",
    time: "4:15 PM",
    seats: ["D5", "D6"],
    total: 560,
    status: "completed",
    bookingDate: "Nov 25, 2024"
  },
  {
    id: "BMS1732234567890",
    movieTitle: "Space Odyssey 2024",
    poster: "/src/assets/movie-space-odyssey.jpg",
    theater: "PVR Icon",
    location: "Infiniti Mall, Mumbai",
    date: "Nov 15, 2024",
    time: "6:45 PM",
    seats: ["G15"],
    total: 320,
    status: "cancelled",
    bookingDate: "Nov 12, 2024"
  }
];

const BookingHistory = ({ onBack }: BookingHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
            </div>
            <p className="text-muted-foreground">
              {dummyBookings.length} booking{dummyBookings.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {dummyBookings.map((booking) => (
            <Card key={booking.id} className="bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <img
                      src={booking.poster}
                      alt={booking.movieTitle}
                      className="w-20 h-28 object-cover rounded-md"
                    />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {booking.movieTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {booking.theater}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.location}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Booking ID</p>
                    <p className="text-sm text-muted-foreground font-mono">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Seats</p>
                    <div className="flex items-center space-x-2">
                      <Ticket className="w-4 h-4 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        {booking.seats.join(", ")} ({booking.seats.length} seat{booking.seats.length !== 1 ? 's' : ''})
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-foreground">₹{booking.total}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Booked on {booking.bookingDate}
                  </p>
                  {booking.status === "confirmed" && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Ticket
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                  {booking.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Ticket
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {dummyBookings.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">
              Start booking your favorite movies to see them here
            </p>
            <Button onClick={onBack}>
              Browse Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;