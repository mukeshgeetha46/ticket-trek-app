import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "occupied";
  price: number;
}

interface SeatSelectionProps {
  movieTitle: string;
  theaterName: string;
  showtime: string;
  onProceedToPayment: (selectedSeats: Seat[], total: number) => void;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  
  rows.forEach((row, rowIndex) => {
    for (let num = 1; num <= 20; num++) {
      let type: "regular" | "premium" | "occupied" = "regular";
      let price = 200;
      
      // Premium seats in middle rows (D-G)
      if (rowIndex >= 3 && rowIndex <= 6) {
        type = "premium";
        price = 350;
      }
      
      // Random occupied seats
      if (Math.random() < 0.15) {
        type = "occupied";
      }
      
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        type,
        price,
      });
    }
  });
  
  return seats;
};

const SeatSelection = ({ movieTitle, theaterName, showtime, onProceedToPayment }: SeatSelectionProps) => {
  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.type === "occupied") return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length >= 10) return prev; // Max 10 seats
        return [...prev, seat];
      }
    });
  };

  const getSeatClassName = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (seat.type === "occupied") {
      return "bg-seat-occupied cursor-not-allowed";
    }
    if (isSelected) {
      return "bg-seat-selected shadow-glow cursor-pointer";
    }
    if (seat.type === "premium") {
      return "bg-seat-premium hover:bg-cinema-gold cursor-pointer hover:shadow-seat";
    }
    return "bg-seat-available hover:bg-accent cursor-pointer hover:shadow-seat";
  };

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const regularCount = selectedSeats.filter(s => s.type === "regular").length;
  const premiumCount = selectedSeats.filter(s => s.type === "premium").length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{movieTitle}</h1>
          <p className="text-muted-foreground">{theaterName} • {showtime}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="xl:col-span-3">
            {/* Screen */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-transparent via-primary to-transparent h-1 rounded-full mx-auto mb-2"></div>
              <p className="text-muted-foreground text-sm">SCREEN THIS WAY</p>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-seat-available rounded-sm"></div>
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-seat-premium rounded-sm"></div>
                <span className="text-sm text-muted-foreground">Premium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-seat-selected rounded-sm"></div>
                <span className="text-sm text-muted-foreground">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-seat-occupied rounded-sm"></div>
                <span className="text-sm text-muted-foreground">Occupied</span>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="bg-card rounded-lg p-6">
              {Array.from(new Set(seats.map(s => s.row))).map(row => (
                <div key={row} className="flex items-center justify-center mb-3">
                  <div className="w-8 text-center text-muted-foreground font-semibold mr-4">
                    {row}
                  </div>
                  <div className="flex space-x-2">
                    {seats
                      .filter(seat => seat.row === row)
                      .map(seat => (
                        <button
                          key={seat.id}
                          className={`w-6 h-6 rounded-sm transition-all duration-200 text-xs font-medium ${getSeatClassName(seat)}`}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.type === "occupied"}
                        >
                          {seat.number}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-card sticky top-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Booking Summary</h3>
              
              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {regularCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Regular ({regularCount})</span>
                        <span className="text-foreground">₹{regularCount * 200}</span>
                      </div>
                    )}
                    {premiumCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premium ({premiumCount})</span>
                        <span className="text-foreground">₹{premiumCount * 350}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map(seat => (
                        <Badge key={seat.id} variant="secondary" className="text-xs">
                          {seat.id}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    onClick={() => onProceedToPayment(selectedSeats, total)}
                  >
                    Proceed to Payment
                  </Button>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Please select your seats</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;