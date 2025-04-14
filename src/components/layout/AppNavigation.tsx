
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, FolderOpen, Calendar, MessageSquare, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

const AppNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { 
      name: "Scan", 
      path: "/scan", 
      icon: Camera 
    },
    { 
      name: "Reports", 
      path: "/reports", 
      icon: FolderOpen 
    },
    { 
      name: "Calendar", 
      path: "/calendar", 
      icon: Calendar 
    },
    { 
      name: "Assistant", 
      path: "/assistant", 
      icon: MessageSquare 
    },
    { 
      name: "Medicines", 
      path: "/medicines", 
      icon: Pill 
    },
  ];

  return (
    <nav className="bg-white border-t fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center py-3 px-1 flex-1",
                "transition-colors duration-200",
                location.pathname === item.path 
                  ? "text-nura-blue" 
                  : "text-gray-500 hover:text-nura-blue-dark"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;
