import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Shield, User, Bell, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zu", name: "isiZulu", flag: "🇿🇦" },
  { code: "st", name: "Sesotho", flag: "🇿🇦" },
  { code: "xh", name: "isiXhosa", flag: "🇿🇦" },
];

interface CivicHeaderProps {
  user?: {
    name: string;
    verified: boolean;
    avatar?: string;
  };
  notifications?: number;
}

export const CivicHeader = ({ user, notifications = 0 }: CivicHeaderProps) => {
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-civic">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-civic rounded-lg flex items-center justify-center shadow-trust">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CivicLink</h1>
              <p className="text-xs text-muted-foreground">Power to Every Voice</p>
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {languages.find(l => l.code === currentLang)?.flag}
                    <span className="ml-1 hidden md:inline">
                      {languages.find(l => l.code === currentLang)?.name}
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      currentLang === lang.code && "bg-primary/10 text-primary"
                    )}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center"
                >
                  {notifications > 9 ? "9+" : notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      <div className="flex items-center gap-1">
                        {user.verified && (
                          <>
                            <Shield className="w-3 h-3 text-success" />
                            <span className="text-xs text-success">Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="civic" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};