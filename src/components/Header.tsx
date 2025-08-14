import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">BookMyShow</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          {/* Location and User */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              Mumbai
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <div className="flex space-x-8">
            <button className="text-foreground hover:text-primary transition-colors font-medium">
              Movies
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Stream
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Events
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Plays
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Sports
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;