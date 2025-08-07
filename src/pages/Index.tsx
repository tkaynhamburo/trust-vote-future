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

// Western Cape Municipalities
const westernCapeMunicipalities = [
  "City of Cape Town", "Stellenbosch", "Drakenstein", "Witzenberg", 
  "Breede Valley", "Langeberg", "Swellendam", "Theewaterskloof",
  "Overstrand", "Cape Agulhas", "Swartland", "Saldanha Bay",
  "Bergrivier", "Cederberg", "Matzikama", "Bitou", "Knysna",
  "George", "Hessequa", "Oudtshoorn", "Kannaland", "Laingsburg",
  "Prince Albert", "Beaufort West", "Central Karoo"
];

// Default Provincial Voting Agendas
const defaultProvincialAgendas = [
  {
    id: "provincial_transport_2024",
    title: "Western Cape Transport Infrastructure R2.5 Billion Budget",
    description: "Allocate provincial transport budget for critical infrastructure improvements across Western Cape municipalities. Your vote determines infrastructure priorities for the next 3 years.",
    type: "provincial",
    municipality: "Western Cape Province",
    options: [
      {
        id: "rail_expansion",
        title: "Metrorail Expansion & Safety",
        description: "Extend rail lines to underserved areas and improve station security",
        icon: "🚂",
        votes: 2847
      },
      {
        id: "bus_rapid_transit",
        title: "MyCiTi Bus Network Extension",
        description: "Expand BRT system to townships and rural communities",
        icon: "🚌",
        votes: 1923
      },
      {
        id: "road_maintenance",
        title: "Provincial Road Maintenance",
        description: "Fix potholes and upgrade rural road infrastructure",
        icon: "🛣️",
        votes: 3156
      },
      {
        id: "cycling_infrastructure",
        title: "Safe Cycling Infrastructure",
        description: "Build protected bike lanes and cycling paths",
        icon: "🚴",
        votes: 892
      }
    ],
    timeRemaining: "12 days remaining",
    totalVotes: 8818,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "provincial_education_2024",
    title: "Digital Education Initiative - R800 Million Investment",
    description: "Provincial education modernization focusing on digital literacy and infrastructure for disadvantaged schools across Western Cape.",
    type: "provincial",
    municipality: "Western Cape Province",
    options: [
      {
        id: "tablet_program",
        title: "Tablet Distribution Program",
        description: "Provide tablets to Grade 4-12 learners in no-fee schools",
        icon: "📱",
        votes: 4523
      },
      {
        id: "wifi_schools",
        title: "School WiFi Connectivity",
        description: "High-speed internet for all public schools",
        icon: "📶",
        votes: 3891
      },
      {
        id: "teacher_training",
        title: "Digital Skills Teacher Training",
        description: "Train educators in digital teaching methods",
        icon: "👨‍🏫",
        votes: 2156
      },
      {
        id: "computer_labs",
        title: "Modern Computer Laboratories",
        description: "Build and upgrade computer labs in rural schools",
        icon: "💻",
        votes: 1834
      }
    ],
    timeRemaining: "8 days remaining",
    totalVotes: 12404,
    active: true,
    createdAt: new Date().toISOString()
  }
];

