import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import { BeeIcon } from "@/components/BeeIcon";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: { username: string; isAdmin: boolean; municipality: string; ward: string }) => void;
}

export const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [username, setUsername] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Western Cape Municipalities
  const westernCapeMunicipalities = [
    "City of Cape Town", "Stellenbosch", "Drakenstein", "Witzenberg", 
    "Breede Valley", "Langeberg", "Swellendam", "Theewaterskloof",
    "Overstrand", "Cape Agulhas", "Swartland", "Saldanha Bay",
    "Bergrivier", "Cederberg", "Matzikama", "Bitou", "Knysna",
    "George", "Hessequa", "Oudtshoorn", "Kannaland", "Laingsburg",
    "Prince Albert", "Beaufort West", "Central Karoo"
  ];

  // Cape Town Areas/Wards
  const capeAreasList = [
    "Ward 1 - City Bowl, Gardens", "Ward 2 - Sea Point, Bantry Bay", 
    "Ward 3 - Green Point, De Waterkant", "Ward 4 - Woodstock, Salt River",
    "Ward 5 - Observatory, Mowbray", "Ward 6 - Rondebosch, Newlands",
    "Ward 7 - Claremont, Kenilworth", "Ward 8 - Wynberg, Plumstead",
    "Ward 9 - Constantia, Bishopscourt", "Ward 10 - Hout Bay",
    "Ward 11 - Camps Bay, Clifton", "Ward 12 - Atlantic Seaboard",
    "Ward 13 - Bellville South", "Ward 14 - Parow, Elsies River",
    "Ward 15 - Goodwood, Elsies River", "Ward 16 - Thornton, Bonteheuwel",
    "Ward 17 - Bishop Lavis, Vasco", "Ward 18 - Belhar, Delft",
    "Ward 19 - Delft South", "Ward 20 - Eerste River, Khayelitsha",
    "Ward 21 - Nyanga, Crossroads", "Ward 22 - Gugulethu",
    "Ward 23 - Langa, Bonteheuwel", "Ward 24 - Manenberg, Hanover Park",
    "Ward 25 - Mitchells Plain", "Ward 26 - Khayelitsha Site B",
    "Ward 27 - Khayelitsha Site C", "Ward 28 - Harare, Khayelitsha",
    "Ward 29 - Mfuleni", "Ward 30 - Kraaifontein",
    "Ward 31 - Blue Downs, Scottsdene", "Ward 32 - Brackenfell",
    "Ward 33 - Durbanville", "Ward 34 - Bellville, Tygerberg",
    "Ward 35 - Kuils River", "Ward 36 - Strand, Somerset West",
    "Ward 37 - Gordon's Bay, Strand", "Ward 38 - Stellenbosch Rural",
    "Ward 39 - Atlantis", "Ward 40 - Melkbosstrand",
    "Ward 41 - Table View, Blouberg", "Ward 42 - Milnerton",
    "Ward 43 - Century City, Goodwood", "Ward 44 - Pinelands, Langa"
  ];

  const handleLogin = async () => {
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive"
      });
      return;
    }

    if (!municipality) {
      toast({
        title: "Municipality required",
        description: "Please select your municipality",
        variant: "destructive"
      });
      return;
    }

    if (!ward) {
      toast({
        title: "Area selection required",
        description: "Please select your area/ward",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate auth delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAdmin = username.toLowerCase() === "tkay";
    const user = { 
      username: username.trim(), 
      isAdmin, 
      municipality,
      ward
    };
    
    // Store in localStorage
    localStorage.setItem("civiclink_user", JSON.stringify(user));
    
    toast({
      title: isAdmin ? "Admin Access Granted" : "Welcome to CivicLink",
      description: isAdmin 
        ? `Administrative access for ${municipality}` 
        : `Ready to vote for ${ward}`,
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
          <DialogTitle className="text-2xl">Join CivicLink Western Cape</DialogTitle>
          <p className="text-muted-foreground">
            Democratic participation for Western Cape residents • Powered by <span className="text-primary font-semibold">Ethereum</span>
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
              className="bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipality">Municipality</Label>
            <select
              id="municipality"
              value={municipality}
              onChange={(e) => {
                setMunicipality(e.target.value);
                setWard(""); // Reset ward when municipality changes
              }}
              className="w-full p-3 rounded-md border border-input bg-white/50 text-foreground"
              required
            >
              <option value="">Select your municipality...</option>
              {westernCapeMunicipalities.map((muni) => (
                <option key={muni} value={muni}>
                  {muni}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ward">Your Area/Ward</Label>
            <select
              id="ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="w-full p-3 rounded-md border border-input bg-white/50 text-foreground"
              required
              disabled={!municipality}
            >
              <option value="">
                {municipality === "City of Cape Town" 
                  ? "Select your Cape Town area/ward..." 
                  : municipality 
                    ? `Select your ${municipality} area/ward...`
                    : "First select your municipality"}
              </option>
              {municipality === "City of Cape Town" && capeAreasList.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
              {municipality && municipality !== "City of Cape Town" && (
                <>
                  <option value={`${municipality} Ward 1`}>{municipality} Ward 1</option>
                  <option value={`${municipality} Ward 2`}>{municipality} Ward 2</option>
                  <option value={`${municipality} Ward 3`}>{municipality} Ward 3</option>
                  <option value={`${municipality} Ward 4`}>{municipality} Ward 4</option>
                  <option value={`${municipality} Ward 5`}>{municipality} Ward 5</option>
                </>
              )}
            </select>
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
                <BeeIcon className="w-4 h-4" />
                Enter CivicLink
              </>
            )}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground space-y-1">
            <p>🔒 Secured by Ethereum blockchain</p>
            <p>✨ Admin access: Use username "tkay"</p>
            <p>🏛️ Western Cape democratic participation</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};