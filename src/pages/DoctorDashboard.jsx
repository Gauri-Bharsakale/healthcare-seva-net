import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, MessageSquare, Edit, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const mockNGOs = [
    { id: 1, name: "Health for All NGO", area: "Primary Healthcare", city: "Mumbai", description: "Providing healthcare services to underserved communities" },
    { id: 2, name: "Hope Foundation", area: "Cancer Care", city: "Delhi", description: "Supporting cancer patients with treatment and care" },
    { id: 3, name: "Care India", area: "Child Health", city: "Bangalore", description: "Focus on maternal and child health programs" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="SevaHealth" className="h-10" />
            {/* <span className="font-semibold text-xl">SevaHealth</span> */}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 rounded-full">
            <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
            <TabsTrigger value="ngos" className="rounded-full">Connect with NGOs</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full">Messages</TabsTrigger>
          </TabsList>

          {/* Profile Section */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Dr. Rajesh Kumar</CardTitle>
                  <CardDescription className="text-lg mt-1">Cardiologist</CardDescription>
                </div>
                <Button className="rounded-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">15 Years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <p className="font-medium">Cardiology & Heart Surgery</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="font-medium">Mon-Fri, 6:00 PM - 9:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seva Mode</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <p className="font-medium">Active</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">45</p>
                  <p className="text-muted-foreground mt-1">Cases Helped</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">120</p>
                  <p className="text-muted-foreground mt-1">Hours Volunteered</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">8</p>
                  <p className="text-muted-foreground mt-1">NGO Partnerships</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Connect with NGOs */}
          <TabsContent value="ngos" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search NGOs by name or city..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockNGOs.map((ngo) => (
                <Card key={ngo.id} className="shadow-card hover:shadow-soft transition-smooth">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{ngo.name}</CardTitle>
                        <CardDescription>{ngo.area} • {ngo.city}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{ngo.description}</p>
                    <div className="flex gap-2">
                      <Button className="flex-1 rounded-full">Connect</Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Your conversations with NGOs and patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-smooth">
                      <Avatar>
                        <AvatarFallback>N{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">NGO Conversation {i}</p>
                          <p className="text-xs text-muted-foreground">2h ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Last message preview...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
