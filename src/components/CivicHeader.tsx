import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Menu, Shield, LogOut, Crown } from "lucide-react";

interface CivicHeaderProps {
  user: {
    username: string;
    isAdmin: boolean;
  } | null;
  notifications: number;
  onLogout: () => void;
}

export const CivicHeader = ({ user, notifications, onLogout }: CivicHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-ethereum shadow-ethereum border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold">CivicLink</h1>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  Powered by 
                  <span className="font-semibold text-accent">Ethereum</span>
                  🤝
                </p>
              </div>
            </div>
          </div>

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white font-semibold">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white text-sm">
                  <p className="font-medium flex items-center gap-1">
                    {user.username}
                    {user.isAdmin && <Crown className="w-3 h-3 text-accent" />}
                  </p>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-secondary" />
                    <span className="text-xs text-white/80">
                      {user.isAdmin ? "Administrator" : "Verified Voter"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="text-white/80 text-sm">
              Please log in to continue
            </div>
          )}
        </div>
      </div>
    </header>
  );
};