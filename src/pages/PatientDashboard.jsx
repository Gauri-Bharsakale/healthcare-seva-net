import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, Upload, FileText, UserCircle, Building2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const mockDoctors = [
    { id: 1, name: "Dr. Rajesh Kumar", specialization: "Cardiologist", experience: "15 years", city: "Mumbai", image: "" },
    { id: 2, name: "Dr. Priya Sharma", specialization: "Pediatrician", experience: "10 years", city: "Delhi", image: "" },
    { id: 3, name: "Dr. Amit Patel", specialization: "General Physician", experience: "12 years", city: "Pune", image: "" },
  ];

  const mockNGOs = [
    { id: 1, name: "Health for All", focus: "Primary Care", city: "Mumbai" },
    { id: 2, name: "Hope Foundation", focus: "Cancer Support", city: "Delhi" },
    { id: 3, name: "Care India", focus: "Child Health", city: "Bangalore" },
  ];

  // ✅ Fetch Patient Details from Firestore
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user logged in");
          return;
        }

        // Get patient document by UID
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No patient data found!");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

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
              <AvatarFallback>PT</AvatarFallback>
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
        {/* ✅ Patient Info Section */}
        {userData && (
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle>Welcome, {userData.name || "Patient"}</CardTitle>
              <CardDescription>Your personal health information</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{userData.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{userData.age || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{userData.gender || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="doctors" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 rounded-full">
            <TabsTrigger value="doctors" className="rounded-full">Find Doctor</TabsTrigger>
            <TabsTrigger value="ngos" className="rounded-full">Find NGO</TabsTrigger>
            <TabsTrigger value="reports" className="rounded-full">My Reports</TabsTrigger>
          </TabsList>

          {/* Find Doctor Section */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search doctors by specialization or city..."
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
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={doctor.image} />
                        <AvatarFallback>
                          <UserCircle className="w-12 h-12" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Experience:</span> {doctor.experience}</p>
                      <p><span className="text-muted-foreground">Location:</span> {doctor.city}</p>
                    </div>
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

          {/* Find NGO Section */}
          <TabsContent value="ngos" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search NGOs by service or city..."
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
                        <CardDescription>{ngo.focus} • {ngo.city}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full rounded-full">Request Assistance</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Reports Section */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Upload Medical Reports</CardTitle>
                <CardDescription>Share your medical documents with doctors and NGOs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
  className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center hover:bg-primary/5 transition-smooth cursor-pointer"
  onClick={() => document.getElementById("fileInput").click()}
>
  <input
    type="file"
    id="fileInput"
    accept=".pdf,.jpg,.png"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Selected File: ${file.name}`);
        console.log("Selected file:", file);
      }
    }}
  />

  <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
  <h3 className="font-semibold mb-2">Upload Report</h3>
  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 5MB)</p>
</div>


                <div>
                  <h3 className="font-semibold mb-4">Uploaded Reports</h3>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
                        <FileText className="w-8 h-8 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Medical Report {i}</p>
                          <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">View</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Match Results</CardTitle>
                    <CardDescription>Recommended doctors and estimated costs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Upload a report to see AI recommendations</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
