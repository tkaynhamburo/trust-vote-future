import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiometricAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const BiometricAuth = ({ onSuccess, onCancel }: BiometricAuthProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState<"fingerprint" | "face" | null>(null);
  const { toast } = useToast();

  const handleBiometricAuth = async (type: "fingerprint" | "face") => {
    setScanType(type);
    setScanning(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setScanning(false);
      toast({
        title: "Authentication successful",
        description: `${type === "fingerprint" ? "Fingerprint" : "Face"} verified successfully`
      });
      onSuccess();
    } catch (error) {
      setScanning(false);
      toast({
        title: "Authentication failed",
        description: "Please try again or use an alternative method",
        variant: "destructive"
      });
    }
  };

  if (scanning) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
            {scanType === "fingerprint" ? (
              <Fingerprint className="w-16 h-16 text-primary animate-pulse" />
            ) : (
              <Scan className="w-16 h-16 text-primary animate-pulse" />
            )}
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {scanType === "fingerprint" ? "Scanning fingerprint..." : "Scanning face..."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {scanType === "fingerprint" 
              ? "Place your finger on the sensor" 
              : "Position your face in the frame"}
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Biometric Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred authentication method
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5"
          onClick={() => handleBiometricAuth("fingerprint")}
        >
          <Fingerprint className="w-12 h-12" />
          <span className="font-medium">Fingerprint</span>
        </Button>

        <Button
          variant="outline"
          className="h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5"
          onClick={() => handleBiometricAuth("face")}
        >
          <Scan className="w-12 h-12" />
          <span className="font-medium">Face Scan</span>
        </Button>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={onCancel} className="w-full">
          Use Voter ID instead
        </Button>
      </div>
    </div>
  );
};
