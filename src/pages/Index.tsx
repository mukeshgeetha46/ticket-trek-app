import { useState } from "react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import MovieDetails from "@/components/MovieDetails";
import TheaterSelection from "@/components/TheaterSelection";
import SeatSelection from "@/components/SeatSelection";
import BookingConfirmation from "@/components/BookingConfirmation";

// Import movie posters
import inceptionPoster from "@/assets/movie-inception-dreams.jpg";
import avengersPoster from "@/assets/movie-avengers-infinity.jpg";
import crownPoster from "@/assets/movie-crown-legacy.jpg";
import spacePoster from "@/assets/movie-space-odyssey.jpg";

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  votes: string;
  genre: string;
  language: string;
}

interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  showtimes: string[];
  facilities: string[];
}

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "occupied";
  price: number;
}

type BookingStep = "movies" | "details" | "theaters" | "seats" | "confirmation";

const movies: Movie[] = [
  {
    id: "1",
    title: "Inception Dreams",
    poster: inceptionPoster,
    rating: 8.9,
    votes: "245K",
    genre: "Sci-Fi/Thriller",
    language: "English"
  },
  {
    id: "2",
    title: "Avengers: Infinity",
    poster: avengersPoster,
    rating: 9.1,
    votes: "892K",
    genre: "Action/Adventure",
    language: "English"
  },
  {
    id: "3",
    title: "The Crown Legacy",
    poster: crownPoster,
    rating: 8.5,
    votes: "156K",
    genre: "Drama/History",
    language: "English"
  },
  {
    id: "4",
    title: "Space Odyssey 2024",
    poster: spacePoster,
    rating: 8.7,
    votes: "198K",
    genre: "Sci-Fi/Adventure",
    language: "English"
  },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("movies");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [bookingId] = useState<string>(`BMS${Date.now()}`);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentStep("details");
  };

  const handleBookTickets = () => {
    setCurrentStep("theaters");
  };

  const handleBackToMovies = () => {
    setCurrentStep("movies");
    setSelectedMovie(null);
  };

  const handleShowtimeSelect = (theater: Theater, showtime: string) => {
    setSelectedTheater(theater);
    setSelectedShowtime(showtime);
    setCurrentStep("seats");
  };

  const handleProceedToPayment = (seats: Seat[], totalAmount: number) => {
    setSelectedSeats(seats);
    setTotal(totalAmount);
    setCurrentStep("confirmation");
  };

  const handleBackToHome = () => {
    setCurrentStep("movies");
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedShowtime("");
    setSelectedSeats([]);
    setTotal(0);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "movies":
        return (
          <>
            <Header />
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="bg-gradient-hero rounded-2xl p-8 mb-8 text-center">
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Book Your Movie Tickets
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Experience cinema like never before
                  </p>
                </div>

                {/* Movies Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Now Showing</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster}
                        rating={movie.rating}
                        votes={movie.votes}
                        genre={movie.genre}
                        language={movie.language}
                        onBookNow={() => handleMovieSelect(movie)}
                      />
                    ))}
                  </div>
                </div>

                {/* Features Section */}
                <div className="bg-card rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Why Choose BookMyShow?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎬</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Latest Movies</h3>
                      <p className="text-muted-foreground">Watch the newest releases in premium theaters</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💺</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Best Seats</h3>
                      <p className="text-muted-foreground">Choose from regular to premium seating options</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Instant Booking</h3>
                      <p className="text-muted-foreground">Quick and secure ticket booking experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "details":
        return selectedMovie ? (
          <MovieDetails
            movie={selectedMovie}
            onBack={handleBackToMovies}
            onBookTickets={handleBookTickets}
          />
        ) : null;

      case "theaters":
        return selectedMovie ? (
          <TheaterSelection
            movieTitle={selectedMovie.title}
            onShowtimeSelect={handleShowtimeSelect}
          />
        ) : null;

      case "seats":
        return selectedMovie && selectedTheater ? (
          <SeatSelection
            movieTitle={selectedMovie.title}
            theaterName={selectedTheater.name}
            showtime={selectedShowtime}
            onProceedToPayment={handleProceedToPayment}
          />
        ) : null;

      case "confirmation":
        return selectedMovie && selectedTheater ? (
          <BookingConfirmation
            movieTitle={selectedMovie.title}
            theaterName={selectedTheater.name}
            showtime={selectedShowtime}
            selectedSeats={selectedSeats}
            total={total}
            bookingId={bookingId}
            onBackToHome={handleBackToHome}
          />
        ) : null;

      default:
        return null;
    }
  };

  return renderCurrentStep();
};

export default Index;
