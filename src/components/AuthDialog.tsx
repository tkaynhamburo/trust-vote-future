import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BeeIcon } from "@/components/BeeIcon";
import { BiometricAuth } from "@/components/BiometricAuth";
import { Copy, Check } from "lucide-react";

interface User {
  username: string;
  isAdmin: boolean;
  municipality: string;
  ward: string;
  idNumber: string;
  voterID: string;
}

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: User) => void;
}

// Western Cape Municipalities
const westernCapeMunicipalities = [
  "City of Cape Town", "Stellenbosch", "Drakenstein", "Witzenberg", 
  "Breede Valley", "Langeberg", "Swellendam", "Theewaterskloof",
  "Overstrand", "Cape Agulhas", "Swartland", "Saldanha Bay",
  "Bergrivier", "Cederberg", "Matzikama", "Bitou", "Knysna",
  "George", "Hessequa", "Oudtshoorn", "Kannaland", "Laingsburg",
  "Prince Albert", "Beaufort West", "Central Karoo"
];

// Generate ward options based on municipality
const getWardOptions = (municipality: string) => {
  if (municipality === "City of Cape Town") {
    return [
      "Ward 1 - City Bowl", "Ward 2 - Sea Point", "Ward 3 - Green Point",
      "Ward 11 - Camps Bay", "Ward 23 - Langa", "Ward 25 - Mitchells Plain",
      "Ward 26 - Khayelitsha East", "Ward 27 - Khayelitsha West",
      "Ward 54 - Bonteheuwel", "Ward 77 - Gugulethu"
    ];
  } else {
    return [`Ward 1 - ${municipality} Central`, `Ward 2 - ${municipality} East`, `Ward 3 - ${municipality} West`];
  }
};

// Generate voter ID
const generateVoterID = (idNumber: string, municipality: string) => {
  const prefix = municipality === "City of Cape Town" ? "CPT" : "WC";
  const hash = idNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return `${prefix}${hash.toString().padStart(6, '0')}`;
};

