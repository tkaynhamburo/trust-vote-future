import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users } from "lucide-react";
import { BeeIcon } from "@/components/BeeIcon";
import { cn } from "@/lib/utils";

interface VotingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  votes?: number;
}

interface VotingCardProps {
  title: string;
  description: string;
  options: VotingOption[];
  timeRemaining: string;
  totalVotes: number;
  hasVoted?: boolean;
  onVote?: (optionId: string) => void;
}

export const VotingCard = ({
  title,
  description,
  options,
  timeRemaining,
  totalVotes,
  hasVoted = false,
  onVote
}: VotingCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(hasVoted);

  const handleVote = async (optionId: string) => {
    if (voted) return;
    
    setIsVoting(true);
    setSelectedOption(optionId);
    
    // Simulate voting process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVoted(true);
    setIsVoting(false);
    onVote?.(optionId);
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </div>
          {voted && (
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Voted
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{totalVotes.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <BeeIcon className="w-4 h-4" />
            <span>Blockchain Verified</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-md",
                selectedOption === option.id || (voted && option.id === selectedOption)
                  ? "border-primary bg-primary/5 shadow-vote"
                  : "border-border hover:border-primary/50",
                voted && selectedOption !== option.id && "opacity-60"
              )}
              onClick={() => !voted && handleVote(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                
                {selectedOption === option.id && voted && (
                  <div className="animate-vote-confirm">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                )}
                
                {option.votes && (
                  <Badge variant="secondary" className="ml-2">
                    {option.votes.toLocaleString()}
                  </Badge>
                )}
              </div>
              
              {isVoting && selectedOption === option.id && (
                <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <div className="animate-trust-pulse">
                    <BeeIcon className="w-8 h-8" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!voted && (
          <div className="flex justify-center pt-4">
            <p className="text-sm text-muted-foreground text-center">
              🔒 Your vote is encrypted and anonymously recorded on the blockchain
            </p>
          </div>
        )}

        {voted && selectedOption && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <p className="text-success font-medium">
              ✅ Vote successfully recorded on blockchain
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Transaction ID: 0x{Math.random().toString(16).substr(2, 8)}...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};