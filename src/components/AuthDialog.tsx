import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Shield } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: { username: string; isAdmin: boolean }) => void;
}

export const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate auth delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAdmin = username.toLowerCase() === "tkay";
    const user = { username: username.trim(), isAdmin };
    
    // Store in localStorage
    localStorage.setItem("civiclink_user", JSON.stringify(user));
    
    toast({
      title: isAdmin ? "Admin Access Granted" : "Welcome to CivicLink",
      description: isAdmin 
        ? "You have administrative privileges" 
        : "Ready to participate in democracy",
    });
    
    onAuthSuccess(user);
    onOpenChange(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-trust border-primary/20">
        <DialogHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Join CivicLink</DialogTitle>
          <p className="text-muted-foreground">
            Powered by <span className="text-primary font-semibold">Ethereum</span> blockchain technology
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              className="bg-white/50"
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full gap-2 shadow-ethereum"
            size="lg"
          >
            {loading ? (
              "Connecting..."
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Enter CivicLink
              </>
            )}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground space-y-1">
            <p>🔒 Secured by Ethereum blockchain</p>
            <p>✨ Admin access: Use username "tkay"</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};