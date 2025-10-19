import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.about.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t.about.paragraph1}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.about.paragraph2} <span className="text-primary font-semibold">{t.about.seva}</span> {t.about.sevaDescription}, {t.about.paragraph3}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
