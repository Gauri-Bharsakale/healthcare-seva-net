const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            About SevaHealth
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            SevaHealth is a revolutionary platform dedicated to making healthcare accessible to every Indian, 
            regardless of their economic status. We bridge the gap between medical professionals who want to 
            give back and communities that desperately need care.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built on the foundation of <span className="text-primary font-semibold">seva</span> (selfless service), 
            we unite doctors, NGOs, and patients in a transparent ecosystem where compassion meets technology, 
            and where every consultation contributes to a healthier, more equitable India.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
