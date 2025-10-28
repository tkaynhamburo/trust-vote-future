import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CivicHeader } from "@/components/CivicHeader";
import { NominationCard } from "@/components/NominationCard";
import { VoteVerification } from "@/components/VoteVerification";
import { AuthDialog } from "@/components/AuthDialog";
import { AdminPanel } from "@/components/AdminPanel";
import { NotificationCenter } from "@/components/NotificationCenter";
import BlockchainShowcase from "@/components/BlockchainShowcase";
import { 
  Vote, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Lock,
  Crown,
  Activity,
  Zap,
  Bell,
  Blocks
} from "lucide-react";
import { BeeIcon } from "@/components/BeeIcon";
import civicHeroImage from "@/assets/civic-hero.jpg";

interface User {
  username: string;
  isAdmin: boolean;
  municipality: string;
  ward: string;
  idNumber: string;
  voterID: string;
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

// Leadership Nominations for Provincial and Municipal Positions
const leadershipNominations = [
  {
    id: "provincial_premier_2024",
    title: "Western Cape Premier Election 2024",
    description: "Select the next Premier of Western Cape Province. The Premier leads provincial government and oversees all municipal coordination across the province.",
    position: "Premier of Western Cape",
    type: "provincial",
    municipality: "Western Cape Province",
    candidates: [
      {
        id: "micaiah_nhamburo",
        name: "Micaiah Nhamburo",
        position: "Premier Candidate",
        party: "Richfield Cape Town Campus A",
        experience: "15 years in provincial administration, former Mayor of Stellenbosch, holds Master's in Public Administration",
        manifesto: "Focus on rural development, youth employment, and digital transformation of government services across Western Cape",
        avatar: "/lovable-uploads/2b92892d-45bc-4fe5-8aa8-f694d02b4188.png",
        votes: 45623,
        incumbent: false
      },
      {
        id: "munyaradzi_mudavanhu",
        name: "Munyaradzi Mudavanhu",
        position: "Premier Candidate", 
        party: "Richfield Cape Town Campus B",
        experience: "12 years as Municipal Manager in George, extensive background in community development and infrastructure planning",
        manifesto: "Prioritize housing delivery, public transport expansion, and renewable energy projects to create sustainable jobs",
        avatar: "/lovable-uploads/c68e1b48-2149-43a9-9b9f-f441dd292ac0.png",
        votes: 38947,
        incumbent: false
      },
      {
        id: "ben_mbayo",
        name: "Ben Mbayo",
        position: "Premier Candidate",
        party: "Richfield Cape Town Campus C",
        experience: "Business leader, 6 years in public service, former municipal manager, MBA graduate",
        manifesto: "Youth empowerment, digital transformation, sustainable development, and transparent governance",
        avatar: "/lovable-uploads/d0674897-abc6-478c-9d32-bbaa439ced68.png",
        votes: 28456,
        incumbent: false
      }
    ],
    timeRemaining: "15 days remaining",
    totalVotes: 84570,
    active: true,
    createdAt: new Date().toISOString()
  }
];

// Additional South African Provincial Issues
const additionalProvincialIssues = [
  {
    id: "provincial_healthcare_2024",
    title: "Western Cape Healthcare Crisis Response - R1.2 Billion Emergency Budget",
    description: "Address critical healthcare shortages across Western Cape public hospitals and clinics. Focus on rural areas and township communities with limited access.",
    type: "provincial",
    municipality: "Western Cape Province",
    options: [
      {
        id: "mobile_clinics",
        title: "Mobile Clinic Fleet Expansion",
        description: "Deploy 50 new mobile clinics to serve rural farming communities and informal settlements",
        icon: "🚑",
        votes: 5234
      },
      {
        id: "specialist_recruitment",
        title: "Specialist Doctor Recruitment",
        description: "Recruit doctors from Zimbabwe, Nigeria, and Cuba to address critical specialist shortages",
        icon: "👩‍⚕️",
        votes: 4567
      },
      {
        id: "chronic_medication",
        title: "Chronic Medication Access",
        description: "Establish medication pickup points in taxi ranks and community centers",
        icon: "💊",
        votes: 3890
      },
      {
        id: "mental_health",
        title: "Community Mental Health Program",
        description: "Train traditional healers and community leaders in mental health first aid",
        icon: "🧠",
        votes: 2345
      }
    ],
    timeRemaining: "9 days remaining",
    totalVotes: 16036,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "provincial_drought_2024",
    title: "Day Zero Prevention - Water Security R900 Million Investment",
    description: "Prevent another Cape Town water crisis through province-wide water security measures and drought-resistant infrastructure.",
    type: "provincial",
    municipality: "Western Cape Province",
    options: [
      {
        id: "desalination_plants",
        title: "Small-Scale Desalination Plants",
        description: "Build 15 community-sized desalination facilities along Western Cape coast",
        icon: "🌊",
        votes: 3456
      },
      {
        id: "groundwater_management",
        title: "Groundwater Harvesting & Management",
        description: "Drill sustainable boreholes and implement smart groundwater monitoring",
        icon: "💧",
        votes: 4123
      },
      {
        id: "rainwater_harvesting",
        title: "Community Rainwater Harvesting",
        description: "Install rainwater tanks in schools, clinics, and community centers",
        icon: "☔",
        votes: 2890
      },
      {
        id: "water_recycling",
        title: "Wastewater Treatment Upgrade",
        description: "Upgrade all municipal wastewater plants for safe water recycling",
        icon: "♻️",
        votes: 2678
      }
    ],
    timeRemaining: "11 days remaining",
    totalVotes: 13147,
    active: true,
    createdAt: new Date().toISOString()
  }
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
  },
  ...additionalProvincialIssues
];

