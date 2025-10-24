import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import sevaLogo from "@/assets/seva-logo-teal.png";

const PatientPortal = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    village: "",
    state: "",
    phone: "",
    language: "",
    healthIssue: "",
    medicalReports: null as File | null,
    prescription: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We're finding the best doctors and NGOs to help you.");
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
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="village">Village (Optional)</Label>
                  <Input
                    id="village"
                    placeholder="Village name"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Your State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number *</Label>
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
                  <Label htmlFor="language">Language Preference *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthIssue">Description of Health Issue *</Label>
                <Textarea
                  id="healthIssue"
                  placeholder="Please describe your health concern in detail..."
                  value={formData.healthIssue}
                  onChange={(e) => setFormData({ ...formData, healthIssue: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalReports">Upload Previous Medical Reports (Images / PDFs)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="medicalReports"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setFormData({ ...formData, medicalReports: e.target.files?.[0] || null })}
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">For diagnosis reference</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescription">Upload Current Prescription or Doctor Note (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="prescription"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setFormData({ ...formData, prescription: e.target.files?.[0] || null })}
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
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
