import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, Upload, FileText, UserCircle, Building2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import ConnectForm from "@/components/ConnectForm";

// Firebase/Firestore Imports
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { auth, db as firestore } from "@/firebaseConfig";
import { realtimeDb as rtdb } from "@/firebaseConfig";
import { setDoc, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";


function LogoutButton() {
  const navigate = useNavigate();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Logout</p>
      </TooltipContent>
    </Tooltip>
  );
}


const PatientDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeChats, setActiveChats] = useState([]); // stores all confirmed chat connections
  const [selectedChat, setSelectedChat] = useState(null); // current open chat in messages tab

  // --- NEW STATE FOR FETCHED DATA AND LOADING ---
  const [doctors, setDoctors] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  // ---------------------------------------------

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(""); // patient, doctor, ngo
  const rtdb = getDatabase(); // initialize real-time db

  const isPatient = role === "patient";


  // --- Send message function ---
  const sendMessage = async () => {
    if (!selectedChat?.draft?.trim() || !selectedChat || !userData) return;

    const receiverRole =
      selectedChat.type?.toLowerCase() === "ngo"
        ? "ngo"
        : "doctor";

    const messageData = {
      senderId: currentUser.uid,
      senderName: userData.name || userData.displayName || "Patient",
      senderRole: "patient",
      receiverId: selectedChat.id,
      receiverName: selectedChat.name,
      receiverRole: receiverRole,
      text: selectedChat.draft.trim(),
      timestamp: Date.now(),
    };

    const chatId =
      currentUser.uid < selectedChat.id
        ? `${currentUser.uid}_${selectedChat.id}`
        : `${selectedChat.id}_${currentUser.uid}`;

    try {
      await push(ref(rtdb, `chats/${chatId}/messages`), messageData);
      // Clear draft message after sending
      setSelectedChat((prev) => ({ ...prev, draft: "" }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  // ----------------------------------------------------------------
  // --- MODIFIED: Fetch Doctors and NGOs from Firestore with Loading and Error Handling ---
  useEffect(() => {
    const fetchRecipients = async () => {
      setIsLoading(true); // Start loading

      try {
        // 1. Fetch Doctors
        const doctorsQuery = query(
          collection(firestore, "users"),
          where("role", "==", "Doctor")
        );
        const doctorsSnap = await getDocs(doctorsQuery);
        const fetchedDoctors = doctorsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(fetchedDoctors);
        console.log("Doctors fetched:", fetchedDoctors.length); // Debug log

        // 2. Fetch NGOs
        const ngosQuery = query(
          collection(firestore, "users"),
          where("role", "==", "NGO")
        );
        const ngosSnap = await getDocs(ngosQuery);
        const fetchedNgos = ngosSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNgos(fetchedNgos);
        console.log("NGOs fetched:", fetchedNgos.length); // Debug log

      } catch (error) {
        // Log any Firebase/network errors
        console.error("ERROR fetching doctors/NGOs from Firestore:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success/fail
      }
    };

    fetchRecipients();
  }, []); // Empty dependency array means it runs once on component mount
  // ----------------------------------------------------------------


  // --- Realtime listener for selected chat ---
  useEffect(() => {
    if (!selectedChat || !currentUser) return;

    const chatId =
      currentUser.uid < selectedChat.id
        ? `${currentUser.uid}_${selectedChat.id}`
        : `${selectedChat.id}_${currentUser.uid}`;

    const chatRef = ref(rtdb, `chats/${chatId}/messages`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach((child) => {
        msgs.push(child.val());
      });
      setSelectedChat((prev) => ({ ...prev, messages: msgs }));
    });

    return () => unsubscribe();
  }, [selectedChat, currentUser]);


  const [notifications, setNotifications] = useState([
    // Example notifications
    { id: 1, message: "Your appointment is confirmed." },
    { id: 2, message: "Doctor updated your prescription." },
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Medical Report 1",
      date: "Uploaded 2 days ago",
      url: "#",
    },
    {
      id: 2,
      name: "Medical Report 2",
      date: "Uploaded 2 days ago",
      url: "#",
    },
  ]);

  // --- Updated useEffect to fetch user data and role ---
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setCurrentUser(user);

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data); // <-- Store all user data
        setRole(data.role || "patient"); // Set role
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!role) return;
    const savedChats = localStorage.getItem(`${role}_activeChats`);
    if (savedChats) setActiveChats(JSON.parse(savedChats));
  }, [role]);

  useEffect(() => {
    if (role) {
      localStorage.setItem(`${role}_activeChats`, JSON.stringify(activeChats));
    }
  }, [activeChats, role]);


  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;
      const userChatsRef = doc(firestore, "userChats", currentUser.uid);
      const snap = await getDoc(userChatsRef);
      if (snap.exists()) {
        const chats = Object.values(snap.data());
        setActiveChats(chats);
      }
    };
    fetchChats();
  }, [currentUser]);


  // Load saved reports from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("reports");
    if (saved) setReports(JSON.parse(saved));
  }, []);

  // Save reports whenever updated
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);


  const addOnlineChat = async (person) => {
    setActiveChats((prev) => {
      const exists = prev.some(
        (c) => c.id === person.id && c.type === person.type
      );
      if (exists) return prev;

      return [...prev, { ...person, messages: [], draft: "" }];
    });

    // Save to Firestore for persistence
    if (currentUser) {
      await setDoc(
        doc(firestore, "userChats", currentUser.uid),
        { [person.id]: person },
        { merge: true }
      );
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newReport = {
        id: Date.now(),
        name: file.name,
        date: Date.now(), // store actual timestamp
        url: fileUrl,
      };

      setReports((prev) => [...prev, newReport]);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="SevaHealth" className="h-10" />
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="w-5 h-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-3">
                <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                {notifications.length > 0 ? (
                  <ul className="space-y-2">
                    {notifications.map((note) => (
                      <li
                        key={note.id}
                        className="text-sm bg-muted p-2 rounded-md hover:bg-accent"
                      >
                        {note.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center">No new notifications</p>
                )}
              </PopoverContent>
            </Popover>

            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="doctors" className="space-y-8">
          <TabsList
            className={`grid w-full max-w-3xl mx-auto grid-cols-4 rounded-full`}
          >
            <TabsTrigger value="doctors" className="rounded-full">Find Doctor</TabsTrigger>
            <TabsTrigger value="ngos" className="rounded-full">Find NGO</TabsTrigger>
            <TabsTrigger value="reports" className="rounded-full">My Reports</TabsTrigger>
            {/* The Messages tab is now always present */}
            <TabsTrigger value="messages" className="rounded-full">Messages</TabsTrigger>
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
              {isLoading ? (
                <p className="col-span-3 text-center text-primary">Loading available doctors...</p>
              ) : doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <Card key={doctor.id} className="shadow-card hover:shadow-soft transition-smooth">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={doctor.image} />
                        <AvatarFallback><UserCircle className="w-8 h-8" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{doctor.name || "Unknown Doctor"}</CardTitle>
                        <CardDescription className="text-primary font-medium">{doctor.specialization || "General"}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        {/* Use data fields from Firestore */}
                        <p><span className="text-muted-foreground">Experience:</span> {doctor.experience || "N/A"}</p>
                        <p><span className="text-muted-foreground">Location:</span> {doctor.city || "N/A"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 rounded-full"
                          onClick={() => {
                            setSelectedPerson({
                              id: doctor.id, // This is now the actual UID!
                              type: "Doctor",
                              name: doctor.name,
                              specialization: doctor.specialization,
                            });
                            setShowForm(true);
                          }}
                        >
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-3 text-center text-muted-foreground">No doctors found. Check your Firestore data and security rules.</p>
              )}
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
              {isLoading ? (
                <p className="col-span-2 text-center text-primary">Loading available NGOs...</p>
              ) : ngos.length > 0 ? (
                ngos.map((ngo) => (
                  <Card key={ngo.id} className="shadow-card hover:shadow-soft transition-smooth">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback><Building2 className="w-6 h-6 text-primary" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{ngo.name || "Unknown NGO"}</CardTitle>
                        <CardDescription className="text-primary font-medium">{ngo.focus || "Healthcare Support"}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full rounded-full" onClick={() => {
                        setSelectedPerson({
                          id: ngo.id, // This is now the actual UID!
                          type: "NGO",
                          name: ngo.name,
                          focus: ngo.focus,
                        });
                        setShowForm(true);
                      }}
                      >
                        Request Assistance
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-2 text-center text-muted-foreground">No NGOs found. Check your Firestore data and security rules.</p>
              )}
            </div>
          </TabsContent>

          {/* My reports section (Unchanged) */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Upload Medical Reports</CardTitle>
                <CardDescription>
                  Share your medical documents with doctors and NGOs
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Upload area */}
                <div
                  className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center hover:bg-primary/5 transition-smooth cursor-pointer"
                  onClick={() => document.getElementById("cameraInput").click()}
                >
                  <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Capture or Upload Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Tap to open camera or choose from gallery
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG (max 5MB)
                  </p>
                </div>

                <input
                  type="file"
                  id="cameraInput"
                  accept="image/*,application/pdf"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Uploaded reports list */}
                <div>
                  <h3 className="font-semibold mb-4">Uploaded Reports</h3>
                  <div className="space-y-3">
                    {reports.length > 0 ? (
                      reports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center gap-3 p-4 border rounded-lg"
                        >
                          <FileText className="w-8 h-8 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium">{report.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on {new Date(report.date).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() =>
                              report.url
                                ? window.open(report.url, "_blank")
                                : alert("File not available")
                            }
                          >
                            View
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No reports uploaded yet.
                      </p>
                    )}
                  </div>
                </div>

                {/* AI Match Section */}
                <Card className="bg-muted/50 mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Match Results</CardTitle>
                    <CardDescription>
                      Recommended doctors and estimated costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Upload a report to see AI recommendations
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>


          {/* active chat section (Unchanged) */}
          {activeChats.length > 0 && (
            <TabsContent value="messages" className="space-y-6">
              {!selectedChat ? (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Active Chats</h3>
                  <div className="space-y-3">
                    {activeChats.map((chat) => (
                      <div
                        key={`${chat.type}-${chat.id}`}
                        onClick={() => setSelectedChat(chat)}
                        className="p-4 border rounded-lg flex justify-between items-center hover:bg-muted/50 transition cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{chat.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {chat.specialization || chat.focus}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Open Chat</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card
                  key={`${selectedChat.type}-${selectedChat.id}`}
                  className="p-6 h-[500px] flex flex-col"
                >
                  <div className="border-b pb-2 mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">{selectedChat.name}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedChat(null)}
                    >
                      Back to Chats
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-muted/30 rounded-lg">
                    {(selectedChat.messages || []).map((msg, i) => {
                      const isCurrentUser = msg.senderId === currentUser.uid;
                      return (
                        <div
                          key={i}
                          className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
                        >
                          <div
                            className={`rounded-2xl p-2 px-4 max-w-[70%] ${isCurrentUser ? "bg-[#d1f7c4] text-black" : "bg-white text-black"
                              } shadow`}
                          >
                            {!isCurrentUser && (
                              <p className="text-xs font-medium text-gray-500 mb-1">
                                {msg.senderName || selectedChat.name}
                              </p>
                            )}
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={selectedChat?.draft || ""}
                      onChange={(e) =>
                        setSelectedChat((prev) => ({ ...prev, draft: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && selectedChat?.draft?.trim()) {
                          sendMessage();
                        }
                      }}
                    />
                    <Button onClick={sendMessage}>Send</Button>


                  </div>
                </Card>
              )}
            </TabsContent>
          )}


        </Tabs>
      </div>

      {/* connect form (Unchanged) */}
      {showForm && selectedPerson && (
        <ConnectForm
          type={selectedPerson.type}
          name={selectedPerson.name}
          onClose={() => setShowForm(false)}
          onConfirmChat={() => {
            addOnlineChat(selectedPerson);
            setShowForm(false);
          }}
        />
      )}


    </div>
  );
};

export default PatientDashboard;