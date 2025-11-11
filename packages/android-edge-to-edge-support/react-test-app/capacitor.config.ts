import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.capawesome.test.edgetoedge',
  appName: 'EdgeToEdge Test App',
  webDir: 'build',
  plugins: {
    EdgeToEdge: {
      enabled: true
    }
  }
};

export default config;
