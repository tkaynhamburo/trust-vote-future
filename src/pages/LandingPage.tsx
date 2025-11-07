import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, TrendingUp } from "lucide-react";
import { BeeIcon } from "@/components/BeeIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-ethereum rounded-full flex items-center justify-center">
              <BeeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MyVote SA</h1>
              <p className="text-xs text-muted-foreground">{t("poweredBy")} Ethereum</p>
            </div>
          </div>
          <Link to="/app">
            <Button variant="outline">{t("login")}</Button>
          </Link>
        </div>
      </header>

      {/* Main Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
          🤝 {t("secureVoting")}
        </Badge>
        
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-ethereum bg-clip-text text-transparent">
          {t("yourVoiceMatters")}
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {t("experienceFuture")} Join thousands of Cape Town residents already participating in blockchain-powered governance.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/app">
            <Button size="lg" className="text-lg px-8 shadow-ethereum">
              🗳️ {t("startVoting")}
            </Button>
          </Link>
          <Link to="/app?tab=blockchain">
            <Button size="lg" variant="outline" className="text-lg px-8">
              📋 {t("learnMore")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-2xl shadow-civic text-center">
            <div className="w-16 h-16 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-2">∞</h3>
            <p className="text-sm font-semibold mb-1">Ethereum-Powered Security</p>
            <p className="text-xs text-muted-foreground">
              Every vote secured by Ethereum blockchain - accessible even with basic smartphones and data connectivity
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-civic text-center">
            <div className="w-16 h-16 bg-gradient-civic rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-2">2,847,520</h3>
            <p className="text-sm font-semibold mb-1">Real-Time Verification</p>
            <p className="text-xs text-muted-foreground">
              Track votes in real-time with SMS confirmations - no internet required for verification
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-civic text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-2">87%</h3>
            <p className="text-sm font-semibold mb-1">Voter Engagement</p>
            <p className="text-xs text-muted-foreground">
              Active participation in municipal and provincial elections across Western Cape
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-card rounded-2xl shadow-civic p-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-ethereum rounded-full flex items-center justify-center mx-auto mb-4">
              <BeeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2">🇿🇦 South African Democracy 2.0</h3>
            <p className="text-lg text-muted-foreground">
              {t("votingSystem")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Blockchain Tech</h4>
              <p className="text-muted-foreground">
                Revolutionizing democracy in South Africa with secure, transparent, and verifiable blockchain technology. 
                Every vote matters, every voice is heard, every transaction is permanent.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Ethereum Integration</h4>
              <p className="text-muted-foreground">
                Powered by the world's most secure and decentralized blockchain network with smart contract governance 
                and gas-optimized transactions.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl mb-2">🔒</p>
              <p className="text-sm font-semibold">Immutable Security</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl mb-2">🕵️</p>
              <p className="text-sm font-semibold">Anonymous Voting</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl mb-2">👁️</p>
              <p className="text-sm font-semibold">Transparent Democracy</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl mb-2">🌐</p>
              <p className="text-sm font-semibold">Decentralized Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-4xl font-bold mb-4">Ready to Experience the Future of Democracy?</h3>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of South Africans already participating in blockchain-powered governance
        </p>
        <Link to="/app">
          <Button size="lg" className="text-lg px-12 shadow-ethereum">
            Start Your Democratic Journey
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-ethereum rounded-full flex items-center justify-center">
              <BeeIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Innovation Igniters</p>
              <p className="text-xs text-muted-foreground">Powering Democratic Innovation</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">🇿🇦 South Africa Flag</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
