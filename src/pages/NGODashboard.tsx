import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, Edit, Trash2, UserCircle, BarChart3, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const mockDoctors = [
    { id: 1, name: "Dr. Rajesh Kumar", specialization: "Cardiologist", location: "Mumbai" },
    { id: 2, name: "Dr. Priya Sharma", specialization: "Pediatrician", location: "Delhi" },
    { id: 3, name: "Dr. Amit Patel", specialization: "General Physician", location: "Pune" }
  ];

  const mockPatients = [
    { id: 1, name: "Ramesh Patil", condition: "Heart Disease", status: "Under Review" },
    { id: 2, name: "Sunita Devi", condition: "Diabetes", status: "Approved" },
    { id: 3, name: "Mohan Kumar", condition: "Respiratory Issues", status: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="SevaHealth" className="h-10" />
            <span className="font-semibold text-xl">SevaHealth</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>NGO</AvatarFallback>
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
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 rounded-full">
            <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-full">Analytics</TabsTrigger>
            <TabsTrigger value="doctors" className="rounded-full">Doctors</TabsTrigger>
            <TabsTrigger value="patients" className="rounded-full">Patients</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full">Messages</TabsTrigger>
          </TabsList>

          {/* Profile Section */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Health for All NGO</CardTitle>
                  <CardDescription className="text-lg mt-1">Primary Healthcare Services</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button className="rounded-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                  <Button variant="destructive" size="icon" className="rounded-full">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Mumbai, Maharashtra</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Area of Work</p>
                    <p className="font-medium">Rural Healthcare & Education</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="font-medium">Dr. Anjali Verma</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration No.</p>
                    <p className="font-medium">NGO/2020/12345</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">Dedicated to providing accessible healthcare services to underserved rural communities across Maharashtra. We organize medical camps, health awareness programs, and collaborate with doctors for free consultations.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Section */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">1,245</p>
                      <p className="text-muted-foreground text-sm">Total Patients Served</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">87</p>
                      <p className="text-muted-foreground text-sm">Ongoing Cases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">34</p>
                      <p className="text-muted-foreground text-sm">Doctor Collaborations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Monthly Impact Overview</CardTitle>
                <CardDescription>Patient outreach and service delivery metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Consultations Completed</span>
                    <span className="font-medium">145/200</span>
                  </div>
                  <Progress value={72} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Medical Camps Organized</span>
                    <span className="font-medium">5/8</span>
                  </div>
                  <Progress value={62} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Financial Aid Disbursed</span>
                    <span className="font-medium">₹2.5L/₹4L</span>
                  </div>
                  <Progress value={62} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connect with Doctors */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search doctors by specialization or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDoctors.map((doctor) => (
                <Card key={doctor.id} className="shadow-card hover:shadow-soft transition-smooth">
                  <CardHeader>
                    <div className="flex flex-col items-center text-center gap-3">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback>
                          <UserCircle className="w-10 h-10" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">{doctor.location}</p>
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

          {/* Patient Requests */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Patient Requests</CardTitle>
                <CardDescription>Manage incoming patient assistance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          patient.status === 'Approved' ? 'bg-primary/10 text-primary' :
                          patient.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {patient.status}
                        </span>
                        <Button size="sm" className="rounded-full">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communications with doctors and patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-smooth">
                      <Avatar>
                        <AvatarFallback>M{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Conversation {i}</p>
                          <p className="text-xs text-muted-foreground">1h ago</p>
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

export default NGODashboard;
