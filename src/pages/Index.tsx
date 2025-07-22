import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CivicHeader } from "@/components/CivicHeader";
import { VotingCard } from "@/components/VotingCard";
import { EngagementHub } from "@/components/EngagementHub";
import { VoteVerification } from "@/components/VoteVerification";
import { 
  Vote, 
  Shield, 
  Users, 
  Globe, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Smartphone,
  Lock
} from "lucide-react";
import civicHeroImage from "@/assets/civic-hero.jpg";

const mockUser = {
  name: "Sarah Mbeki",
  verified: true
};

const mockVotingData = {
  title: "Community Budget Allocation 2024",
  description: "Decide how to allocate R50,000 for Ward 23 community improvements. Your voice matters in shaping our neighborhood's future.",
  options: [
    {
      id: "sanitation",
      title: "Sanitation Infrastructure",
      description: "Improve toilet facilities and waste management",
      icon: "🚽",
      votes: 234
    },
    {
      id: "streetlights",
      title: "Street Lighting",
      description: "Install LED streetlights for safer streets",
      icon: "💡",
      votes: 189
    },
    {
      id: "youth",
      title: "Youth Development",
      description: "Digital skills training for young people",
      icon: "💻",
      votes: 156
    }
  ],
  timeRemaining: "3 days remaining",
  totalVotes: 579
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-trust">
      <CivicHeader user={mockUser} notifications={3} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-civic shadow-civic">
          <div className="absolute inset-0">
            <img 
              src={civicHeroImage} 
              alt="Civic Democracy" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
          </div>
          
          <div className="relative z-10 px-8 py-12 text-white">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Power to Every Voice
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Secure, transparent, and accessible blockchain voting. 
                Participate in democracy from anywhere, verify your vote, 
                and help shape your community's future.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="xl" className="gap-2 shadow-vote">
                  <Vote className="w-5 h-5" />
                  Start Voting
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="xl" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Shield className="w-5 h-5" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="text-center bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Blockchain Security</CardTitle>
              <CardDescription>
                Every vote is cryptographically secured and permanently recorded on an immutable blockchain
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-civic rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Accessible Anywhere</CardTitle>
              <CardDescription>
                Vote from your phone, tablet, or computer. Support for multiple languages and accessibility features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Community First</CardTitle>
              <CardDescription>
                Beyond voting - participate in discussions, propose ideas, and engage with your community
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Main Dashboard */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="dashboard" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="vote" className="gap-2">
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Vote</span>
              </TabsTrigger>
              <TabsTrigger value="engage" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Engage</span>
              </TabsTrigger>
              <TabsTrigger value="verify" className="gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Verify</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Welcome back, {mockUser.name}!</h2>
                <p className="text-muted-foreground">Here's what's happening in your community</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <p className="text-sm text-muted-foreground">Active Votes</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-secondary">12</div>
                    <p className="text-sm text-muted-foreground">Votes Cast</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-accent">89%</div>
                    <p className="text-sm text-muted-foreground">Participation</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-success">5</div>
                    <p className="text-sm text-muted-foreground">Proposals Made</p>
                  </CardContent>
                </Card>
              </div>

              <VotingCard
                {...mockVotingData}
                onVote={(optionId) => console.log("Voted for:", optionId)}
              />
            </TabsContent>

            <TabsContent value="vote">
              <VotingCard
                {...mockVotingData}
                onVote={(optionId) => console.log("Voted for:", optionId)}
              />
            </TabsContent>

            <TabsContent value="engage">
              <EngagementHub />
            </TabsContent>

            <TabsContent value="verify">
              <VoteVerification />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