export const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [voterID, setVoterID] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [generatedVoterID, setGeneratedVoterID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedVoterID, setCopiedVoterID] = useState(false);
  const { toast } = useToast();

  const validateIDNumber = (id: string) => {
    const num = parseInt(id);
    return num >= 111 && num <= 100000;
  };

  const handleRegister = async () => {
    if (!username.trim() || !idNumber || !municipality || !ward) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!validateIDNumber(idNumber)) {
      toast({
        title: "Invalid ID Number",
        description: "ID number must be between 111 and 100000",
        variant: "destructive"
      });
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("myvote_users") || "[]");
    if (existingUsers.some((u: any) => u.idNumber === idNumber)) {
      toast({
        title: "User already exists",
        description: "This ID number is already registered. Please login instead.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newVoterID = generateVoterID(idNumber, municipality);
    setGeneratedVoterID(newVoterID);
    
    const user: User = {
      username: username.trim(),
      isAdmin: username.toLowerCase() === "admin",
      municipality,
      ward,
      idNumber,
      voterID: newVoterID
    };

    // Store user data
    existingUsers.push(user);
    localStorage.setItem("myvote_users", JSON.stringify(existingUsers));
    localStorage.setItem("myvote_user", JSON.stringify(user));
    
    setIsLoading(false);
    
    toast({
      title: "Registration successful!",
      description: `Welcome ${user.username}! Your Voter ID has been generated.`
    });
  };

  const handleLogin = async () => {
    if (!biometricVerified) {
      toast({
        title: "Biometric verification required",
        description: "Please complete biometric authentication first",
        variant: "destructive"
      });
      return;
    }

    if (!voterID.trim()) {
      toast({
        title: "Missing Voter ID",
        description: "Please enter your Voter ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    const existingUsers = JSON.parse(localStorage.getItem("myvote_users") || "[]");
    const user = existingUsers.find((u: any) => u.voterID === voterID);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!user) {
      toast({
        title: "Invalid Voter ID",
        description: "Voter ID not found. Please check your ID or register.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    localStorage.setItem("myvote_user", JSON.stringify(user));
    
    setIsLoading(false);
    onAuthSuccess(user);
    onOpenChange(false);
    
    toast({
      title: "Login successful",
      description: `Welcome back ${user.username}! Two-factor authentication verified.`
    });
  };

  const copyVoterID = () => {
    navigator.clipboard.writeText(generatedVoterID);
    setCopiedVoterID(true);
    setTimeout(() => setCopiedVoterID(false), 2000);
    toast({
      title: "Voter ID copied!",
      description: "Save this ID to login in the future"
    });
  };

  const proceedAfterRegistration = () => {
    const existingUsers = JSON.parse(localStorage.getItem("myvote_users") || "[]");
    const user = existingUsers.find((u: any) => u.voterID === generatedVoterID);
    if (user) {
      onAuthSuccess(user);
      onOpenChange(false);
    }
  };

  if (generatedVoterID) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto animate-trust-pulse">
              <BeeIcon className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl">Registration Complete!</DialogTitle>
            <DialogDescription>
              Your Voter ID has been generated. Save this ID to login in the future.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
              <Label className="text-sm font-medium">Your Voter ID</Label>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-lg font-mono bg-background p-2 rounded border">
                  {generatedVoterID}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyVoterID}
                  className="shrink-0"
                >
                  {copiedVoterID ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground bg-amber-50 p-3 rounded border border-amber-200">
              <strong>Important:</strong> Save this Voter ID safely. You will need it to login and access your voting rights.
            </div>
            
            <Button onClick={proceedAfterRegistration} className="w-full" size="lg">
              Continue to MyVote SA
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto animate-trust-pulse">
            <BeeIcon className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Welcome to MyVote SA</DialogTitle>
          <DialogDescription>
            Secure blockchain voting for South African communities.
            Join the democratic process in the Western Cape.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "register")} className="pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            {!biometricVerified ? (
              <>
                <div className="text-center space-y-2 py-4">
                  <h3 className="font-semibold">Step 1: Biometric Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete biometric authentication to proceed
                  </p>
                </div>
                <BiometricAuth
                  onSuccess={() => {
                    setBiometricVerified(true);
                    toast({
                      title: "Biometric verified",
                      description: "Now enter your Voter ID to complete login"
                    });
                  }}
                  onCancel={() => {
                    toast({
                      title: "Login cancelled",
                      description: "Biometric authentication is required to login",
                      variant: "destructive"
                    });
                  }}
                />
              </>
            ) : (
              <>
              <div className="text-center space-y-2 py-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold">Step 2: Voter ID Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Biometric verified ✓ Now enter your Voter ID
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voterID">Voter ID</Label>
                <Input
                  id="voterID"
                  placeholder="Enter your Voter ID (e.g., CPT123456)"
                  value={voterID}
                  onChange={(e) => setVoterID(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                onClick={handleLogin} 
                className="w-full" 
                size="lg"
                disabled={isLoading || !voterID.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-trust-pulse">
                      <BeeIcon className="w-4 h-4" />
                    </div>
                    Verifying...
                  </div>
                ) : (
                  "Complete Login"
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setBiometricVerified(false)}
              >
                ← Back to biometric scan
              </Button>
            </>
            )}
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                type="number"
                placeholder="Enter ID (111 - 100000)"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled={isLoading}
                min="111"
                max="100000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality</Label>
              <Select value={municipality} onValueChange={setMunicipality} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your municipality" />
                </SelectTrigger>
                <SelectContent>
                  {westernCapeMunicipalities.map((muni) => (
                    <SelectItem key={muni} value={muni}>
                      {muni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {municipality && (
              <div className="space-y-2">
                <Label htmlFor="ward">Ward</Label>
                <Select value={ward} onValueChange={setWard} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {getWardOptions(municipality).map((wardOption) => (
                      <SelectItem key={wardOption} value={wardOption}>
                        {wardOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Button 
              onClick={handleRegister} 
              className="w-full" 
              size="lg"
              disabled={isLoading || !username.trim() || !idNumber || !municipality || !ward}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-trust-pulse">
                    <BeeIcon className="w-4 h-4" />
                  </div>
                  Registering...
                </div>
              ) : (
                "Register for MyVote SA"
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};