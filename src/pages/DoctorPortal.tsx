import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Stethoscope, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import sevaLogo from "@/assets/seva-logo-teal.png";

const DoctorPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    city: "",
    state: "",
    sevaMode: "",
    availability: "",
    identityProof: null as File | null,
    medicalLicense: null as File | null,
    profilePhoto: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registration submitted successfully! We'll review and get back to you soon.");
  };

  return (
    <div className="min-h-screen gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <img src={sevaLogo} alt="SevaHealth Logo" className="h-12 w-12" />
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-soft border-border/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Doctor Registration</CardTitle>
            <CardDescription className="text-base">
              Join our network of compassionate healthcare professionals making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Physician</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="gynecology">Gynecology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sevaMode">Preferred Mode *</Label>
                  <Select
                    value={formData.sevaMode}
                    onValueChange={(value) => setFormData({ ...formData, sevaMode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free (Seva Mode)</SelectItem>
                      <SelectItem value="lowcost">Low-Cost Services</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability Slots *</Label>
                <Textarea
                  id="availability"
                  placeholder="E.g., Weekends 10 AM - 2 PM, or specific days..."
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identityProof">Identity Proof Upload (Aadhaar, PAN, or Govt ID) *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="identityProof"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, identityProof: e.target.files?.[0] || null })}
                      required
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalLicense">Medical License Upload *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="medicalLicense"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, medicalLicense: e.target.files?.[0] || null })}
                      required
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Mandatory for verification</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files?.[0] || null })}
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorPortal;
