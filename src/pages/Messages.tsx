
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Send, Search, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

// Mock conversations data
const mockConversations = [
  {
    id: "conv1",
    otherUser: {
      id: "user1",
      name: "Raj Kumar",
      avatar: "",
      lastSeen: "2023-09-15T14:30:00",
      isOnline: true,
      role: "owner",
    },
    lastMessage: {
      id: "msg1",
      content: "Yes, the PG is available from 1st October",
      timestamp: "2023-09-15T14:30:00",
      sender: "user1",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv2",
    otherUser: {
      id: "user2",
      name: "Aisha Patel",
      avatar: "",
      lastSeen: "2023-09-15T12:45:00",
      isOnline: false,
      role: "student",
    },
    lastMessage: {
      id: "msg2",
      content: "Is WiFi included in the rent?",
      timestamp: "2023-09-15T12:45:00",
      sender: "user2",
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: "conv3",
    otherUser: {
      id: "user3",
      name: "Sunil Sharma",
      avatar: "",
      lastSeen: "2023-09-14T18:20:00",
      isOnline: false,
      role: "owner",
    },
    lastMessage: {
      id: "msg3",
      content: "When would you like to schedule a visit?",
      timestamp: "2023-09-14T18:20:00",
      sender: "user3",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv4",
    otherUser: {
      id: "user4",
      name: "Priya Singh",
      avatar: "",
      lastSeen: "2023-09-13T09:15:00",
      isOnline: true,
      role: "student",
    },
    lastMessage: {
      id: "msg4",
      content: "I'm interested in your PG, is it still available?",
      timestamp: "2023-09-13T09:15:00",
      sender: "currentUser",
      isRead: true,
    },
    unreadCount: 0,
  },
];

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: "msg1",
    content: "Hello, is the PG still available?",
    timestamp: "2023-09-15T14:00:00",
    sender: "currentUser",
    isRead: true,
  },
  {
    id: "msg2",
    content: "Yes, it is available. When would you like to check in?",
    timestamp: "2023-09-15T14:10:00",
    sender: "otherUser",
    isRead: true,
  },
  {
    id: "msg3",
    content: "I'm planning to move in next month, around October 1st.",
    timestamp: "2023-09-15T14:15:00",
    sender: "currentUser",
    isRead: true,
  },
  {
    id: "msg4",
    content: "That works. Do you have any specific requirements?",
    timestamp: "2023-09-15T14:20:00",
    sender: "otherUser",
    isRead: true,
  },
  {
    id: "msg5",
    content: "I'd prefer a room with attached bathroom if available.",
    timestamp: "2023-09-15T14:25:00",
    sender: "currentUser",
    isRead: true,
  },
  {
    id: "msg6",
    content: "Yes, the PG is available from 1st October",
    timestamp: "2023-09-15T14:30:00",
    sender: "otherUser",
    isRead: true,
  },
];

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: `msg${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: "currentUser",
      isRead: false,
    };
    
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    
    // Mock a reply after 1 second
    setTimeout(() => {
      const reply = {
        id: `msg${Date.now() + 1}`,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
        sender: "otherUser",
        isRead: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <Card>
          <CardContent className="p-0">
            <div className="flex h-[calc(80vh-2rem)]">
              {/* Conversations List */}
              <div className="w-1/3 border-r flex flex-col">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search conversations" 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-grow">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conv) => (
                      <div 
                        key={conv.id} 
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex items-start">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conv.otherUser.avatar} alt={conv.otherUser.name} />
                              <AvatarFallback>{conv.otherUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conv.otherUser.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                            )}
                          </div>
                          <div className="ml-3 flex-grow min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold truncate">{conv.otherUser.name}</p>
                              <p className="text-xs text-gray-500">
                                {formatTime(conv.lastMessage.timestamp)}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500 truncate">
                                {conv.lastMessage.sender === "currentUser" ? `You: ${conv.lastMessage.content}` : conv.lastMessage.content}
                              </p>
                              {conv.unreadCount > 0 && (
                                <span className="bg-pgblue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {conv.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No conversations found
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {/* Chat Area */}
              <div className="w-2/3 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-9 w-9">
                            <AvatarImage 
                              src={selectedConversation.otherUser.avatar} 
                              alt={selectedConversation.otherUser.name} 
                            />
                            <AvatarFallback>
                              {selectedConversation.otherUser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {selectedConversation.otherUser.isOnline && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">{selectedConversation.otherUser.name}</p>
                          <p className="text-xs text-gray-500">
                            {selectedConversation.otherUser.isOnline 
                              ? 'Online'
                              : `Last seen ${formatDate(selectedConversation.otherUser.lastSeen)} at ${formatTime(selectedConversation.otherUser.lastSeen)}`
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => toast.info("Video call feature coming soon")}>
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => toast.info("Voice call feature coming soon")}>
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <ScrollArea className="flex-grow p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "currentUser" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.sender === "currentUser"
                                  ? "bg-pgblue-500 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 text-right ${
                                message.sender === "currentUser" ? "text-blue-100" : "text-gray-500"
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    <div className="p-3 border-t flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toast.info("File sharing coming soon")}
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="mx-2"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Messages;
