
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ebe7e5664e3a4be6bdec7f65bec3d192',
  appName: 'nura-care-connect',
  webDir: 'dist',
  server: {
    url: 'https://ebe7e566-4e3a-4be6-bdec-7f65bec3d192.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#6FB3E0",
      showSpinner: true,
      spinnerColor: "#FFFFFF"
    }
  }
};

export default config;
