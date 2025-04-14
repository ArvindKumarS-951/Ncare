import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ScanDocument from "./pages/ScanDocument";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Assistant from "./pages/Assistant";
import Medicines from "./pages/Medicines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="nura-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/scan" element={<ScanDocument />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/assistant" element={<Assistant />} />
                  <Route path="/medicines" element={<Medicines />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
