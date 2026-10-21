import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.portfolio.app',
  appName: 'DevPortfolio',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
