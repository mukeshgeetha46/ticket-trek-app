import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  votes: string;
  genre: string;
  language: string;
  onBookNow: () => void;
}

const MovieCard = ({
  title,
  poster,
  rating,
  votes,
  genre,
  language,
  onBookNow,
}: MovieCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-[1.02]">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
          <Heart className="w-4 h-4 text-white" />
        </button>

        {/* Book Now Button - appears on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={onBookNow}
            className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
            <span className="font-semibold text-foreground">{rating}/10</span>
          </div>
          <span className="text-muted-foreground text-sm">{votes} Votes</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Genre and Language */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {genre}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {language}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;