import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aipocket.app',
  appName: 'Ai.Pcoket',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, 
      launchAutoHide: true,   
      backgroundColor: '#ffffff', 
      androidSplashResourceName: 'splash', 
      iosSplashResourceName: 'splash', 
      showSpinner: false,       
    },
  },
};

export default config;
