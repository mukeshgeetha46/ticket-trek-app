import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Share2, Calendar, MapPin, Clock } from "lucide-react";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "occupied";
  price: number;
}

interface BookingConfirmationProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  selectedSeats: Seat[];
  total: number;
  bookingId: string;
  onBackToHome: () => void;
}

const BookingConfirmation = ({
  movieTitle,
  theaterName,
  showtime,
  selectedSeats,
  total,
  bookingId,
  onBackToHome,
}: BookingConfirmationProps) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your tickets have been booked successfully</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-card rounded-lg p-6 shadow-card mb-6">
          {/* Booking ID */}
          <div className="text-center mb-6">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Booking ID: {bookingId}
            </Badge>
          </div>

          {/* Movie Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{movieTitle}</h2>
              <p className="text-muted-foreground">{theaterName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{currentDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">{showtime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Screen</p>
                  <p className="font-semibold">Screen 1</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Seat Details */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Seat Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Selected Seats</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSeats.map(seat => (
                    <Badge 
                      key={seat.id} 
                      variant={seat.type === "premium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {seat.id}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Seats</p>
                <p className="font-semibold">{selectedSeats.length}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2">
              {selectedSeats.filter(s => s.type === "regular").length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Regular ({selectedSeats.filter(s => s.type === "regular").length})
                  </span>
                  <span>₹{selectedSeats.filter(s => s.type === "regular").length * 200}</span>
                </div>
              )}
              {selectedSeats.filter(s => s.type === "premium").length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Premium ({selectedSeats.filter(s => s.type === "premium").length})
                  </span>
                  <span>₹{selectedSeats.filter(s => s.type === "premium").length * 350}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span>₹30</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-primary">₹{total + 30}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button variant="outline" className="flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download Ticket
          </Button>
          
          <Button variant="outline" className="flex items-center justify-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Ticket
          </Button>
          
          <Button 
            onClick={onBackToHome}
            className="bg-gradient-primary hover:bg-primary-hover"
          >
            Back to Home
          </Button>
        </div>

        {/* Important Notes */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-2">Important Notes</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Please arrive at least 15 minutes before the show time</li>
            <li>• Carry a valid ID proof for verification</li>
            <li>• Outside food and beverages are not allowed</li>
            <li>• Mobile phones must be switched off during the movie</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;