
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "./AppHeader";
import AppNavigation from "./AppNavigation";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl text-nura-blue">Loading NuraCare...</p>
        </div>
      </div>
    );
  }

  // Only render the app layout if the user is authenticated
  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Toaster position="top-center" />
        <AppHeader />
        <main className="flex-1 container py-4">
          <Outlet />
        </main>
        <AppNavigation />
      </div>
    </TooltipProvider>
  );
};

export default AppLayout;
