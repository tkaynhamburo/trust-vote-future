import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CivicHeader } from "@/components/CivicHeader";
import { VotingCard } from "@/components/VotingCard";
import { EngagementHub } from "@/components/EngagementHub";
import { VoteVerification } from "@/components/VoteVerification";
import { AuthDialog } from "@/components/AuthDialog";
import { AdminPanel } from "@/components/AdminPanel";
import { 
  Vote, 
  Shield, 
  Users, 
  Globe, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Smartphone,
  Lock,
  Crown,
  Activity,
  Zap
} from "lucide-react";
import civicHeroImage from "@/assets/civic-hero.jpg";

interface User {
  username: string;
  isAdmin: boolean;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("civiclink_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setAuthDialogOpen(true);
    }

    // Load agendas
    const storedAgendas = localStorage.getItem("civiclink_agendas");
    if (storedAgendas) {
      setAgendas(JSON.parse(storedAgendas));
    } else {
      // Set default agenda if none exists
      setAgendas([mockVotingData]);
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("civiclink_user");
    setUser(null);
    setAuthDialogOpen(true);
  };

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-trust flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to CivicLink</h1>
            <p className="text-muted-foreground">Connecting to secure authentication...</p>
          </div>
        </div>
        <AuthDialog 
          open={authDialogOpen} 
          onOpenChange={setAuthDialogOpen}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-trust">
      <CivicHeader user={user} notifications={3} onLogout={handleLogout} />
      
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
                Secure blockchain voting powered by our partnership with Ethereum. 
                Participate in democracy from anywhere, verify your vote on-chain, 
                and help shape your community's future with crypto-verified transparency.
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
              <div className="w-12 h-12 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Ethereum-Powered Security</CardTitle>
              <CardDescription>
                Every vote is secured by Ethereum's immutable blockchain with gas-free transactions for voters
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-gradient-trust shadow-civic hover:shadow-trust transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-civic rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Real-Time Verification</CardTitle>
              <CardDescription>
                Track your vote live on Ethereum blockchain with instant transaction confirmations
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
            <TabsList className={`grid w-full ${user.isAdmin ? 'grid-cols-5' : 'grid-cols-4'} bg-white/50 backdrop-blur-sm`}>
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
              {user.isAdmin && (
                <TabsTrigger value="admin" className="gap-2">
                  <Crown className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Welcome back, {user.username}!</h2>
                <p className="text-muted-foreground">
                  {user.isAdmin ? "Administrative overview of the platform" : "Here's what's happening in your community"}
                </p>
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

              {agendas.length > 0 ? (
                <VotingCard
                  {...(agendas.find((a: any) => a.active) || agendas[0])}
                  onVote={(optionId) => console.log("Voted for:", optionId)}
                />
              ) : (
                <Card className="text-center p-8">
                  <p className="text-muted-foreground">No active voting agendas available</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="vote">
              {agendas.length > 0 ? (
                <div className="space-y-6">
                  {agendas.filter((a: any) => a.active).map((agenda: any) => (
                    <VotingCard
                      key={agenda.id}
                      {...agenda}
                      onVote={(optionId) => console.log("Voted for:", optionId)}
                    />
                  ))}
                  {agendas.filter((a: any) => a.active).length === 0 && (
                    <Card className="text-center p-8">
                      <p className="text-muted-foreground">No active votes at this time</p>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <p className="text-muted-foreground">No voting agendas available</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="engage">
              <EngagementHub />
            </TabsContent>

            <TabsContent value="verify">
              <VoteVerification />
            </TabsContent>

            {user.isAdmin && (
              <TabsContent value="admin">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
