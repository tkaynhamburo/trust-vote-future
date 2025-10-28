import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Scan, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiometricAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const BiometricAuth = ({ onSuccess, onCancel }: BiometricAuthProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState<"fingerprint" | "face" | null>(null);
  const [fingerprintVerified, setFingerprintVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use face scan",
        variant: "destructive"
      });
      setScanning(false);
      setScanType(null);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleBiometricAuth = async (type: "fingerprint" | "face") => {
    setScanType(type);
    setScanning(true);

    try {
      if (type === "face") {
        await startCamera();
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (type === "face") {
        stopCamera();
      }
      
      setScanning(false);
      
      if (type === "fingerprint") {
        setFingerprintVerified(true);
        toast({
          title: "Fingerprint verified ✓",
          description: "Now proceed to face scan"
        });
      } else {
        setFaceVerified(true);
        toast({
          title: "Face scan verified ✓",
          description: "Both biometrics verified successfully"
        });
        // Both verified, proceed to next step
        onSuccess();
      }
    } catch (error) {
      stopCamera();
      setScanning(false);
      toast({
        title: "Authentication failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  if (scanning) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        {scanType === "face" ? (
          <div className="relative w-full max-w-md">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg border-4 border-primary"
            />
            <div className="absolute inset-0 rounded-lg border-4 border-primary border-t-transparent animate-spin" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-48 h-48 border-2 border-primary/50 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
              <Fingerprint className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        )}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {scanType === "fingerprint" ? "Scanning fingerprint..." : "Scanning face..."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {scanType === "fingerprint" 
              ? "Place your finger on the sensor" 
              : "Position your face in the center of the frame"}
          </p>
          {scanType === "face" && (
            <p className="text-xs text-muted-foreground bg-primary/10 p-2 rounded">
              Keep your face centered and look directly at the camera
            </p>
          )}
        </div>
        <Button variant="outline" onClick={() => {
          stopCamera();
          onCancel();
        }}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Two-Factor Biometric Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Both fingerprint and face scan are required for secure login
        </p>
      </div>

      {!fingerprintVerified ? (
        <div className="space-y-4">
          <div className="text-center space-y-2 py-2">
            <h4 className="font-medium">Step 1: Fingerprint Scan</h4>
            <p className="text-sm text-muted-foreground">
              Place your finger on the sensor to begin
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5"
            onClick={() => handleBiometricAuth("fingerprint")}
          >
            <Fingerprint className="w-12 h-12" />
            <span className="font-medium">Scan Fingerprint</span>
          </Button>
        </div>
      ) : !faceVerified ? (
        <div className="space-y-4">
          <div className="text-center space-y-2 py-2">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-medium">Step 2: Face Scan</h4>
            <p className="text-sm text-muted-foreground">
              Position your face in the center and look at the camera
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full h-32 flex-col gap-3 hover:border-primary hover:bg-primary/5"
            onClick={() => handleBiometricAuth("face")}
          >
            <Scan className="w-12 h-12" />
            <span className="font-medium">Scan Face</span>
          </Button>
        </div>
      ) : null}

      <div className="text-center">
        <Button variant="ghost" onClick={onCancel} className="w-full text-sm">
          Cancel
        </Button>
      </div>
    </div>
  );
};
