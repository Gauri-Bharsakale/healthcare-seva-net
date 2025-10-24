import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Building2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import sevaLogo from "@/assets/seva-logo-teal.png";

const NGOPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
    phone: "",
    registrationNumber: "",
    location: "",
    areaOfOperation: "",
    contactPerson: "",
    contactPersonEmail: "",
    description: "",
    verificationDoc: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("NGO registration submitted successfully! We'll verify and get back to you soon.");
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-3xl">NGO Registration</CardTitle>
            <CardDescription className="text-base">
              Partner with us to organize impactful medical camps and serve communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your NGO Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">NGO Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="nonmedical">Non-Medical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@ngo.org"
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
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="NGO Reg. Number"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areaOfOperation">Area of Operation *</Label>
                  <Input
                    id="areaOfOperation"
                    placeholder="Region or districts covered"
                    value={formData.areaOfOperation}
                    onChange={(e) => setFormData({ ...formData, areaOfOperation: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person Name *</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Full Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPersonEmail">Contact Person Email *</Label>
                  <Input
                    id="contactPersonEmail"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.contactPersonEmail}
                    onChange={(e) => setFormData({ ...formData, contactPersonEmail: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Services *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your NGO's mission, healthcare initiatives, and services offered..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verificationDoc">Verification Documents (Certificate / Registration Proof) *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="verificationDoc"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFormData({ ...formData, verificationDoc: e.target.files?.[0] || null })}
                    required
                  />
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Upload NGO registration certificate or proof</p>
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

export default NGOPortal;
