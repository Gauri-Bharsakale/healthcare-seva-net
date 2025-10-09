import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const PatientPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    phone: "",
    email: "",
    symptoms: "",
    medicalHistory: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We're finding the best doctors and NGOs to help you.");
  };

  return (
    <div className="min-h-screen gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-soft border-border/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
              <Heart className="w-8 h-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-3xl">Patient Registration</CardTitle>
            <CardDescription className="text-base">
              Get connected with verified doctors and NGOs for free or affordable healthcare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Your City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe Your Symptoms or Health Concern *</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Please describe what you're experiencing..."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Any Relevant Medical History (Optional)</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Previous conditions, medications, allergies..."
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> All consultations are confidential. We'll connect you with verified doctors 
                  and NGOs in your area who can provide free or low-cost medical assistance. You may also be eligible 
                  for financial aid programs.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Request for Help
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientPortal;
