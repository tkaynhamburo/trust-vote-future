import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Link2, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Block {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
  nonce: number;
}

const BlockchainShowcase = () => {
  const [blockchain, setBlockchain] = useState<Block[]>([
    {
      index: 0,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      data: "Genesis Block - Blockchain Initialized",
      previousHash: "0",
      hash: "000000abc123def456",
      nonce: 12345
    },
    {
      index: 1,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      data: "Vote: Municipal Election - Candidate A",
      previousHash: "000000abc123def456",
      hash: "000001def789abc012",
      nonce: 67890
    }
  ]);

  const [tamperedBlock, setTamperedBlock] = useState<number | null>(null);

  const generateHash = (input: string): string => {
    const hash = Math.abs(input.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0));
    return `00000${hash.toString(16).padStart(10, '0')}`;
  };

  const addBlock = () => {
    const lastBlock = blockchain[blockchain.length - 1];
    const newBlock: Block = {
      index: lastBlock.index + 1,
      timestamp: new Date().toISOString(),
      data: `Vote: ${['Municipal', 'Provincial', 'National'][Math.floor(Math.random() * 3)]} Election - Candidate ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
      previousHash: lastBlock.hash,
      hash: generateHash(`${lastBlock.hash}${Date.now()}`),
      nonce: Math.floor(Math.random() * 100000)
    };
    
    setBlockchain([...blockchain, newBlock]);
    toast.success("New block added to the chain!", {
      description: "Vote recorded and secured on the blockchain"
    });
  };

  const tamperWithBlock = (index: number) => {
    const newBlockchain = [...blockchain];
    newBlockchain[index].data = "TAMPERED DATA - Invalid Vote";
    setBlockchain(newBlockchain);
    setTamperedBlock(index);
    toast.error("Block has been tampered with!", {
      description: "The chain integrity is now broken"
    });
  };

  const verifyChain = () => {
    for (let i = 1; i < blockchain.length; i++) {
      if (blockchain[i].previousHash !== blockchain[i - 1].hash) {
        toast.error("Chain is invalid!", {
          description: `Block ${i} has an invalid previous hash`
        });
        return;
      }
    }
    
    if (tamperedBlock !== null) {
      toast.warning("Chain structure is valid but data integrity compromised", {
        description: `Block ${tamperedBlock} contains tampered data`
      });
    } else {
      toast.success("Chain is valid!", {
        description: "All blocks are properly linked and secure"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Blockchain Technology Showcase
          </CardTitle>
          <CardDescription>
            Interactive demonstration of how our voting system uses blockchain for transparency and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Concepts */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Immutability</h3>
              <p className="text-sm text-muted-foreground">
                Once recorded, votes cannot be altered or deleted
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Link2 className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Linked Chain</h3>
              <p className="text-sm text-muted-foreground">
                Each block links to the previous one, forming an unbreakable chain
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                All transactions are verifiable while maintaining voter anonymity
              </p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={addBlock} className="gap-2">
              <Check className="h-4 w-4" />
              Add New Vote Block
            </Button>
            <Button onClick={verifyChain} variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Verify Chain Integrity
            </Button>
          </div>

          {/* Blockchain Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Live Blockchain</h3>
            <div className="space-y-3">
              {blockchain.map((block, index) => (
                <Card 
                  key={block.index} 
                  className={`${
                    tamperedBlock === index 
                      ? 'border-destructive bg-destructive/5' 
                      : index === blockchain.length - 1 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* Block Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "secondary" : "default"}>
                            Block #{block.index}
                          </Badge>
                          {index === blockchain.length - 1 && (
                            <Badge variant="outline" className="bg-primary/10">Latest</Badge>
                          )}
                          {tamperedBlock === index && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Tampered
                            </Badge>
                          )}
                        </div>
                        {index > 0 && tamperedBlock !== index && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => tamperWithBlock(index)}
                          >
                            Simulate Tampering
                          </Button>
                        )}
                      </div>

                      {/* Block Content */}
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span className="font-mono">{new Date(block.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data:</span>
                          <span className={`font-medium ${tamperedBlock === index ? 'text-destructive' : ''}`}>
                            {block.data}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hash:</span>
                          <span className="font-mono text-xs">{block.hash}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Previous Hash:</span>
                          <span className="font-mono text-xs">{block.previousHash}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nonce:</span>
                          <span className="font-mono">{block.nonce}</span>
                        </div>
                      </div>

                      {/* Chain Link Indicator */}
                      {index < blockchain.length - 1 && (
                        <div className="flex items-center justify-center pt-2">
                          <div className={`flex items-center gap-2 ${
                            blockchain[index + 1].previousHash === block.hash 
                              ? 'text-primary' 
                              : 'text-destructive'
                          }`}>
                            <Link2 className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              {blockchain[index + 1].previousHash === block.hash 
                                ? 'Linked to next block' 
                                : 'Link broken!'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Educational Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">How It Works:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Each vote is recorded as a new block containing the transaction data</li>
                <li>• Every block contains a hash of the previous block, creating an unbreakable chain</li>
                <li>• Any attempt to tamper with a block breaks the chain link, making fraud immediately detectable</li>
                <li>• All votes are cryptographically secured while maintaining voter anonymity</li>
                <li>• Try adding new blocks or simulating tampering to see how the system responds</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainShowcase;
