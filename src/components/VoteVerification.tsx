import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  Search,
  Clock,
  Lock,
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteRecord {
  id: string;
  electionTitle: string;
  voteOption: string;
  timestamp: string;
  blockNumber: number;
  transactionHash: string;
  status: 'confirmed' | 'pending' | 'failed';
  confirmations: number;
}

const mockVoteRecord: VoteRecord = {
  id: '1',
  electionTitle: 'Community Budget Allocation 2024',
  voteOption: '🚽 Sanitation Infrastructure',
  timestamp: '2024-01-15 14:32:17 UTC',
  blockNumber: 8934567,
  transactionHash: '0x742d35cc6dd37e032b9c8a5fccae8f13c5a8b890c8d18a73e1e2c5a3b8e9f123',
  status: 'confirmed',
  confirmations: 127
};

export const VoteVerification = () => {
  const [searchHash, setSearchHash] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const handleSearch = async () => {
    if (!searchHash.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowRecord(true);
    setIsSearching(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show a quick notification (you could add toast here)
    console.log("Transaction ID copied to clipboard");
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Vote Verification</h2>
        </div>
        <p className="text-muted-foreground">
          Verify your vote was recorded correctly on the blockchain. Your privacy is protected.
        </p>
      </div>

      {/* Search Interface */}
      <Card className="bg-gradient-trust shadow-civic">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Verify Your Vote
          </CardTitle>
          <CardDescription>
            Enter your transaction hash or voter ID to verify your vote was recorded
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter transaction hash (0x...) or voter ID"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchHash.trim()}
              className="gap-2"
            >
              {isSearching ? (
                <div className="animate-trust-pulse">
                  <Shield className="w-4 h-4" />
                </div>
              ) : (
                <Search className="w-4 h-4" />
              )}
              Verify
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Your search is anonymous and no personal data is stored
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Vote Record Display */}
      {showRecord && (
        <Card className="animate-fade-in-up shadow-vote">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Vote Verified
              </CardTitle>
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                <Shield className="w-3 h-3 mr-1" />
                Blockchain Confirmed
              </Badge>
            </div>
            <CardDescription>
              Your vote has been successfully verified on the blockchain
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Election Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-1">Election</h4>
                <p className="text-sm text-muted-foreground">{mockVoteRecord.electionTitle}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-1">Your Vote</h4>
                <p className="text-sm font-medium">{mockVoteRecord.voteOption}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Timestamp</h4>
                  <p className="text-sm text-muted-foreground font-mono">{mockVoteRecord.timestamp}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Blockchain Details
              </h4>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Transaction Hash</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {truncateHash(mockVoteRecord.transactionHash)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(mockVoteRecord.transactionHash)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">Block Number</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      #{mockVoteRecord.blockNumber.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">Confirmations</p>
                    <p className="text-xs text-muted-foreground">
                      {mockVoteRecord.confirmations.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-medium text-primary">Your Vote is Secure</h5>
                  <p className="text-sm text-muted-foreground">
                    Your vote is cryptographically secured and anonymized. While you can verify 
                    your vote was counted, no one can see how you voted or link it back to your identity.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Button */}
      {!showRecord && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchHash(mockVoteRecord.transactionHash);
              setShowRecord(true);
            }}
          >
            View Demo Verification
          </Button>
        </div>
      )}
    </div>
  );
};