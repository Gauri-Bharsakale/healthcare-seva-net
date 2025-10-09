import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import UserCategories from "@/components/UserCategories";
import BenefitsSection from "@/components/BenefitsSection";
import ImpactTracker from "@/components/ImpactTracker";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";

const patientBenefits = [
  {
    title: "Massive Financial Savings",
    description: "Get free or low-cost consultations, diagnosis help, and guidance — saving thousands in medical costs."
  },
  {
    title: "Access to Trusted Help",
    description: "Avoid fake 'free camps' or hospitals with hidden charges. All services are verified and transparent."
  },
  {
    title: "Simple Process, No Bureaucracy",
    description: "One centralized platform — no long forms or running between hospitals."
  },
  {
    title: "Voice & Empowerment",
    description: "Speak directly with doctors and NGOs — feel heard and respected."
  },
  {
    title: "Guidance for the Future",
    description: "Learn how to seek help next time — builds long-term awareness and independence."
  }
];

const ngoBenefits = [
  {
    title: "Data & Reporting Made Easy",
    description: "Automatically get verified records and impact data for reports and audits."
  },
  {
    title: "Easier Funding & CSR Partnerships",
    description: "Transparency and proof of work attract more donations and CSR collaborations."
  },
  {
    title: "Brand Visibility",
    description: "Listed publicly on SevaHealth — boosts reach and national reputation."
  },
  {
    title: "Ready Access to Medical Volunteers",
    description: "Quickly find doctors for camps or virtual check-ups without manual search."
  },
  {
    title: "Operational Efficiency",
    description: "Organize drives, teleconsultations, and collaborations easily."
  },
  {
    title: "Government & CSR Recognition",
    description: "Data-backed transparency supports government or CSR registration."
  }
];

const doctorBenefits = [
  {
    title: "Professional Credibility & Recognition",
    description: "Volunteering enhances reputation and can lead to awards or government recognition."
  },
  {
    title: "Portfolio / Resume Boost",
    description: "Volunteer work improves postgraduate, fellowship, or leadership opportunities."
  },
  {
    title: "Networking Opportunities",
    description: "Connect with NGOs and other doctors for future research or social collaborations."
  },
  {
    title: "Personal Branding",
    description: "'Seva Profile' acts as a verified public portfolio, improving visibility and patient trust."
  },
  {
    title: "Social & Emotional Satisfaction",
    description: "Experience genuine inner peace and respect for contributing to society."
  },
  {
    title: "Indirect Exposure & Word-of-Mouth",
    description: "Patients who receive free help may later recommend the doctor's paid services."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4 flex justify-end">
          <LanguageToggle />
        </div>
      </header>

      <HeroSection />
      <About />
      <HowItWorks />
      <UserCategories />
      
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Real Benefits for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how SevaHealth creates value for patients, NGOs, and doctors
            </p>
          </div>
          
          <BenefitsSection 
            title="💙 For Patients" 
            benefits={patientBenefits}
            accentColor="bg-primary"
          />
          
          <BenefitsSection 
            title="🏥 For NGOs" 
            benefits={ngoBenefits}
            accentColor="bg-secondary"
          />
          
          <BenefitsSection 
            title="👨‍⚕️ For Doctors" 
            benefits={doctorBenefits}
            accentColor="bg-accent"
          />
        </div>
      </section>

      <ImpactTracker />
      <Footer />
    </div>
  );
};

export default Index;
