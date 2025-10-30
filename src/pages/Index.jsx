import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import UserCategories from "@/components/UserCategories";
import BenefitsSection from "@/components/BenefitsSection";
import ImpactTracker from "@/components/ImpactTracker";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import sevaLogo from "@/assets/seva-logo-teal.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img src={sevaLogo} alt="SevaHealth" className="h-12" />
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a
              href="/auth"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium shadow-soft transition-smooth"
            >
              {t.common.login}
            </a>
          </div>
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
              {t.benefits.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.benefits.subtitle}
            </p>
          </div>

          <BenefitsSection
            title={t.benefits.patients.title}
            benefits={t.benefits.patients.items}
            accentColor="bg-primary"
          />

          <BenefitsSection
            title={t.benefits.ngos.title}
            benefits={t.benefits.ngos.items}
            accentColor="bg-secondary"
          />

          <BenefitsSection
            title={t.benefits.doctors.title}
            benefits={t.benefits.doctors.items}
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
