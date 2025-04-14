
import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, FolderOpen, Calendar, MessageSquare, Pill } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      id: "scan",
      name: "Scan Document",
      description: "Scan or upload medical documents",
      icon: Camera,
      path: "/scan",
      color: "bg-nura-blue-light",
    },
    {
      id: "reports",
      name: "Reports",
      description: "View all medical reports",
      icon: FolderOpen,
      path: "/reports",
      color: "bg-nura-green-light",
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Appointments & reminders",
      icon: Calendar,
      path: "/calendar",
      color: "bg-nura-blue-light",
    },
    {
      id: "assistant",
      name: "AI Assistant",
      description: "Ask health-related questions",
      icon: MessageSquare,
      path: "/assistant",
      color: "bg-nura-green-light",
    },
    {
      id: "medicines",
      name: "Medicines",
      description: "Track & manage medications",
      icon: Pill,
      path: "/medicines",
      color: "bg-nura-blue-light",
    },
  ];

  return (
    <div className="container pb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Welcome to NuraCare</h2>
        <p className="text-gray-600">Your personal health management assistant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(feature.path)}
          >
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className={`p-6 ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl mb-1">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