// Default Municipal Voting Agendas (City of Cape Town example)
const defaultMunicipalAgendas = [
  {
    id: "cpt_housing_2024",
    title: "Cape Town Affordable Housing - Ward 23 R15 Million",
    description: "Decide on affordable housing priorities for Ward 23. Choose how to best address the housing crisis affecting our community members.",
    type: "municipal",
    municipality: "City of Cape Town - Ward 23",
    options: [
      {
        id: "social_housing",
        title: "Social Housing Development",
        description: "Build 200 subsidized housing units for families earning under R3,500",
        icon: "🏠",
        votes: 1247
      },
      {
        id: "backyard_upgrade",
        title: "Backyard Dwelling Upgrades",
        description: "Improve existing informal backyard dwellings with electricity & water",
        icon: "⚡",
        votes: 856
      },
      {
        id: "temporary_housing",
        title: "Temporary Relocation Assistance",
        description: "Support families during housing transitions with temporary accommodation",
        icon: "🏚️",
        votes: 423
      },
      {
        id: "land_purchase",
        title: "Community Land Purchase",
        description: "Acquire land for future affordable housing developments",
        icon: "🌍",
        votes: 678
      }
    ],
    timeRemaining: "5 days remaining",
    totalVotes: 3204,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "cpt_services_2024",
    title: "Essential Services Improvement - Khayelitsha R8 Million",
    description: "Critical infrastructure improvements for Khayelitsha community. Address basic service delivery challenges affecting daily life.",
    type: "municipal", 
    municipality: "City of Cape Town - Khayelitsha",
    options: [
      {
        id: "water_infrastructure",
        title: "Water & Sanitation Upgrade",
        description: "Install flush toilets and reliable water supply systems",
        icon: "🚰",
        votes: 2156
      },
      {
        id: "waste_management",
        title: "Waste Collection Enhancement",
        description: "Daily refuse collection and recycling programs",
        icon: "♻️",
        votes: 1834
      },
      {
        id: "street_lighting",
        title: "LED Street Lighting Project",
        description: "Solar-powered LED lights for safer streets at night",
        icon: "💡",
        votes: 1623
      },
      {
        id: "community_clinic",
        title: "Mobile Health Clinic",
        description: "Weekly mobile clinic visits for basic healthcare",
        icon: "🏥",
        votes: 1089
      }
    ],
    timeRemaining: "7 days remaining", 
    totalVotes: 6702,
    active: true,
    createdAt: new Date().toISOString()
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [votingType, setVotingType] = useState<"provincial" | "municipal">("provincial");

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
      // Set default agendas with South African context
      const defaultAgendas = [...defaultProvincialAgendas, ...defaultMunicipalAgendas];
      setAgendas(defaultAgendas);
      localStorage.setItem("civiclink_agendas", JSON.stringify(defaultAgendas));
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
                Democracy in the Western Cape
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Secure blockchain voting for South African communities. Participate in provincial 
                and municipal decisions, from Cape Town to rural Western Cape. Your voice shapes 
                infrastructure, housing, education, and essential services with Ethereum-verified transparency.
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
                Every vote secured by Ethereum blockchain - accessible even with basic smartphones and data connectivity
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
                Track votes in real-time with SMS confirmations - no internet required for verification
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
                From provincial transport to local housing - participate in decisions that directly impact your community
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Main Dashboard */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full ${user.isAdmin ? 'grid-cols-6' : 'grid-cols-5'} bg-white/50 backdrop-blur-sm`}>
              <TabsTrigger value="dashboard" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="provincial" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Provincial</span>
              </TabsTrigger>
              <TabsTrigger value="municipal" className="gap-2">
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Municipal</span>
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
                <h2 className="text-2xl font-bold">Sawubona, {user.username}!</h2>
                <p className="text-muted-foreground">
                  {user.isAdmin ? "Administrative overview - Western Cape CivicLink" : "Current voting opportunities in the Western Cape"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary">{agendas.filter((a: any) => a.active).length}</div>
                    <p className="text-sm text-muted-foreground">Active Votes</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-secondary">{agendas.filter((a: any) => a.type === "provincial").length}</div>
                    <p className="text-sm text-muted-foreground">Provincial Issues</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-accent">{agendas.filter((a: any) => a.type === "municipal").length}</div>
                    <p className="text-sm text-muted-foreground">Municipal Issues</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-success">84%</div>
                    <p className="text-sm text-muted-foreground">Community Participation</p>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Votes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Community Votes</h3>
                {agendas.filter((a: any) => a.active).slice(0, 2).map((agenda: any) => (
                  <VotingCard
                    key={agenda.id}
                    {...agenda}
                    onVote={(optionId) => console.log("Voted for:", optionId)}
                  />
                ))}
                {agendas.filter((a: any) => a.active).length === 0 && (
                  <Card className="text-center p-8">
                    <p className="text-muted-foreground">No active voting agendas available</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="provincial" className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Western Cape Provincial Voting</h2>
                <p className="text-muted-foreground">
                  Vote on province-wide initiatives affecting all Western Cape communities
                </p>
              </div>
              
              {agendas.filter((a: any) => a.active && a.type === "provincial").length > 0 ? (
                <div className="space-y-6">
                  {agendas.filter((a: any) => a.active && a.type === "provincial").map((agenda: any) => (
                    <VotingCard
                      key={agenda.id}
                      {...agenda}
                      onVote={(optionId) => console.log("Voted for:", optionId)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active provincial votes at this time</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="municipal" className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Municipal & Local Community Voting</h2>
                <p className="text-muted-foreground">
                  Vote on local issues affecting your specific municipality and ward
                </p>
              </div>
              
              {agendas.filter((a: any) => a.active && a.type === "municipal").length > 0 ? (
                <div className="space-y-6">
                  {agendas.filter((a: any) => a.active && a.type === "municipal").map((agenda: any) => (
                    <VotingCard
                      key={agenda.id}
                      {...agenda}
                      onVote={(optionId) => console.log("Voted for:", optionId)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <Vote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active municipal votes at this time</p>
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
