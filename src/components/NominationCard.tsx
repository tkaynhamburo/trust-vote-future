import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, Users, Award, Star, Vote } from "lucide-react";
import { BeeIcon } from "@/components/BeeIcon";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  name: string;
  position: string;
  party: string;
  experience: string;
  manifesto: string;
  avatar: string;
  votes?: number;
  incumbent?: boolean;
}

interface NominationCardProps {
  title: string;
  description: string;
  position: string;
  candidates: Candidate[];
  timeRemaining: string;
  totalVotes: number;
  hasVoted?: boolean;
  onVote?: (candidateId: string) => void;
}

export const NominationCard = ({
  title,
  description,
  position,
  candidates,
  timeRemaining,
  totalVotes,
  hasVoted = false,
  onVote
}: NominationCardProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(hasVoted);

  const handleVote = async (candidateId: string) => {
    if (voted) return;
    
    setIsVoting(true);
    setSelectedCandidate(candidateId);
    
    // Simulate voting process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setVoted(true);
    setIsVoting(false);
    onVote?.(candidateId);
  };

  return (
    <Card className="w-full max-w-4xl bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
            <Badge variant="outline" className="w-fit">
              Position: {position}
            </Badge>
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
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={cn(
                "relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-md",
                selectedCandidate === candidate.id || (voted && candidate.id === selectedCandidate)
                  ? "border-primary bg-primary/5 shadow-vote"
                  : "border-border hover:border-primary/50",
                voted && selectedCandidate !== candidate.id && "opacity-60"
              )}
              onClick={() => !voted && handleVote(candidate.id)}
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-foreground flex items-center gap-2">
                        {candidate.name}
                        {candidate.incumbent && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Incumbent
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-primary font-medium">{candidate.party}</p>
                    </div>
                    
                    {selectedCandidate === candidate.id && voted && (
                      <div className="animate-vote-confirm">
                        <CheckCircle className="w-6 h-6 text-success" />
                      </div>
                    )}
                    
                    {candidate.votes && (
                      <Badge variant="secondary" className="ml-2">
                        <Vote className="w-3 h-3 mr-1" />
                        {candidate.votes.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    <strong>Experience:</strong> {candidate.experience}
                  </p>
                  
                  <p className="text-sm text-foreground">
                    <strong>Key Manifesto:</strong> {candidate.manifesto}
                  </p>
                </div>
              </div>
              
              {isVoting && selectedCandidate === candidate.id && (
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

        {voted && selectedCandidate && (
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