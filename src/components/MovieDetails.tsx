import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Share, Heart, Clock, Calendar, Star, Users } from "lucide-react";

interface MovieDetailsProps {
  movie: {
    id: string;
    title: string;
    poster: string;
    rating: number;
    votes: string;
    genre: string;
    language: string;
    duration?: string;
    releaseDate?: string;
    certification?: string;
    description?: string;
  };
  onBack: () => void;
  onBookTickets: () => void;
}

const MovieDetails = ({ movie, onBack, onBookTickets }: MovieDetailsProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const interestedCount = "1.2M";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Movie Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Play Trailer Button */}
              <button className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4" />
                Trailers (12)
              </button>
              
              <div className="absolute bottom-16 left-4 text-white text-sm">
                In cinemas
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {movie.title}
                </h1>
                
                {/* Interest Counter */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground font-medium">{interestedCount} are interested</span>
                  </div>
                  <Button
                    variant={isInterested ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsInterested(!isInterested)}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isInterested ? 'fill-current' : ''}`} />
                    {isInterested ? "Interested" : "I'm interested"}
                  </Button>
                </div>

                {/* Movie Formats */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-medium">2D</Badge>
                    <Badge variant="secondary" className="font-medium">ICE</Badge>
                    <Badge variant="secondary" className="font-medium">IMAX 2D</Badge>
                    <Badge variant="secondary" className="font-medium">4DX</Badge>
                    <Badge variant="secondary" className="font-medium">DOLBY CINEMA 2D</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Hindi</Badge>
                    <Badge variant="outline">Telugu</Badge>
                    <Badge variant="outline">Tamil</Badge>
                  </div>
                </div>

                {/* Movie Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>2h 53m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{movie.genre}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">UA16+</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>14 Aug, 2025</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-cinema-gold text-cinema-gold" />
                    <span className="text-lg font-semibold text-foreground">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{movie.votes} Votes</span>
                  </div>
                </div>

                {/* Book Tickets Button */}
                <Button
                  onClick={onBookTickets}
                  className="w-full lg:w-auto bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg px-8 py-3 rounded-lg"
                >
                  Book tickets
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* About the Movie */}
        <div className="mt-12 lg:mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">About the movie</h2>
          <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Years ago Agent Kabir went rogue. Became India's greatest villain ever. But this time, as he descends further into the deepest 
              shadows India sends its deadliest, most lethal agent after him.
            </p>
            <p>
              A Special Units Officer who is more than Kabir's equal! Absolutely Nuclear! Agent Vikram.
            </p>
            <p>
              A relentless Terminator driven by his own demons, determined to put a bullet into Kabir's skull. A brutal Cat versus Rottweiler 
              game begins as the two face off - The entire world is their brutal bloody battleground.
            </p>
            <p>
              The choices ahead of them are impossible. The price to be paid is ultimate. This is a War with spectacular action and heart-
              wrenching emotion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;