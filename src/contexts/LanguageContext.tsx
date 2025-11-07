import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "af" | "zu" | "xh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome to MyVote SA",
    login: "Log In",
    register: "Register",
    votingSystem: "Blockchain-Powered Voting",
    secureVoting: "Every vote secured by Ethereum blockchain",
    startVoting: "Start Voting",
    learnMore: "Learn More",
    yourVoiceMatters: "Your Vote, Your Voice",
    experienceFuture: "Ready to Experience the Future of Democracy?",
    provincialElections: "Provincial Elections",
    municipalElections: "Municipal Elections",
    logout: "Logout",
    poweredBy: "Powered by"
  },
  af: {
    welcome: "Welkom by MyVote SA",
    login: "Teken Aan",
    register: "Registreer",
    votingSystem: "Blokketting-Aangedrewe Stem",
    secureVoting: "Elke stem beveilig deur Ethereum blokketting",
    startVoting: "Begin Stem",
    learnMore: "Leer Meer",
    yourVoiceMatters: "Jou Stem, Jou Stem",
    experienceFuture: "Gereed om die Toekoms van Demokrasie te Ervaar?",
    provincialElections: "Provinsiale Verkiesings",
    municipalElections: "Munisipale Verkiesings",
    logout: "Teken Uit",
    poweredBy: "Aangedryf deur"
  },
  zu: {
    welcome: "Siyakwamukela ku-MyVote SA",
    login: "Ngena Ngemvume",
    register: "Bhalisa",
    votingSystem: "Uhlelo Lokuvota Lwe-Blockchain",
    secureVoting: "Ivoti ngalinye livikelwe nge-Ethereum blockchain",
    startVoting: "Qala Ukuvota",
    learnMore: "Funda Kabanzi",
    yourVoiceMatters: "Ivoti Lakho, Izwi Lakho",
    experienceFuture: "Ukulungele Ukubona Ikusasa Lentando Yeningi?",
    provincialElections: "Ukhetho Lwesifundazwe",
    municipalElections: "Ukhetho Lomasipala",
    logout: "Phuma",
    poweredBy: "Kunikwa amandla ngu"
  },
  xh: {
    welcome: "Wamkelekile ku-MyVote SA",
    login: "Ngena",
    register: "Bhalisa",
    votingSystem: "Ukuvota Okusekelwe kwi-Blockchain",
    secureVoting: "Ivoti nganye ikhuselwe nge-Ethereum blockchain",
    startVoting: "Qala Ukuvota",
    learnMore: "Funda Ngakumbi",
    yourVoiceMatters: "Ivoti Yakho, Ilizwi Lakho",
    experienceFuture: "Ukulungele Ukufumana Ikamva Ledemokhrasi?",
    provincialElections: "Unyulo Lwephondo",
    municipalElections: "Unyulo Lomasipala",
    logout: "Phuma",
    poweredBy: "Ixhaswe ngu"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
