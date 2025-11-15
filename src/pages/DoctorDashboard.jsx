import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Search, MessageSquare, Edit, Building2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import DoctorConnectForm from "@/components/DoctorConnectForm";

import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig"; // ✅ make sure you have firebase.js configured


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


const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("profile");

  // Connect form
  const [showForm, setShowForm] = useState(false);
  const [selectedNgo, setSelectedNgo] = useState(null);


  // Store chats with NGOs and patients
  const [ngoChats, setNgoChats] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [patientChats, setPatientChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const db = getDatabase(app);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, [currentUser]);


  useEffect(() => {
    if (!currentUser) return;

    const userId = currentUser.uid;
    const chatsRef = ref(db, "chats");

    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const doctorChats = [];

      if (data) {
        Object.entries(data).forEach(([chatId, chatData]) => {
          const messages = chatData.messages || {};
          const messageList = Object.values(messages).filter(
            (msg) => msg.senderId === userId || msg.receiverId === userId
          );

          if (messageList.length > 0) {
            const lastMessage = messageList[messageList.length - 1];

            // Figure out who the other person is
            const isDoctorSender = lastMessage.senderId === userId;

            const chatPartner = isDoctorSender
              ? {
                id: lastMessage.receiverId,
                name: lastMessage.receiverName,
                type: lastMessage.receiverRole,
              }
              : {
                id: lastMessage.senderId,
                name: lastMessage.senderName,
                type: lastMessage.senderRole,
              };

            doctorChats.push({
              id: chatPartner.id,
              name: chatPartner.name,
              type: chatPartner.type,
              messages: messageList,
            });
          }
        });
      }

      setActiveChats(doctorChats);
      localStorage.setItem("doctor_activeChats", JSON.stringify(doctorChats));
    });
  }, [currentUser]);



  const sendMessage = (chat) => {
    if (!newMessage.trim() || !userData) return;

    const receiverId = chat.id;
    const receiverName = chat.name;
    const receiverRole = chat.type; // could be patient or ngo

    const chatId =
      currentUser.uid < receiverId
        ? `${currentUser.uid}_${receiverId}`
        : `${receiverId}_${currentUser.uid}`;

    const messageRef = ref(db, `chats/${chatId}/messages`);
    const newMsg = {
      senderId: currentUser.uid,
      senderName: userData.name,
      senderRole: userData.role, // doctor
      receiverId,
      receiverName,
      receiverRole,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };

    push(messageRef, newMsg);
    setNewMessage("");
  };

  useEffect(() => {
    const savedChats = localStorage.getItem("doctor_activeChats");
    if (savedChats) {
      setActiveChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doctor_activeChats", JSON.stringify(activeChats));
  }, [activeChats]);



  const addNgoChat = (ngoName) => {
    setActiveChats((prev) => {
      if (prev.some(chat => chat.name === ngoName && chat.type === "ngo")) return prev;
      return [...prev, { id: Date.now(), name: ngoName, type: "ngo", messages: [] }];
    });
  };





  const [notifications, setNotifications] = useState([
    // Example notifications
    // { id: 1, message: "Your appointment is confirmed." },
    // { id: 2, message: "Doctor updated your prescription." },
  ]);

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
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              <LogoutButton />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={tabValue} onValueChange={(v) => setTabValue(v)} className="space-y-8">
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
                      <Button
                        className="flex-1 rounded-full"
                        onClick={() => {
                          setSelectedNgo({
                            id: ngo.id,
                            type: "NGO",
                            name: ngo.name,
                            field: ngo.field, // optional: if you have field/area of work info
                          });
                          setShowForm(true);
                        }}
                      >
                        Connect
                      </Button>

                      {/* <Button variant="outline" size="icon" className="rounded-full">
                        <MessageSquare className="w-4 h-4" />
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>




          {/* messages tab */}
          {activeChats.length > 0 ? (
            <TabsContent value="messages" className="space-y-6">
              {!selectedChat ? (
                // ---------- Chat List ----------
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
                          <p className="font-medium text-green-700">{chat.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {chat.type === "ngo"
                              ? chat.focus || "NGO Partner"
                              : chat.specialization || "Patient"}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Open Chat
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                // ---------- Chat Window ----------
                <Card
                  key={`${selectedChat.type}-${selectedChat.id}`}
                  className="p-6 h-[500px] flex flex-col"
                >
                  {/* Header */}
                  <div className="border-b pb-2 mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-700">{selectedChat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.type === "ngo"
                          ? selectedChat.focus || "NGO Partner"
                          : selectedChat.specialization || "Patient"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedChat(null)}
                    >
                      Back to Chats
                    </Button>
                  </div>

                  {/* Chat messages */}

                  <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-muted/30 rounded-lg">
                    {(selectedChat.messages || []).length > 0 ? (
                      selectedChat.messages.map((msg, i) => {
                        // 1. Determine if the message was SENT by the currently logged-in Doctor
                        const isCurrentUser = msg.senderId === currentUser?.uid;

                        // 2. Set Bubble Styling (Green for Doctor/Outgoing, White for Patient/Incoming)
                        const bubbleClass = isCurrentUser
                          ? "bg-green-600 text-white shadow-md" // Doctor's message (Outgoing)
                          : "bg-white text-black shadow-md"; // Patient/NGO's message (Incoming)

                        // 3. Set Sender Label
                        const senderLabel = isCurrentUser
                          ? "You"
                          : `${msg.senderName}`; // Display the actual sender name (e.g., "Gauri")

                        return (
                          // Outer div controls the alignment (left or right)
                          <div
                            key={i}
                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                          >
                            {/* Inner div is the message bubble itself */}
                            <div className={`max-w-[70%] p-2 px-4 rounded-xl ${bubbleClass}`}>
                              {!isCurrentUser && ( // ONLY show the label for INCOMING messages
                                <div className="text-xs text-gray-500 font-medium mb-1">
                                  {senderLabel} ({msg.senderRole})
                                </div>
                              )}
                              <div className={`${isCurrentUser ? "text-white" : "text-black"}`}>{msg.text}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center text-gray-500 mt-10">
                        No messages yet. Start the conversation!
                      </p>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="mt-4 flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") selectedChat && sendMessage(selectedChat);
                      }}
                    />
                    <Button onClick={() => selectedChat && sendMessage(selectedChat)}>Send</Button>

                  </div>
                </Card>
              )}
            </TabsContent>
          ) : (
            // ---------- Empty State ----------
            <TabsContent value="messages">
              <Card className="p-6 text-center text-gray-500">
                No active chats yet. Connect with an NGO or wait for patient messages.
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>


      {/* Show form when connect is clicked */}
      {showForm && selectedNgo && (
        <DoctorConnectForm
          ngoName={selectedNgo.name}
          onClose={() => setShowForm(false)}
          onConfirmChat={(ngoName) => {
            addNgoChat(ngoName);
            setShowForm(false);
          }}
        />
      )}


    </div>
  );
};

export default DoctorDashboard;