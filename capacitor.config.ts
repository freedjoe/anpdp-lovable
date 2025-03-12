
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0bad0f7eadc14dbc88dc315e9448728e',
  appName: 'anpdp-lovable',
  webDir: 'dist',
  server: {
    url: 'https://0bad0f7e-adc1-4dbc-88dc-315e9448728e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#10b981",
      showSpinner: true,
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