// Get Municipal Leader Nominations for user's area
const getMunicipalNominations = (municipality: string, ward: string) => {
  const nominations = [];
  
  if (municipality === "City of Cape Town") {
    nominations.push({
      id: "cape_town_mayor_2024",
      title: `${municipality} Mayoral Election 2024`,
      description: `Select the next Executive Mayor of ${municipality}. The Mayor oversees municipal services, budget allocation, and community development across all Cape Town wards.`,
      position: "Executive Mayor",
      type: "municipal",
      municipality: municipality,
        candidates: [
        {
          id: "micaiah_nhamburo_mayor",
          name: "Micaiah Nhamburo",
          position: "Mayoral Candidate",
          party: "Richfield Cape Town Campus A",
          experience: "8 years as Ward Councillor, former Deputy Mayor of Stellenbosch, Civil Engineering background",
          manifesto: "Focus on service delivery in townships, fixing water infrastructure, and creating youth employment opportunities",
          avatar: "/lovable-uploads/2b92892d-45bc-4fe5-8aa8-f694d02b4188.png",
          votes: 23567,
          incumbent: false
        },
        {
          id: "munyaradzi_mudavanhu_mayor",
          name: "Munyaradzi Mudavanhu",
          position: "Mayoral Candidate",
          party: "Richfield Cape Town Campus B",
          experience: "10 years as Community Development Manager, Masters in Urban Planning, housing delivery specialist",
          manifesto: "Accelerate housing delivery, improve public transport to townships, and strengthen community safety partnerships",
          avatar: "/lovable-uploads/c68e1b48-2149-43a9-9b9f-f441dd292ac0.png",
          votes: 19234,
          incumbent: false
        },
        {
          id: "ben_mbayo_mayor",
          name: "Ben Mbayo",
          position: "Mayoral Candidate",
          party: "Richfield Cape Town Campus C",
          experience: "Entrepreneur, 4 years municipal experience, former ward committee member, engineering degree",
          manifesto: "Smart city initiatives, youth employment programs, green energy projects, and citizen engagement",
          avatar: "/lovable-uploads/d0674897-abc6-478c-9d32-bbaa439ced68.png",
          votes: 15892,
          incumbent: false
        }
      ],
      timeRemaining: "18 days remaining",
      totalVotes: 42801,
      active: true,
      createdAt: new Date().toISOString()
    });
  }
  
  // Add ward councillor nominations for specific wards
  if (ward.includes("Ward")) {
    nominations.push({
      id: `${ward.toLowerCase().replace(/\s+/g, '_')}_councillor_2024`,
      title: `${ward} Councillor Election 2024`,
      description: `Select your local ward councillor for ${ward} in ${municipality}. Your councillor represents local issues in municipal council.`,
      position: "Ward Councillor",
      type: "municipal",
      municipality: `${municipality} - ${ward}`,
      candidates: [
        {
          id: `${ward}_candidate_1`,
          name: "Micaiah Nhamburo",
          position: "Councillor Candidate",
          party: "Richfield Cape Town Campus A",
          experience: "Community organizer for 6 years, small business owner, youth development coordinator",
          manifesto: "Fight for free basic services, job creation for youth, and improved community safety",
          avatar: "/lovable-uploads/2b92892d-45bc-4fe5-8aa8-f694d02b4188.png",
          votes: 1245,
          incumbent: false
        },
        {
          id: `${ward}_candidate_2`,
          name: "Munyaradzi Mudavanhu",
          position: "Councillor Candidate", 
          party: "Richfield Cape Town Campus B",
          experience: "Current ward councillor (incumbent), 4 years experience, background in local government",
          manifesto: "Continue infrastructure improvements, maintain service delivery standards, strengthen community partnerships",
          avatar: "/lovable-uploads/c68e1b48-2149-43a9-9b9f-f441dd292ac0.png",
          votes: 1567,
          incumbent: true
        },
        {
          id: `${ward}_candidate_3`,
          name: "Ben Mbayo",
          position: "Councillor Candidate",
          party: "Richfield Cape Town Campus C",
          experience: "Social worker, 3 years community activism, local business development coordinator",
          manifesto: "Focus on social services, community upliftment programs, and participatory governance",
          avatar: "/lovable-uploads/d0674897-abc6-478c-9d32-bbaa439ced68.png",
          votes: 987,
          incumbent: false
        }
      ],
      timeRemaining: "18 days remaining", 
      totalVotes: 2812,
      active: true,
      createdAt: new Date().toISOString()
    });
  }
  
  return nominations;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("myvote_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setAuthDialogOpen(true);
    }

    const storedNominations = localStorage.getItem("myvote_nominations");
    if (storedNominations) {
      setNominations(JSON.parse(storedNominations));
    } else {
      const storedUser = localStorage.getItem("myvote_user");
      let userNominations = [];
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userNominations = [...leadershipNominations, ...getMunicipalNominations(userData.municipality, userData.ward)];
      } else {
        userNominations = leadershipNominations;
      }
      setNominations(userNominations);
      localStorage.setItem("myvote_nominations", JSON.stringify(userNominations));
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    const userNominations = [...leadershipNominations, ...getMunicipalNominations(userData.municipality, userData.ward)];
    setNominations(userNominations);
    localStorage.setItem("myvote_nominations", JSON.stringify(userNominations));
  };

  const handleLogout = () => {
    localStorage.removeItem("myvote_user");
    setUser(null);
    setAuthDialogOpen(true);
  };

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-trust flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto animate-pulse">
              <BeeIcon className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to MyVote SA</h1>
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
                Secure blockchain voting for leadership elections. Choose your representatives at provincial 
                and municipal levels. Your voice matters in selecting leaders for the Western Cape with 
                Ethereum-verified transparency.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="xl" className="gap-2 shadow-vote">
                  <Vote className="w-5 h-5" />
                  Start Voting
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="xl" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <BeeIcon className="w-5 h-5" />
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
                Vote for leaders who represent your community - from provincial premiers to local ward councillors
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
              <TabsTrigger value="elections" className="gap-2">
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Elections</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="blockchain" className="gap-2">
                <Blocks className="w-4 h-4" />
                <span className="hidden sm:inline">Blockchain</span>
              </TabsTrigger>
              <TabsTrigger value="verify" className="gap-2">
                <BeeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Verify</span>
              </TabsTrigger>
              {user.isAdmin && (
                <TabsTrigger value="admin" className="gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Sawubona, {user.username}!</h2>
                <p className="text-muted-foreground">
                  {user.isAdmin ? "Administrative overview - Western Cape CivicLink" : `Representing ${user.ward} • ${user.municipality}`}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary">{nominations.filter((n: any) => n.active).length}</div>
                    <p className="text-sm text-muted-foreground">Active Elections</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-secondary">{nominations.filter((n: any) => n.type === "provincial").length}</div>
                    <p className="text-sm text-muted-foreground">Provincial Elections</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-trust">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-accent">{nominations.filter((n: any) => n.type === "municipal").length}</div>
                    <p className="text-sm text-muted-foreground">Municipal Elections</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Active Elections</h3>
                {nominations.slice(0, 2).map((nomination: any) => (
                  <NominationCard key={nomination.id} {...nomination} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="elections" className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Leadership Elections</h2>
                <p className="text-muted-foreground">
                  Vote for provincial and municipal leaders who will represent your interests
                </p>
              </div>
              
              {nominations.filter((n: any) => n.active).length > 0 ? (
                <div className="space-y-6">
                  {nominations.filter((n: any) => n.active).map((nomination: any) => (
                    <NominationCard
                      key={nomination.id}
                      title={nomination.title}
                      description={nomination.description}
                      position={nomination.position}
                      candidates={nomination.candidates}
                      timeRemaining={nomination.timeRemaining}
                      totalVotes={nomination.totalVotes}
                      onVote={(candidateId) => {}}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active elections at this time</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationCenter municipality={user.municipality} ward={user.ward} />
            </TabsContent>

            <TabsContent value="blockchain">
              <BlockchainShowcase />
            </TabsContent>

            <TabsContent value="verify">
              <VoteVerification />
            </TabsContent>

            {user.isAdmin && (
              <TabsContent value="admin">
                <AdminPanel agendas={[]} setAgendas={() => {}} />
              </TabsContent>
            )}
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
