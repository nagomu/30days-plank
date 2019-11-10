import { IconName } from '~/components/common/icons/Icon';

type Nav = {
  icon: IconName;
  label: string;
  pathname: string;
};

type Config = {
  NODE_ENV?: string;
  FIREBASE_API_KEY?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_AUTH_DOMAIN?: string;
  SERVICE_WORKER?: string;
  nav: Nav[];
};

const config: Config = {
  NODE_ENV: process.env.NODE_ENV,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  SERVICE_WORKER: process.env.SERVICE_WORKER,
  nav: [
    {
      icon: 'home',
      label: 'Home',
      pathname: '/dashboard',
    },
    {
      icon: 'history',
      label: 'Archives',
      pathname: '/archives',
    },
  ],
};

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

export { screenEffect } from './common/screenEffect';

export default config;
