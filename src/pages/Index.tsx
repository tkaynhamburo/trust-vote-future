import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CivicHeader } from "@/components/CivicHeader";
import { VotingCard } from "@/components/VotingCard";
import { NominationCard } from "@/components/NominationCard";
import { EngagementHub } from "@/components/EngagementHub";
import { VoteVerification } from "@/components/VoteVerification";
import { AuthDialog } from "@/components/AuthDialog";
import { AdminPanel } from "@/components/AdminPanel";
import { NotificationCenter } from "@/components/NotificationCenter";
import { 
  Vote, 
  Users, 
  Globe, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Smartphone,
  Lock,
  Crown,
  Activity,
  Zap,
  Bell
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
          name: "Nomsa Mthembu",
          position: "Councillor Candidate",
          party: "Richfield Cape Town Campus A",
          experience: "Community organizer for 6 years, small business owner, youth development coordinator",
          manifesto: "Fight for free basic services, job creation for youth, and improved community safety",
          avatar: "/lovable-uploads/a692f9ea-d94a-4fe5-bf41-8d2d93ab65d8.png",
          votes: 1245,
          incumbent: false
        },
        {
          id: `${ward}_candidate_2`,
          name: "Johan van der Merwe",
          position: "Councillor Candidate", 
          party: "Richfield Cape Town Campus B",
          experience: "Current ward councillor (incumbent), 4 years experience, background in local government",
          manifesto: "Continue infrastructure improvements, maintain service delivery standards, strengthen community partnerships",
          avatar: "/lovable-uploads/a692f9ea-d94a-4fe5-bf41-8d2d93ab65d8.png",
          votes: 1567,
          incumbent: true
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

// Community-tailored Municipal Voting Agendas
const getCommunityTailoredAgendas = (municipality: string, ward: string) => {
  const baseAgendas = [];
  
  // Cape Town specific agendas
  if (municipality === "City of Cape Town") {
    if (ward.includes("Langa") || ward.includes("Bonteheuwel") || ward.includes("Ward 23")) {
      baseAgendas.push({
        id: "cpt_housing_2024",
        title: `${municipality} Housing Development for ${ward} - R15 Million`,
        description: `Address housing shortage in ${ward} and surrounding ${municipality} townships. Focus on upgrading existing communities while preserving cultural heritage.`,
        type: "municipal",
        municipality: `${municipality} - ${ward}`,
        options: [
          {
            id: "social_housing",
            title: `${municipality} Social Housing Development`,
            description: `Build 200 subsidized units in ${ward} with community gardens`,
            icon: "🏠",
            votes: 1247
          },
          {
            id: "hostel_upgrade",
            title: `${ward} Hostel Modernization`,
            description: `Convert old hostels in ${ward} into family-friendly housing`,
            icon: "🏢",
            votes: 856
          },
          {
            id: "community_facilities",
            title: `${ward} Community Center Expansion`,
            description: `Build multipurpose community halls and libraries in ${ward}`,
            icon: "🏛️",
            votes: 678
          },
          {
            id: "heritage_preservation",
            title: "Heritage Housing Project",
            description: "Preserve historical buildings while adding modern amenities",
            icon: "🏺",
            votes: 423
          }
        ],
        timeRemaining: "5 days remaining",
        totalVotes: 3204,
        active: true,
        createdAt: new Date().toISOString()
      });
    }
    
    if (ward.includes("Khayelitsha") || ward.includes("Ward 26") || ward.includes("Ward 27")) {
      baseAgendas.push({
        id: "khayelitsha_services_2024",
        title: `${municipality} Essential Services for ${ward} - R12 Million`, 
        description: `Critical infrastructure for ${ward} informal settlements in ${municipality}. Prioritize basic dignity and safety for all residents.`,
        type: "municipal",
        municipality: `${municipality} - ${ward}`,
        options: [
          {
            id: "water_infrastructure",
            title: `${ward} Piped Water & Flush Toilets`,
            description: `Install household water connections and dignified sanitation in ${ward}`,
            icon: "🚰",
            votes: 2156
          },
          {
            id: "electricity_grid",
            title: `${ward} Safe Electricity Connections`,
            description: `Replace illegal connections with prepaid meters in ${ward}`,
            icon: "⚡",
            votes: 1834
          },
          {
            id: "gravel_roads",
            title: "All-Weather Road Access",
            description: "Gravel roads and stormwater drainage for wet season access",
            icon: "🛣️",
            votes: 1623
          },
          {
            id: "health_safety",
            title: "Mobile Clinic & Fire Station",
            description: "Weekly health services and emergency response capacity",
            icon: "🚑",
            votes: 1089
          }
        ],
        timeRemaining: "7 days remaining",
        totalVotes: 6702,
        active: true,
        createdAt: new Date().toISOString()
      });
    }

    if (ward.includes("Sea Point") || ward.includes("Camps Bay") || ward.includes("Ward 2") || ward.includes("Ward 11")) {
      baseAgendas.push({
        id: "atlantic_seaboard_2024",
        title: `${municipality} Coastal Infrastructure for ${ward} - R25 Million`,
        description: `Enhance coastal infrastructure and sustainable development for ${ward} high-density tourism area in ${municipality}.`,
        type: "municipal", 
        municipality: `${municipality} - ${ward}`,
        options: [
          {
            id: "coastal_protection",
            title: "Coastal Erosion Protection", 
            description: "Build sea walls and sand stabilization systems",
            icon: "🌊",
            votes: 1456
          },
          {
            id: "green_transport",
            title: "Electric Bus & Cycling Lanes",
            description: "Sustainable transport corridors for residents and tourists",
            icon: "🚌",
            votes: 1234
          },
          {
            id: "waste_recycling",
            title: "Zero-Waste Initiative",
            description: "Advanced recycling and composting systems",
            icon: "♻️",
            votes: 987
          },
          {
            id: "affordable_integration",
            title: "Affordable Housing Integration",
            description: "Mixed-income housing to prevent displacement",
            icon: "🏘️",
            votes: 678
          }
        ],
        timeRemaining: "10 days remaining",
        totalVotes: 4355,
        active: true,
        createdAt: new Date().toISOString()
      });
    }

    if (ward.includes("Mitchells Plain") || ward.includes("Ward 25")) {
      baseAgendas.push({
        id: "mitchells_plain_2024",
        title: `${municipality} Youth & Safety Initiative for ${ward} - R10 Million`,
        description: `Community safety and youth development in ${ward}, ${municipality} - established residential area with high youth population.`,
        type: "municipal",
        municipality: `${municipality} - ${ward}`,
        options: [
          {
            id: "youth_centers",
            title: `${ward} Youth Development Centers`,
            description: `Skills training and sports facilities for young people in ${ward}`,
            icon: "⚽",
            votes: 1789
          },
          {
            id: "community_policing",
            title: "Community Safety Program",
            description: "Neighborhood watch and improved street lighting",
            icon: "🚨",
            votes: 1567
          },
          {
            id: "small_business",
            title: "Small Business Incubators",
            description: "Support local entrepreneurs and job creation",
            icon: "💼",
            votes: 1234
          },
          {
            id: "transport_hubs",
            title: "Safe Transport Hubs",
            description: "Secure taxi ranks and bus stops with CCTV",
            icon: "🚐",
            votes: 945
          }
        ],
        timeRemaining: "6 days remaining",
        totalVotes: 5535,
        active: true,
        createdAt: new Date().toISOString()
      });
    }
  }

  // Other municipalities - generic rural/small town issues
  else {
    baseAgendas.push({
      id: `${municipality.toLowerCase().replace(/\s+/g, '_')}_rural_2024`,
      title: `${municipality} Rural Development - R6 Million`,
      description: `Essential services and economic development for ${municipality}. Focus on agriculture, tourism, and basic infrastructure.`,
      type: "municipal",
      municipality: `${municipality} - ${ward}`,
      options: [
        {
          id: "rural_roads",
          title: "Rural Road Maintenance",
          description: "Repair farm roads and improve access to markets",
          icon: "🛤️",
          votes: 456
        },
        {
          id: "water_boreholes",
          title: "Community Water Points",
          description: "Drill boreholes and install communal water tanks",
          icon: "💧",
          votes: 678
        },
        {
          id: "agriculture_support",
          title: "Small-Scale Farmer Support",
          description: "Seeds, tools, and agricultural training programs",
          icon: "🌾",
          votes: 543
        },
        {
          id: "tourism_infrastructure",
          title: "Tourism Development",
          description: "Visitor centers and heritage site improvements",
          icon: "🏞️",
          votes: 321
        }
      ],
      timeRemaining: "14 days remaining",
      totalVotes: 1998,
      active: true,
      createdAt: new Date().toISOString()
    });
  }
  
  return baseAgendas;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [votingType, setVotingType] = useState<"provincial" | "municipal">("provincial");

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("myvote_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setAuthDialogOpen(true);
    }

    // Load agendas and nominations
    const storedAgendas = localStorage.getItem("myvote_agendas");
    const storedNominations = localStorage.getItem("myvote_nominations");
    
    if (storedAgendas) {
      setAgendas(JSON.parse(storedAgendas));
    } else {
      // Set default agendas with South African context
      const storedUser = localStorage.getItem("myvote_user");
      let municipalAgendas = [];
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        municipalAgendas = getCommunityTailoredAgendas(userData.municipality, userData.ward);
      }
      const defaultAgendas = [...defaultProvincialAgendas, ...municipalAgendas];
      setAgendas(defaultAgendas);
      localStorage.setItem("myvote_agendas", JSON.stringify(defaultAgendas));
    }
    
    if (storedNominations) {
      setNominations(JSON.parse(storedNominations));
    } else {
      // Set default nominations
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
    
    // Update agendas with community-tailored content
    const communityAgendas = getCommunityTailoredAgendas(userData.municipality, userData.ward);
    const updatedAgendas = [...defaultProvincialAgendas, ...communityAgendas];
    setAgendas(updatedAgendas);
    localStorage.setItem("myvote_agendas", JSON.stringify(updatedAgendas));
    
    // Update nominations with user-specific content
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
                From provincial transport to local housing - participate in decisions that directly impact your community
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Main Dashboard */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full ${user.isAdmin ? 'grid-cols-8' : 'grid-cols-7'} bg-white/50 backdrop-blur-sm`}>
              <TabsTrigger value="dashboard" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="leadership" className="gap-2">
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Leadership</span>
              </TabsTrigger>
              <TabsTrigger value="provincial" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Provincial</span>
              </TabsTrigger>
              <TabsTrigger value="municipal" className="gap-2">
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Municipal</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="engage" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Engage</span>
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
                <h3 className="text-lg font-semibold">Active Votes for Your Area</h3>
                {agendas.filter((a: any) => a.active && (a.municipality.includes("Cape Town") || a.municipality.includes(user.municipality))).slice(0, 2).map((agenda: any) => (
                  <VotingCard
                    key={agenda.id}
                    {...agenda}
                    onVote={(optionId) => console.log("Voted for:", optionId)}
                  />
                ))}
                {agendas.filter((a: any) => a.active && (a.municipality.includes("Cape Town") || a.municipality.includes(user.municipality))).length === 0 && (
                  <Card className="text-center p-8">
                    <p className="text-muted-foreground">No active voting agendas for your area</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="leadership" className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Leadership Elections</h2>
                <p className="text-muted-foreground">
                  Vote for provincial and municipal leaders who will represent your interests
                </p>
              </div>
              
              <div className="grid gap-4 mb-6">
                <Button
                  variant={votingType === "provincial" ? "default" : "outline"}
                  onClick={() => setVotingType("provincial")}
                  className="w-full sm:w-auto"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Provincial Leadership
                </Button>
                <Button
                  variant={votingType === "municipal" ? "default" : "outline"}
                  onClick={() => setVotingType("municipal")}
                  className="w-full sm:w-auto"
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Municipal Leadership
                </Button>
              </div>
              
              {nominations.filter((n: any) => n.active && n.type === votingType).length > 0 ? (
                <div className="space-y-6">
                  {nominations.filter((n: any) => n.active && n.type === votingType).map((nomination: any) => (
                    <NominationCard
                      key={nomination.id}
                      title={nomination.title}
                      description={nomination.description}
                      position={nomination.position}
                      candidates={nomination.candidates}
                      timeRemaining={nomination.timeRemaining}
                      totalVotes={nomination.totalVotes}
                      onVote={(candidateId) => console.log("Voted for candidate:", candidateId)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active {votingType} leadership elections at this time</p>
                </Card>
              )}
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
                  Vote on local issues for {user.ward} and Cape Town municipal matters
                </p>
              </div>
              
              {agendas.filter((a: any) => a.active && a.type === "municipal" && a.municipality.includes("Cape Town")).length > 0 ? (
                <div className="space-y-6">
                  {agendas.filter((a: any) => a.active && a.type === "municipal" && a.municipality.includes("Cape Town")).map((agenda: any) => (
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
                  <p className="text-muted-foreground">No active Cape Town municipal votes at this time</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationCenter municipality={user.municipality} ward={user.ward} />
            </TabsContent>

            <TabsContent value="engage">
              <EngagementHub />
            </TabsContent>

            <TabsContent value="verify">
              <VoteVerification />
            </TabsContent>

            {user.isAdmin && (
              <TabsContent value="admin">
                <AdminPanel agendas={agendas} setAgendas={setAgendas} />
              </TabsContent>
            )}
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
