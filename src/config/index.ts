type Config = {
  NODE_ENV?: string;
  FIREBASE_API_KEY?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_AUTH_DOMAIN?: string;
};

const config: Config = {
  NODE_ENV: process.env.NODE_ENV,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
};

// FIXME
// NOTE: `Error: Your API key is invalid...`
if (config.NODE_ENV === 'test') {
  config.FIREBASE_API_KEY = 'xxx-xxx';
  config.FIREBASE_PROJECT_ID = 'xxx';
  config.FIREBASE_AUTH_DOMAIN = 'xxx.firebaseapp.com';
}

export const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
};

export default config;
