import { UserPlus, Users, Stethoscope, Handshake, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Sign up as a Doctor, NGO, or Patient with simple verification"
  },
  {
    icon: Users,
    title: "Connect",
    description: "Find and connect with verified healthcare providers and help seekers"
  },
  {
    icon: Stethoscope,
    title: "Consult",
    description: "Get free or low-cost medical consultations and guidance"
  },
  {
    icon: Handshake,
    title: "Collaborate",
    description: "Doctors and NGOs work together to organize medical camps"
  },
  {
    icon: TrendingUp,
    title: "Track Impact",
    description: "Monitor and measure the positive change created together"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to connect with care and make a difference
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-soft transition-smooth bg-card border-border/50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
