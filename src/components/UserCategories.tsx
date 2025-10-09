import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Building2, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: Stethoscope,
    title: "Doctor Portal",
    description: "Volunteer your medical expertise and make a real difference in communities that need you most.",
    path: "/doctor-portal",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Building2,
    title: "NGO Portal",
    description: "Connect with doctors and organize impactful medical camps with transparent reporting.",
    path: "/ngo-portal",
    color: "bg-secondary/30 text-secondary-foreground"
  },
  {
    icon: Heart,
    title: "Patient Portal",
    description: "Access free or affordable medical consultations from verified doctors and NGOs.",
    path: "/patient-portal",
    color: "bg-accent/30 text-accent-foreground"
  }
];

const UserCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands already making healthcare accessible for all
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-soft transition-smooth border-border/50 overflow-hidden group">
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(category.path)}
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCategories;
